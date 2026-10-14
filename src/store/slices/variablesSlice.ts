import { createSlice } from "@reduxjs/toolkit";
import { IVariable } from "@widy/sdk";
import getDefaultVariable from "../../helpers/getDefaultVariable";

interface VariablesState {
	variable: IVariable;
}

const initialState: VariablesState = {
	variable: getDefaultVariable(),
};

export const variablesSlice = createSlice({
	name: "variables",
	initialState,
	reducers: {
		setVariable: (
			state,
			action: {
				payload: IVariable;
			},
		) => {
			state.variable = action.payload;
		},
	},
});

export const { setVariable } = variablesSlice.actions;
