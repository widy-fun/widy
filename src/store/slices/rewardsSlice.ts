import { createSlice } from "@reduxjs/toolkit";
import { IReward } from "@widy/sdk";
import { DEFAULT_REWARD } from "../../constants";

interface RewardsState {
	reward: IReward;
}

const initialState: RewardsState = {
	reward: DEFAULT_REWARD,
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
