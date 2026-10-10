import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { snackBarSlice } from "@widy/react";
import { alertsSlice } from "../../shared/slices/alertsSlice";
import { mediaSlice } from "../../shared/slices/mediaSlice";
import { messagesSlice } from "../../shared/slices/messagesSlice.ts";
import { servicesSlice } from "../../shared/slices/servicesSlice.ts";
import {
	auctionTimerSlice,
	maptionTimerSlice,
} from "../../shared/slices/timerSlice.ts";
import { ttsSlice } from "../../shared/slices/ttsSlice.ts";
import { widgetApi } from "../../src-widget/api/index.ts";
import { api } from "../api";
import calculateLotsProbabilityMiddleware from "./middlewares/calculateLotsProbabilityMiddleware";
import lotsLeaderChangeAddTimeMiddleware from "./middlewares/lotsLeaderChangeAddTimeMiddleware";
import newAuctionEventAddAuctionTimeMiddleware from "./middlewares/newAuctionEventAddAuctionTimeMiddleware.ts";
import newAuctionEventAddMaptionTimeMiddleware from "./middlewares/newAuctionEventAddMaptionTimeMiddleware.ts";
import newAuctionEventUpdateLotMiddleware from "./middlewares/newAuctionEventUpdateLotMiddleware.ts";
import newAuctionEventUpdateMaptionPositionMiddleware from "./middlewares/newAuctionEventUpdateMaptionPositionMiddleware.ts";
import newLotAddAuctionTimeMiddleware from "./middlewares/newLotAddAuctionTimeMiddleware";
import updateMaptionSettingsMiddleware from "./middlewares/updateMaptionSettingsMiddleware";
import { aucFighterSlice } from "./slices/aucFighterSlice";
import {
	auctionEventsSlice,
	maptionEventsSlice,
} from "./slices/auctionEventsSlice.ts";
import { auctionSlice } from "./slices/auctionSlice";
import { commandsSlice } from "./slices/commandsSlice.ts";
import { goalsSlice } from "./slices/goalsSlice";
import { lotsSlice } from "./slices/lotsSlice";
import { mainSlice } from "./slices/mainSlice";
import { maptionSlice } from "./slices/maptionSlice";
import { rewardsSlice } from "./slices/rewardsSlice.ts";
import { settingsSlice } from "./slices/settingsSlice";

export const rootReducer = combineReducers({
	snackBarState: snackBarSlice.reducer,
	mainState: mainSlice.reducer,
	messagesState: messagesSlice.reducer,
	mediaState: mediaSlice.reducer,
	alertsState: alertsSlice.reducer,
	rewardsState: rewardsSlice.reducer,
	settingsState: settingsSlice.reducer,
	lotsState: lotsSlice.reducer,
	auctionState: auctionSlice.reducer,
	auctionTimerState: auctionTimerSlice.reducer,
	maptionTimerState: maptionTimerSlice.reducer,
	auctionEventsState: auctionEventsSlice.reducer,
	maptionEventsState: maptionEventsSlice.reducer,
	maptionState: maptionSlice.reducer,
	aucFighterState: aucFighterSlice.reducer,
	goalsState: goalsSlice.reducer,
	servicesState: servicesSlice.reducer,
	commandsState: commandsSlice.reducer,
	ttsState: ttsSlice.reducer,
	[api.reducerPath]: api.reducer,
	[widgetApi.reducerPath]: widgetApi.reducer,
});

export const setupStore = (preloadedState?: Partial<AppState>) => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(api.middleware)
				.concat(widgetApi.middleware)
				.concat(lotsLeaderChangeAddTimeMiddleware)
				.concat(newLotAddAuctionTimeMiddleware)
				.concat(newAuctionEventAddAuctionTimeMiddleware)
				.concat(calculateLotsProbabilityMiddleware)
				.concat(newAuctionEventUpdateLotMiddleware)
				.concat(updateMaptionSettingsMiddleware)
				.concat(newAuctionEventAddMaptionTimeMiddleware)
				.concat(newAuctionEventUpdateMaptionPositionMiddleware),
		preloadedState,
		devTools: process.env.NODE_ENV !== "production",
	});
};

export const store = setupStore();
export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
