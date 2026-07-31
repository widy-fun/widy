import type { Middleware, UnknownAction } from "@reduxjs/toolkit";
import { showSnackBar } from "@widy/react";
import { AlertSeverity, ISerializedAppError } from "@widy/sdk";
import { maptionApi } from "../../api/maptionApi";
import type { AppDispatch, AppState } from "..";
import { maptionSlice } from "../slices/maptionSlice";

const updateMaptionSettingsMiddleware: Middleware<unknown, AppState> =
	(store) => (next) => (action) => {
		const appAction = action as UnknownAction;
		const result = next(action);
		const nextState = store.getState();
		const maptionSettings = nextState.maptionState.maptionSettings;
		if (
			maptionSettings &&
			appAction.type === maptionSlice.actions.setMaptionSettings.type
		) {
			const result = (store.dispatch as AppDispatch)(
				maptionApi.endpoints.updateMaptionSettings.initiate({
					maptionSettings,
				}),
			);
			result.unwrap().catch((error) => {
				const err = error as ISerializedAppError;
				store.dispatch(
					showSnackBar({
						message: err.message as string,
						alertSeverity: AlertSeverity.error,
					}),
				);
			});
		}

		return result;
	};

export default updateMaptionSettingsMiddleware;
