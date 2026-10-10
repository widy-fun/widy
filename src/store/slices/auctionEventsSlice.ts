import { createSlice } from "@reduxjs/toolkit";
import { IAuctionEvent, LotVariant } from "@widy/sdk";

interface AuctionEventPayload {
	variant: LotVariant;
	event: IAuctionEvent;
}

interface AuctionEventSPayload {
	variant: LotVariant;
	events: IAuctionEvent[];
}

interface AuctionEventsState {
	events: Record<LotVariant, IAuctionEvent[]>;
}

const initialState: AuctionEventsState = {
	events: {
		[LotVariant.Donation]: [],
		[LotVariant.CommandAuctionAction]: [],
		[LotVariant.ChannelSubscription]: [],
	},
};

const createAuctionEventsSlice = (name: string) =>
	createSlice({
		name,
		initialState,
		reducers: {
			addAuctionEvent: (
				state,
				action: {
					payload: AuctionEventPayload;
				},
			) => {
				state.events[action.payload.variant].push(action.payload.event);
			},
			removeAuctionEvent: (
				state,
				action: {
					payload: AuctionEventPayload;
				},
			) => {
				state.events[action.payload.variant] = state.events[
					action.payload.variant
				].filter((event) => event.id !== action.payload.event.id);
			},
			setAuctionEvents: (
				state,
				action: {
					payload: AuctionEventSPayload;
				},
			) => {
				state.events[action.payload.variant] = action.payload.events;
			},
		},
	});

export const auctionEventsSlice = createAuctionEventsSlice("auction-events");

export const maptionEventsSlice = createAuctionEventsSlice("maption-events");

export type AuctionEventsSlice = ReturnType<typeof createAuctionEventsSlice>;
