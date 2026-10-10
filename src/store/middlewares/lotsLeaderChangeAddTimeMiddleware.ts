import type { Middleware } from "@reduxjs/toolkit";
import { auctionTimerSlice } from "../../../shared/slices/timerSlice";
import findLotsMinMaxAmount from "../../helpers/findLotsMinMaxAmount";
import isGreaterTimerAddingTime from "../../helpers/isGreaterTimerAddingTime";
import type { AppState } from "..";

const { addTime } = auctionTimerSlice.actions;

const lotsLeaderChangeAddTimeMiddleware: Middleware<unknown, AppState> =
	(store) => (next) => (action) => {
		const prevState = store.getState();
		const prevVariant = prevState.lotsState.variant;
		const prevLots = prevState.lotsState.lots;
		const { max: prevLeader } = findLotsMinMaxAmount(prevLots[prevVariant]);

		const result = next(action);

		const nextState = store.getState();
		const nextVariant = nextState.lotsState.variant;
		const nextLots = nextState.lotsState.lots;
		const { max: nextLeader } = findLotsMinMaxAmount(nextLots[nextVariant]);
		const auctionSettings = nextState.auctionState.auctionSettings;
		const time = nextState.auctionTimerState.time;

		if (
			prevLeader &&
			nextLeader &&
			prevLeader.fastId !== nextLeader.fastId &&
			auctionSettings?.is_leader_change_adding_time &&
			isGreaterTimerAddingTime({
				is_greater_timer_adding_time:
					auctionSettings.is_greater_timer_adding_time,
				timer_adding_time: auctionSettings.timer_adding_time,
				time,
			})
		) {
			store.dispatch(addTime(auctionSettings.leader_change_adding_time));
		}

		return result;
	};

export default lotsLeaderChangeAddTimeMiddleware;
