import { createSlice } from "@reduxjs/toolkit";
import { ILot, LotVariant } from "@widy/sdk";

interface LotsState {
	lots: Record<LotVariant, ILot[]>;
	currentId: number;
	searchPattern: string;
	variant: LotVariant;
}

const initialState: LotsState = {
	lots: {
		[LotVariant.Donation]: [],
		[LotVariant.CommandAuctionAction]: [],
		[LotVariant.ChannelSubscription]: [],
	},
	currentId: 1,
	searchPattern: "",
	variant: LotVariant.Donation,
};

export const lotsSlice = createSlice({
	name: "lots",
	initialState,
	reducers: {
		setSearchPattern: (
			state,
			action: {
				payload: string;
			},
		) => {
			state.searchPattern = action.payload;
		},

		addLot: (
			state,
			action: {
				payload: ILot;
			},
		) => {
			state.lots[state.variant].push(action.payload);
			state.currentId++;
		},
		updateLot: (
			state,
			action: {
				payload: ILot;
			},
		) => {
			state.lots[state.variant] = state.lots[state.variant].map((lot) => {
				if (lot.fastId === action.payload.fastId) {
					return action.payload;
				}
				return lot;
			});
		},
		removeLot: (
			state,
			action: {
				payload: ILot;
			},
		) => {
			state.lots[state.variant] = state.lots[state.variant].filter(
				(lot) => lot.fastId !== action.payload.fastId,
			);
		},
		setLots: (
			state,
			action: {
				payload: ILot[];
			},
		) => {
			state.lots[state.variant] = action.payload;
		},
		setLotVariant: (
			state,
			action: {
				payload: LotVariant;
			},
		) => {
			state.variant = action.payload;
		},
	},
});

export const {
	addLot,
	setSearchPattern,
	setLots,
	removeLot,
	updateLot,
	setLotVariant,
} = lotsSlice.actions;
