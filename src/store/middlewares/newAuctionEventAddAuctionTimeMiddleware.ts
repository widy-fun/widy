import type { Middleware, Action as UnknownAction } from "@reduxjs/toolkit";
import { auctionTimerSlice } from "../../../shared/slices/timerSlice.ts";
import isGreaterTimerAddingTime from "../../helpers/isGreaterTimerAddingTime.ts";
import type { AppState } from "../index.ts";
import { auctionEventsSlice } from "../slices/auctionEventsSlice.ts";

const { addTime } = auctionTimerSlice.actions;

const newAuctionEventAddAuctionTimeMiddleware: Middleware<unknown, AppState> =
	(store) => (next) => (action) => {
		const appAction = action as UnknownAction;
		const result = next(action);
		const nextState = store.getState();
		const auctionSettings = nextState.auctionState.auctionSettings;
		const time = nextState.auctionTimerState.time;

		if (
			appAction.type === auctionEventsSlice.actions.addAuctionEvent.type &&
			auctionSettings?.is_new_donation_adding_time &&
			isGreaterTimerAddingTime({
				is_greater_timer_adding_time:
					auctionSettings.is_greater_timer_adding_time,
				timer_adding_time: auctionSettings.timer_adding_time,
				time,
			})
		) {
			store.dispatch(addTime(auctionSettings.new_donation_adding_time));
		}

		return result;
	};

export default newAuctionEventAddAuctionTimeMiddleware;
