import { createSlice } from "@reduxjs/toolkit";
import { ICommand } from "@widy/sdk";
import { DEFAULT_COMMAND } from "../../constants";

interface CommandState {
	command: ICommand;
	tabIndex: number;
}

const initialState: CommandState = {
	command: DEFAULT_COMMAND,
	tabIndex: 0,
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
		setTabIndex: (
			state,
			action: {
				payload: number;
			},
		) => {
			state.tabIndex = action.payload;
		},
	},
});

export const { setCommand, setTabIndex } = commandsSlice.actions;
