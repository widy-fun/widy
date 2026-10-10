import type { Middleware, Action as UnknownAction } from "@reduxjs/toolkit";
import { showSnackBar } from "@widy/react";
import { AlertSeverity } from "@widy/sdk";
import type { AppState } from "../index.ts";
import { auctionEventsSlice } from "../slices/auctionEventsSlice.ts";
import { updateLot } from "../slices/lotsSlice.ts";

const { removeAuctionEvent } = auctionEventsSlice.actions;

const newAuctionEventUpdateLotMiddleware: Middleware<unknown, AppState> =
	(store) => (next) => (action) => {
		const appAction = action as UnknownAction;
		const result = next(action);
		const nextState = store.getState();
		const variant = nextState.lotsState.variant;
		const newEvent = nextState.auctionEventsState.events[variant].at(-1);
		const lots = nextState.lotsState.lots;
		const isStopped = nextState.auctionTimerState.isStopped;

		if (
			appAction.type === auctionEventsSlice.actions.addAuctionEvent.type &&
			newEvent &&
			!isStopped
		) {
			const fastId = Number(newEvent?.text?.split("#").at(1));
			const lot = lots[variant].find((lot) => lot.fastId === fastId);
			if (lot) {
				store.dispatch(
					showSnackBar({
						message: `+${newEvent.exchanged_amount.toFixed(2)}      #${fastId}`,
						alertSeverity: AlertSeverity.success,
					}),
				);
				store.dispatch(
					updateLot({
						...lot,
						amount: (lot.amount ?? 0) + newEvent.exchanged_amount,
					}),
				);
				store.dispatch(removeAuctionEvent({ event: newEvent, variant }));
			}
		}

		return result;
	};

export default newAuctionEventUpdateLotMiddleware;
