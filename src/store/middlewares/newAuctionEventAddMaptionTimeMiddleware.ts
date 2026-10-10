import type { Middleware, Action as UnknownAction } from "@reduxjs/toolkit";
import { maptionTimerSlice } from "../../../shared/slices/timerSlice.ts";
import isGreaterTimerAddingTime from "../../helpers/isGreaterTimerAddingTime.ts";
import type { AppState } from "../index.ts";
import { maptionEventsSlice } from "../slices/auctionEventsSlice.ts";

const { addTime } = maptionTimerSlice.actions;

const newAuctionEventAddMaptionTimeMiddleware: Middleware<unknown, AppState> =
	(store) => (next) => (action) => {
		const appAction = action as UnknownAction;
		const result = next(action);
		const nextState = store.getState();
		const { maptionSettings, isPointSet } = nextState.maptionState;
		const time = nextState.maptionTimerState.time;

		if (
			appAction.type === maptionEventsSlice.actions.addAuctionEvent.type &&
			isPointSet &&
			maptionSettings &&
			isGreaterTimerAddingTime({
				is_greater_timer_adding_time:
					maptionSettings.is_greater_timer_adding_time,
				timer_adding_time: maptionSettings.timer_adding_time,
				time,
			})
		) {
			store.dispatch(addTime(maptionSettings.new_donation_adding_time));
		}

		return result;
	};

export default newAuctionEventAddMaptionTimeMiddleware;
