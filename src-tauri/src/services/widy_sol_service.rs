use crate::{constants::USDT_MULTIPLICATION, services::EventsService};
use anchor_client::{
    Client, Cluster, EventContext,
    solana_sdk::{commitment_config::CommitmentConfig, signature::Keypair},
};
use anchor_lang::prelude::*;
use database::{DatabaseService, ServicesRepository};
use entity::services::{ServiceAuth, ServiceType};
use model::{
    error::{AppError, log_and_wrap_error},
    widy_sol::DonationEvent,
};
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Manager};
use tokio::sync::broadcast;

pub struct WidySolService {
    pub nonce: Arc<Mutex<Option<String>>>,
    pub widy_sol_program_id: String,
    sign_out_sender: broadcast::Sender<()>,
}

impl WidySolService {
    pub fn new(widy_program_id: &String) -> Self {
        let (tx, _) = broadcast::channel(1);
        Self {
            nonce: Arc::new(Mutex::new(None)),
            widy_sol_program_id: widy_program_id.clone(),
            sign_out_sender: tx,
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> core::result::Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let service = database_service
            .get_service_with_auth_by_id(ServiceType::WidySol)
            .await?;
        if let Some(entity::services::Model {
            authorized: true,
            auth: Some(ServiceAuth::Widy(auth)),
            ..
        }) = service
        {
            self.subscribe_to_donation_event(app.clone(), auth.user)
                .await;
        }
        Ok(())
    }

    async fn subscribe_to_donation_event(&self, app: AppHandle, user: String) {
        tauri::async_runtime::spawn(async move {
            let widy_sol_service = app.state::<Arc<WidySolService>>();
            let mut sign_out_receiver = widy_sol_service.sign_out_sender.subscribe();
            let payer = Keypair::new();
            #[cfg(debug_assertions)]
            let cluster = Cluster::Devnet;
            #[cfg(not(debug_assertions))]
            let cluster = Cluster::Mainnet;
            let client =
                Client::new_with_options(cluster, Arc::new(payer), CommitmentConfig::finalized());

            let program = client
                .program(Pubkey::from_str_const(
                    &widy_sol_service.widy_sol_program_id,
                ))
                .map_err(|e| log_and_wrap_error("Program error", e))
                .unwrap();
            let subscription = program
                .on(move |ctx: &EventContext, event: DonationEvent| {
                    if ctx.signature.to_string()
                        == "1111111111111111111111111111111111111111111111111111111111111111"
                            .to_string()
                    {
                        return;
                    }
                    let app = app.clone();
                    let signature = ctx.signature.to_string();
                    let amount = event.amount;
                    let event_user = event.user;
                    let message = event.message.clone();
                    if user == event_user.to_string() {
                        tauri::async_runtime::spawn(async move {
                            let _ = EventsService::donation(
                                signature,
                                ServiceType::WidySol,
                                event.name.clone(),
                                entity::settings::Currency::USD,
                                amount as f64 / USDT_MULTIPLICATION,
                                message.clone(),
                                &app,
                            )
                            .await;
                        });
                    }
                })
                .await
                .map_err(|e| log_and_wrap_error("Subscription error", e))
                .unwrap();

            sign_out_receiver.recv().await.ok();
            subscription.unsubscribe().await;
        });
    }

    pub async fn sign_out(&self, app: &AppHandle) -> core::result::Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::WidySol,
                extra: None,
                auth: None,
                authorized: false,
            })
            .await?;
        let _ = self.sign_out_sender.send(());
        Ok(())
    }
}
