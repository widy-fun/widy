import { createSlice } from "@reduxjs/toolkit";
import { ServiceType, WidyNetwork } from "@widy/sdk";

interface ServicesState {
	services: Record<
		ServiceType,
		{
			active: boolean;
			color: string;
			authPath: string;
			settingsPath?: string;
		}
	>;
}

const initialState: ServicesState = {
	services: {
		[ServiceType.Streamelements]: {
			active: false,
			color: "#2701fb",
			authPath: "/streamelements/token",
		},
		[ServiceType.Twitch]: {
			active: false,
			color: "#9147ff",
			authPath: "/twitch/device-code",
		},
		[ServiceType.WidySol]: {
			active: false,
			color: "#370161",
			authPath: `/widy/create-donation-account/${WidyNetwork.Sol}`,
		},
		[ServiceType.WidyTon]: {
			active: false,
			color: "#0098ea",
			authPath: `/widy/create-donation-account/${WidyNetwork.Ton}`,
		},
		[ServiceType.DonationAlerts]: {
			active: false,
			color: "#f57d07",
			authPath: "/donationalerts/token",
		},
		[ServiceType.StreamLabs]: {
			active: false,
			color: "#80f5d2",
			authPath: "/streamlabs/token",
		},
		[ServiceType.Donatello]: {
			active: false,
			color: "#3579f6",
			authPath: "/donatello/token",
		},
		[ServiceType.Donatik]: {
			active: false,
			color: "#7a44ed",
			authPath: "/donatik/token",
		},
		[ServiceType.DonatePay]: {
			active: false,
			color: "#44ab4f",
			authPath: "/donatepay/token",
		},
		[ServiceType.Destream]: {
			active: false,
			color: "#f05a00",
			authPath: "/destream/overlay-id",
		},
		[ServiceType.Tribute]: {
			active: false,
			color: "#2692ffb2",
			authPath: "/tribute/api-key",
		},
	},
};

export const servicesSlice = createSlice({
	name: "services",
	initialState,
	reducers: {
		setServiceActive: (
			state,
			action: {
				payload: {
					service: ServiceType;
					active: boolean;
				};
			},
		) => {
			state.services[action.payload.service].active = action.payload.active;
		},
	},
});

export const { setServiceActive } = servicesSlice.actions;
