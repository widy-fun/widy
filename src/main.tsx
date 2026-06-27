import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { type AppState, store } from "./store";
import "../shared/i18n/i18n";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { appLocalDataDir } from "@tauri-apps/api/path";
import { BridgeContext } from "@widy/react";
import type { IAucFighterMatchWinner, IClientMessage } from "@widy/sdk";
import { AppEvent, RewardType, WidgetOutboundBridge } from "@widy/sdk";
import { BrowserRouter } from "react-router";
import { EventsContext } from "../shared/contexts/EventsContext";
import EventsProvider from "../shared/providers/EventsProvider";
import { WebsocketEventsService } from "../shared/services/websocketEventsService";
import { setPlayingAlertId } from "../shared/slices/alertsSlice";
import {
	setPausedMediaId,
	setPlayingMediaId,
} from "../shared/slices/mediaSlice";
import { messagesApi } from "./api/messagesApi";
import { settingsApi } from "./api/settingsApi";
import { StreamElementsSocketServiceContext } from "./contexts/StreamElementsSocketServiceContext";
import donationFromRedemption from "./helpers/donationFromRedemption";
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
	auctionDonationsSlice,
	maptionDonationsSlice,
} from "./store/slices/donationsSlice";
import { setAppDataDir } from "./store/slices/mainSlice";
import { dark } from "./theme/default";

appLocalDataDir().then((path) => store.dispatch(setAppDataDir(path)));

const eventsService = new WebsocketEventsService("ws://127.0.0.1:12553/ws");

const { addDonation: addAuctionDonation } = auctionDonationsSlice.actions;
const { addDonation: addMaptionDonation } = maptionDonationsSlice.actions;

eventsService.subscribe<IClientMessage>(AppEvent.Message, (_) => {
	store.dispatch(messagesApi.util.invalidateTags(["Messages"]));
});

eventsService.subscribe<IClientMessage>(AppEvent.Donation, (message) => {
	const state = store.getState() as AppState;
	const { services } = state.servicesState;
	if (message.donation) {
		if (services[message.donation.service].active) {
			store.dispatch(addAuctionDonation(message.donation));
		}
		updateAucFighterTeamAmount(message.donation, eventsService);
		store.dispatch(addMaptionDonation(message.donation));
	}
});

eventsService.subscribe<IClientMessage>(AppEvent.Goal, () => {
	store.dispatch(settingsApi.util.invalidateTags(["Goals"]));
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
			if (services[message.redemption.platform].active && settings) {
				store.dispatch(
					addAuctionDonation(
						donationFromRedemption({
							redemption: message.redemption,
							message,
						}),
					),
				);
			}
		}
	},
);

eventsService.subscribe<string>(AppEvent.AlertPlaying, (id) => {
	store.dispatch(setPlayingAlertId(id));
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
						<ThemeProvider theme={createTheme(dark)}>
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
