import { createSlice } from "@reduxjs/toolkit";
import { IAlert, ITextStyle, MessageType } from "@widy/sdk";
import getDefaultAlert from "../../src/helpers/getDefaultAlert";

interface AlertsState {
	alert: IAlert;
	playingAlertId: string;
}

const initialState: AlertsState = {
	alert: getDefaultAlert({
		group_id: "1",
		type: MessageType.Donation,
	}),
	playingAlertId: "",
};

export const alertsSlice = createSlice({
	name: "alerts",
	initialState,
	reducers: {
		setAlert: (
			state,
			action: {
				payload: IAlert;
			},
		) => {
			state.alert = action.payload;
		},
		setTitleStyle: (
			state,
			action: {
				payload: ITextStyle;
			},
		) => {
			if (state.alert) {
				state.alert.title_style = action.payload;
			}
		},
		setMessageStyle: (
			state,
			action: {
				payload: ITextStyle;
			},
		) => {
			if (state.alert) {
				state.alert.message_style = action.payload;
			}
		},
		setPlayingAlertId: (
			state,
			action: {
				payload: string;
			},
		) => {
			state.playingAlertId = action.payload;
		},
	},
});

export const { setAlert, setTitleStyle, setMessageStyle, setPlayingAlertId } =
	alertsSlice.actions;
