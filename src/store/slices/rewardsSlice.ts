import { createSlice } from "@reduxjs/toolkit";
import { IReward } from "@widy/sdk";
import getDefaultReward from "../../helpers/getDefaultReward";

interface RewardsState {
	reward: IReward;
}

const initialState: RewardsState = {
	reward: getDefaultReward(),
};

export const rewardsSlice = createSlice({
	name: "rewards",
	initialState,
	reducers: {
		setReward: (
			state,
			action: {
				payload: IReward;
			},
		) => {
			state.reward = action.payload;
		},
	},
});

export const { setReward } = rewardsSlice.actions;
