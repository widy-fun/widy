use std::sync::{Arc, Mutex};

use entity::services::{KickSessionToken, ServiceAuth, ServiceType};
use tauri::{AppHandle, Manager};

use crate::{
    error::AppError,
    repositories::ServicesRepository,
    services::{
        DatabaseService,
        kick::{
            KickService,
            models::{ChanelInfoResponse, UserInfo},
            traits::{KickApi, KickSessionApi},
        },
    },
};

pub struct KickSessionService {
    reqwest_client: reqwest::Client,
    user_info: Arc<Mutex<Option<UserInfo>>>,
    chanel_info: Arc<Mutex<Option<ChanelInfoResponse>>>,
}

impl KickSessionService {
    pub fn new(reqwest_client: reqwest::Client) -> Self {
        Self {
            reqwest_client,
            user_info: Arc::new(Mutex::new(None)),
            chanel_info: Arc::new(Mutex::new(None)),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let auth = self.get_auth(app).await?;
        let kick_service = app.state::<KickService>();
        if let Err(e) = kick_service.get_auth(app).await {
            database_service
                .update_service_auth(
                    ServiceType::KickSession,
                    Some(ServiceAuth::KickSession(KickSessionToken {
                        session_token: auth.session_token.clone(),
                    })),
                    false,
                )
                .await?;
            return Err(e);
        }

        match self.check_auth(app).await {
            Ok(_) => {
                database_service
                    .update_service_auth(
                        ServiceType::KickSession,
                        Some(ServiceAuth::KickSession(KickSessionToken {
                            session_token: auth.session_token.clone(),
                        })),
                        true,
                    )
                    .await?;
            }
            Err(e) => {
                database_service
                    .update_service_auth(
                        ServiceType::KickSession,
                        Some(ServiceAuth::KickSession(KickSessionToken {
                            session_token: auth.session_token.clone(),
                        })),
                        false,
                    )
                    .await?;
                return Err(e);
            }
        }

        Ok(())
    }

    async fn check_auth(&self, app: &AppHandle) -> Result<(), AppError> {
        let kick_service = app.state::<KickService>();
        let user_info = kick_service.get_user_info(app).await?;
        {
            *self.user_info.lock().unwrap() = Some(user_info.clone());
        }
        let chanel_info = kick_service.get_chanel_info(&user_info.name).await?;
        {
            *self.chanel_info.lock().unwrap() = Some(chanel_info.clone());
        }
        self.get_settings(app).await?;
        Ok(())
    }

    pub async fn sign_out(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::KickSession,
                settings: None,
                auth: None,
                authorized: false,
            })
            .await?;
        Ok(())
    }
}

impl KickSessionApi for KickSessionService {
    fn reqwest_client(&self) -> &reqwest::Client {
        &self.reqwest_client
    }

    fn user_info(&self) -> Option<UserInfo> {
        self.user_info.lock().unwrap().clone()
    }

    fn chanel_info(&self) -> Option<ChanelInfoResponse> {
        self.chanel_info.lock().unwrap().clone()
    }
}
