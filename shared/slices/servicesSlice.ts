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
			isIntegration?: boolean;
		}
	>;
}

const initialState: ServicesState = {
	services: {
		[ServiceType.Streamelements]: {
			active: false,
			color: "#2701fb",
			authPath: "/streamelements/token",
			isIntegration: true,
		},
		[ServiceType.Twitch]: {
			active: false,
			color: "#9147ff",
			authPath: "/twitch/device-code",
			isIntegration: true,
		},
		[ServiceType.WidySol]: {
			active: false,
			color: "#370161",
			authPath: `/widy/create-donation-account/${WidyNetwork.Sol}`,
			isIntegration: true,
		},
		[ServiceType.WidyTon]: {
			active: false,
			color: "#0098ea",
			authPath: `/widy/create-donation-account/${WidyNetwork.Ton}`,
			isIntegration: true,
		},
		[ServiceType.DonationAlerts]: {
			active: false,
			color: "#f57d07",
			authPath: "/donationalerts/token",
			isIntegration: true,
		},
		[ServiceType.StreamLabs]: {
			active: false,
			color: "#80f5d2",
			authPath: "/streamlabs/token",
			isIntegration: true,
		},
		[ServiceType.Donatello]: {
			active: false,
			color: "#3579f6",
			authPath: "/donatello/token",
			isIntegration: true,
		},
		[ServiceType.Donatik]: {
			active: false,
			color: "#7a44ed",
			authPath: "/donatik/token",
			isIntegration: true,
		},
		[ServiceType.DonatePay]: {
			active: false,
			color: "#44ab4f",
			authPath: "/donatepay/token",
			isIntegration: true,
		},
		[ServiceType.Destream]: {
			active: false,
			color: "#f05a00",
			authPath: "/destream/overlay-id",
			isIntegration: true,
		},
		[ServiceType.Tribute]: {
			active: false,
			color: "#2692ffb2",
			authPath: "/tribute/api-key",
			isIntegration: true,
		},
		[ServiceType.Kick]: {
			active: false,
			color: "#53fc18",
			authPath: "/kick/authorize",
			isIntegration: true,
		},
		[ServiceType.KickBot]: {
			active: false,
			color: "#53fc18",
			authPath: "/kick-bot/authorize",
		},
		[ServiceType.TwitchBot]: {
			active: false,
			color: "#9147ff",
			authPath: "/twitch-bot/device-code",
		},
		[ServiceType.Gemini]: {
			active: false,
			color: "#121a3a",
			authPath: "/gemini/api-key",
		},
		[ServiceType.OpenAI]: {
			active: false,
			color: "#000000",
			authPath: "/openai/api-key",
		},
		[ServiceType.Claude]: {
			active: false,
			color: "#d97757",
			authPath: "/claude/api-key",
		},
		[ServiceType.KickSession]: {
			active: false,
			color: "#53fc18",
			authPath: "/kick-session/authorize",
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
