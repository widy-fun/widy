import { createSlice } from "@reduxjs/toolkit";
import type { ISettings } from "@widy/sdk";
import { DEFAULT_SETTINGS } from "../../constants";

interface SettingsState {
	settings: ISettings;
}

const initialState: SettingsState = {
	settings: DEFAULT_SETTINGS,
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setSettings: (
			state,
			action: {
				payload: ISettings;
			},
		) => {
			state.settings = action.payload;
		},
	},
});

export const { setSettings } = settingsSlice.actions;
