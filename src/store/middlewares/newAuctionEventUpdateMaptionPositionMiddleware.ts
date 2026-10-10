import type { Middleware, Action as UnknownAction } from "@reduxjs/toolkit";
import { showSnackBar } from "@widy/react";
import { AlertSeverity, LotVariant } from "@widy/sdk";
import calculateMaptionDistance from "../../helpers/calculateMaptionDistance.ts";
import type { AppState } from "../index.ts";
import { maptionEventsSlice } from "../slices/auctionEventsSlice.ts";
import { down, left, right, up } from "../slices/maptionSlice.ts";

const newAuctionEventUpdateMaptionPositionMiddleware: Middleware<
	unknown,
	AppState
> = (store) => (next) => (action) => {
	const appAction = action as UnknownAction;
	const result = next(action);
	const nextState = store.getState();
	const newEvent =
		nextState.maptionEventsState.events[LotVariant.Donation].at(-1);
	const { isPointSet, maptionSettings } = nextState.maptionState;
	const isStopped = nextState.maptionTimerState.isStopped;

	if (
		appAction.type === maptionEventsSlice.actions.addAuctionEvent.type &&
		maptionSettings &&
		newEvent &&
		isPointSet &&
		!isStopped
	) {
		switch (newEvent.text?.toLowerCase()) {
			case "up":
				store.dispatch(
					up(
						calculateMaptionDistance({
							price_for_meter: maptionSettings.price_for_meter,
							amount: newEvent.exchanged_amount,
						}),
					),
				);
				store.dispatch(
					showSnackBar({
						message: `+${newEvent.exchanged_amount.toFixed(2)}      Up`,
						alertSeverity: AlertSeverity.success,
					}),
				);
				break;
			case "down":
				store.dispatch(
					down(
						calculateMaptionDistance({
							price_for_meter: maptionSettings.price_for_meter,
							amount: newEvent.exchanged_amount,
						}),
					),
				);
				store.dispatch(
					showSnackBar({
						message: `+${newEvent.exchanged_amount.toFixed(2)}      Down`,
						alertSeverity: AlertSeverity.success,
					}),
				);
				break;
			case "left":
				store.dispatch(
					left(
						calculateMaptionDistance({
							price_for_meter: maptionSettings.price_for_meter,
							amount: newEvent.exchanged_amount,
						}),
					),
				);
				store.dispatch(
					showSnackBar({
						message: `+${newEvent.exchanged_amount.toFixed(2)}      Left`,
						alertSeverity: AlertSeverity.success,
					}),
				);
				break;
			case "right":
				store.dispatch(
					right(
						calculateMaptionDistance({
							price_for_meter: maptionSettings.price_for_meter,
							amount: newEvent.exchanged_amount,
						}),
					),
				);
				store.dispatch(
					showSnackBar({
						message: `+${newEvent.exchanged_amount.toFixed(2)}      Right`,
						alertSeverity: AlertSeverity.success,
					}),
				);
				break;

			default:
				break;
		}
	}

	return result;
};

export default newAuctionEventUpdateMaptionPositionMiddleware;
