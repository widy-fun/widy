import { createSlice } from "@reduxjs/toolkit";
import { IModerator } from "@widy/sdk";
import getDefaultModerator from "../../helpers/getDefaultModerator";

interface ModeratorsState {
	moderator: IModerator;
}

const initialState: ModeratorsState = {
	moderator: getDefaultModerator(),
};

export const moderatorsSlice = createSlice({
	name: "moderators",
	initialState,
	reducers: {
		setModerator: (
			state,
			action: {
				payload: IModerator;
			},
		) => {
			state.moderator = action.payload;
		},
	},
});

export const { setModerator } = moderatorsSlice.actions;
