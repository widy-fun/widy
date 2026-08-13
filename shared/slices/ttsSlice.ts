import { createSlice } from "@reduxjs/toolkit";

interface TtsState {
	playingTtsId: string;
}

const initialState: TtsState = {
	playingTtsId: "",
};

export const ttsSlice = createSlice({
	name: "tts",
	initialState,
	reducers: {
		setPlayingTtsId: (
			state,
			action: {
				payload: string;
			},
		) => {
			state.playingTtsId = action.payload;
		},
	},
});

export const { setPlayingTtsId } = ttsSlice.actions;
