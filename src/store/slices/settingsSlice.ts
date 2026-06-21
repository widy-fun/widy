import { createSlice } from "@reduxjs/toolkit";
import type { ISettings } from "@widy/sdk";

interface SettingsState {
	settings: ISettings | null;
}

const initialState: SettingsState = {
	settings: null,
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
