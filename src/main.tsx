import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { type AppState, store } from "./store";
import "../shared/i18n/i18n";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appLocalDataDir } from "@tauri-apps/api/path";
import { BridgeContext, dark, showSnackBar } from "@widy/react";
import type {
	IAucFighterMatchWinner,
	IClientMessage,
	ICommandAuctionAction,
} from "@widy/sdk";
import {
	AlertSeverity,
	AppEvent,
	LotVariant,
	RewardType,
	WidgetOutboundBridge,
} from "@widy/sdk";
import { BrowserRouter } from "react-router";
import { EventsContext } from "../shared/contexts/EventsContext";
import EventsProvider from "../shared/providers/EventsProvider";
import { WebsocketEventsService } from "../shared/services/websocketEventsService";
import { setPlayingAlertId } from "../shared/slices/alertsSlice";
import {
	setPausedMediaId,
	setPlayingMediaId,
} from "../shared/slices/mediaSlice";
import { setPlayingTtsId } from "../shared/slices/ttsSlice";
import { messagesApi } from "./api/messagesApi";
import { settingsApi } from "./api/settingsApi";
import { StreamElementsSocketServiceContext } from "./contexts/StreamElementsSocketServiceContext";
import auctionEventFromDonation from "./helpers/auctionEventFromDonation";
import auctionEventFromRedemption from "./helpers/auctionEventFromRedemption";
import getRandomColor from "./helpers/getRandomColor";
import updateAucFighterTeamAmount from "./helpers/updateAucFighterTeamAmount";
import StreamElementsSocketServiceProvider from "./providers/StreamElementsSocketServiceProvider";
import StreamElementsSocketService from "./services/streamElementsSocketService";
import {
	setGameWinner,
	setPausedMatchId,
	setPlayingMatchId,
	updateMatch,
} from "./store/slices/aucFighterSlice";
import {
	auctionEventsSlice,
	maptionEventsSlice,
} from "./store/slices/auctionEventsSlice";
import { addLot, updateLot } from "./store/slices/lotsSlice";
import { setAppDataDir } from "./store/slices/mainSlice";

appLocalDataDir().then((path) => store.dispatch(setAppDataDir(path)));

const eventsService = new WebsocketEventsService("ws://127.0.0.1:12553/ws");

const { addAuctionEvent } = auctionEventsSlice.actions;
const { addAuctionEvent: addMaptionEvent } = maptionEventsSlice.actions;

eventsService.subscribe<IClientMessage>(AppEvent.Message, (_) => {
	store.dispatch(messagesApi.util.invalidateTags(["Messages"]));
});

eventsService.subscribe<IClientMessage>(AppEvent.Donation, (message) => {
	const state = store.getState() as AppState;
	const { services } = state.servicesState;
	const { variant } = state.lotsState;
	const { isPointSet } = state.maptionState;
	if (message.donation) {
		if (
			services[message.donation.service].active &&
			variant === LotVariant.Donation
		) {
			store.dispatch(
				addAuctionEvent({
					event: auctionEventFromDonation({
						donation: message.donation,
						message,
					}),
					variant: LotVariant.Donation,
				}),
			);
		}
		updateAucFighterTeamAmount(message.donation, eventsService);
		if (isPointSet) {
			store.dispatch(
				addMaptionEvent({
					event: auctionEventFromDonation({
						donation: message.donation,
						message,
					}),
					variant: LotVariant.Donation,
				}),
			);
		}
	}
});

eventsService.subscribe<IClientMessage>(AppEvent.Goal, () => {
	store.dispatch(settingsApi.util.invalidateTags(["Goals"]));
});

eventsService.subscribe<IClientMessage>(AppEvent.StartTranscribe, () => {
	new Audio("/start_transcribe.wav").play();
});

eventsService.subscribe<IClientMessage>(AppEvent.StopTranscribe, () => {
	new Audio("/stop_transcribe.wav").play();
});

eventsService.subscribe<IClientMessage>(
	AppEvent.Redemption,
	async (message) => {
		if (message.redemption?.type === RewardType.Auction) {
			const state = store.getState() as AppState;
			const { services } = state.servicesState;
			const { data: settings } = await store.dispatch(
				settingsApi.endpoints.getSettings.initiate(undefined, {
					forceRefetch: true,
				}),
			);
			const { variant } = state.lotsState;
			if (
				services[message.redemption.platform].active &&
				settings &&
				variant === LotVariant.Donation
			) {
				store.dispatch(
					addAuctionEvent({
						event: auctionEventFromRedemption({
							redemption: message.redemption,
							message,
						}),
						variant: LotVariant.Donation,
					}),
				);
			}
		}
	},
);

eventsService.subscribe<IClientMessage>(
	AppEvent.ChannelSubscription,
	async (message) => {
		if (message.subscription) {
			const state = store.getState() as AppState;
			const { services } = state.servicesState;
			const { lots, currentId, variant } = state.lotsState;
			const { colors } = state.mainState;
			const { data: settings } = await store.dispatch(
				settingsApi.endpoints.getSettings.initiate(undefined, {
					forceRefetch: true,
				}),
			);
			if (
				services[message.subscription.service].active &&
				settings &&
				variant === LotVariant.ChannelSubscription
			) {
				const lot = lots[LotVariant.ChannelSubscription].find(
					(lot) => lot.id === message.subscription?.user_id,
				);
				if (lot) {
					store.dispatch(
						updateLot({
							...lot,
							amount: (lot.amount ?? 0) + message.subscription.total,
						}),
					);
				} else {
					store.dispatch(
						addLot({
							fastId: currentId,
							amount: message.subscription.total,
							name: message.subscription.user_name,
							color: getRandomColor(colors),
							id: message.subscription?.user_id,
						}),
					);
				}
				store.dispatch(
					showSnackBar({
						message: message.subscription.user_name,
						alertSeverity: AlertSeverity.success,
					}),
				);
			}
		}
	},
);

eventsService.subscribe<ICommandAuctionAction>(
	AppEvent.CommandAuctionAction,
	async (message) => {
		const state = store.getState() as AppState;
		const { services } = state.servicesState;
		const { lots, currentId, variant } = state.lotsState;
		const { colors } = state.mainState;

		if (
			services[message.platform].active &&
			variant === LotVariant.CommandAuctionAction
		) {
			const lot = lots[LotVariant.CommandAuctionAction].find(
				(lot) => lot.id === message.user_id,
			);
			if (!lot) {
				store.dispatch(
					addLot({
						fastId: currentId,
						amount: message.amount,
						name: message.user_name,
						color: getRandomColor(colors),
						id: message.user_id,
					}),
				);
			}
			store.dispatch(
				showSnackBar({
					message: message.user_name,
					alertSeverity: AlertSeverity.success,
				}),
			);
		}
	},
);

eventsService.subscribe<string>(AppEvent.AlertPlaying, (id) => {
	store.dispatch(setPlayingAlertId(id));
});

eventsService.subscribe<string>(AppEvent.TtsPlaying, (id) => {
	store.dispatch(setPlayingTtsId(id));
});

eventsService.subscribe<string>(AppEvent.MediaPlaying, (id) => {
	store.dispatch(setPausedMediaId(""));
	store.dispatch(setPlayingMediaId(id));
});

eventsService.subscribe<string>(AppEvent.MediaPaused, (id) => {
	store.dispatch(setPausedMediaId(id));
});

eventsService.subscribe<string>(AppEvent.AlertPlayed, (_) => {
	store.dispatch(setPlayingAlertId(""));
});

eventsService.subscribe<string>(AppEvent.TtsPlayed, (_) => {
	store.dispatch(setPlayingTtsId(""));
});

eventsService.subscribe<string>(AppEvent.MediaPlayed, (_) => {
	store.dispatch(setPlayingMediaId(""));
	store.dispatch(setPausedMediaId(""));
});

eventsService.subscribe<string>(AppEvent.AucFighterMatchPlaying, (id) => {
	store.dispatch(setPausedMatchId(""));
	store.dispatch(setPlayingMatchId(id));
});
eventsService.subscribe<string>(AppEvent.AucFighterMatchPaused, (id) => {
	store.dispatch(setPausedMatchId(id));
});

eventsService.subscribe<IAucFighterMatchWinner>(
	AppEvent.AucFighterMatchEnd,
	(matchWinner) => {
		const state = store.getState() as AppState;
		const game = state.aucFighterState.game;
		if (game) {
			store.dispatch(setPlayingMatchId(""));
			const matchIndex = game.matches.findIndex(
				(match) => match.id === matchWinner.matchId,
			);
			if (matchIndex !== -1) {
				const match = game.matches[matchIndex];
				const winner = match.teams[matchWinner.winnerIndex];

				const updatedTeams = match.teams.map((team, index) => {
					if (index === matchWinner.winnerIndex) {
						return { ...team, is_winner: true };
					}
					return { ...team, is_winner: false };
				});
				store.dispatch(
					updateMatch({ ...match, teams: updatedTeams, is_ended: true }),
				);
				const nextMatch = game.matches[matchIndex + 1];
				if (nextMatch) {
					const newMatch = {
						...nextMatch,
						teams: [
							nextMatch.teams[0],
							{
								...winner,
								is_winner: false,
								amount: nextMatch.teams[1].amount,
							},
						],
					};
					store.dispatch(updateMatch(newMatch));
					eventsService.send({
						event: AppEvent.StartAucFighterMatch,
						data: newMatch,
					});
				} else if (match.is_final) {
					store.dispatch(setGameWinner(winner));
				}
			}
		}
	},
);

const streamElementsSocketService = new StreamElementsSocketService();

const bridge = new WidgetOutboundBridge();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<StreamElementsSocketServiceProvider
			context={StreamElementsSocketServiceContext}
			streamElementsSocketService={streamElementsSocketService}
		>
			<EventsProvider context={EventsContext} eventsService={eventsService}>
				<BridgeContext.Provider value={bridge}>
					<BrowserRouter>
						<ThemeProvider theme={dark}>
							<Provider store={store}>
								<CssBaseline />
								<App />
							</Provider>
						</ThemeProvider>
					</BrowserRouter>
				</BridgeContext.Provider>
			</EventsProvider>
		</StreamElementsSocketServiceProvider>
	</React.StrictMode>,
);
