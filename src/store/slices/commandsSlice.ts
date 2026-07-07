import { createSlice } from "@reduxjs/toolkit";
import { ICommand } from "@widy/sdk";
import { DEFAULT_COMMAND } from "../../constants";

interface CommandState {
	command: ICommand;
}

const initialState: CommandState = {
	command: DEFAULT_COMMAND,
};

export const commandsSlice = createSlice({
	name: "commands",
	initialState,
	reducers: {
		setCommand: (
			state,
			action: {
				payload: ICommand;
			},
		) => {
			state.command = action.payload;
		},
	},
});

export const { setCommand } = commandsSlice.actions;
