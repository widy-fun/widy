import { createSlice } from "@reduxjs/toolkit";
import { ServiceType, WidyNetwork } from "@widy/sdk";

interface ServicesState {
	services: Record<
		ServiceType,
		{
			active: boolean;
			color: string;
			authPath: string;
			image: string;
			description: string;
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
			image:
				"https://www.google.com/s2/favicons?domain=streamelements.com&sz=128",
			description: "services.descriptions.streamelements",
			isIntegration: true,
		},
		[ServiceType.Twitch]: {
			active: false,
			color: "#9147ff",
			authPath: "/twitch/device-code",
			image: "https://www.google.com/s2/favicons?domain=twitch.tv&sz=128",
			description: "services.descriptions.twitch",
			isIntegration: true,
		},
		[ServiceType.WidySol]: {
			active: false,
			color: "#370161",
			authPath: `/widy/create-donation-account/${WidyNetwork.Sol}`,
			image: "/logo.png",
			description: "services.descriptions.widy_sol",
			isIntegration: true,
		},
		[ServiceType.WidyTon]: {
			active: false,
			color: "#0098ea",
			authPath: `/widy/create-donation-account/${WidyNetwork.Ton}`,
			image: "/logo.png",
			description: "services.descriptions.widy_ton",
			isIntegration: true,
		},
		[ServiceType.DonationAlerts]: {
			active: false,
			color: "#f57d07",
			authPath: "/donationalerts/token",
			image:
				"https://www.google.com/s2/favicons?domain=donationalerts.com&sz=128",
			description: "services.descriptions.donationalerts",
			isIntegration: true,
		},
		[ServiceType.StreamLabs]: {
			active: false,
			color: "#80f5d2",
			authPath: "/streamlabs/token",
			image: "https://www.google.com/s2/favicons?domain=streamlabs.com&sz=128",
			description: "services.descriptions.streamlabs",
			isIntegration: true,
		},
		[ServiceType.Donatello]: {
			active: false,
			color: "#3579f6",
			authPath: "/donatello/token",
			image: "https://www.google.com/s2/favicons?domain=donatello.to&sz=128",
			description: "services.descriptions.donatello",
			isIntegration: true,
		},
		[ServiceType.Donatik]: {
			active: false,
			color: "#7a44ed",
			authPath: "/donatik/token",
			image: "https://www.google.com/s2/favicons?domain=donatik.ua&sz=128",
			description: "services.descriptions.donatik",
			isIntegration: true,
		},
		[ServiceType.DonatePay]: {
			active: false,
			color: "#44ab4f",
			authPath: "/donatepay/token",
			image: "https://www.google.com/s2/favicons?domain=donatepay.ru&sz=128",
			description: "services.descriptions.donatepay",
			isIntegration: true,
		},
		[ServiceType.Destream]: {
			active: false,
			color: "#f05a00",
			authPath: "/destream/overlay-id",
			image: "https://www.google.com/s2/favicons?domain=destream.net&sz=128",
			description: "services.descriptions.destream",
			isIntegration: true,
		},
		[ServiceType.Tribute]: {
			active: false,
			color: "#2692ffb2",
			authPath: "/tribute/api-key",
			image: "https://www.google.com/s2/favicons?domain=tribute.top&sz=128",
			description: "services.descriptions.tribute",
			isIntegration: true,
		},
		[ServiceType.Kick]: {
			active: false,
			color: "#53fc18",
			authPath: "/kick/authorize",
			image: "https://www.google.com/s2/favicons?domain=kick.com&sz=128",
			description: "services.descriptions.kick",
			isIntegration: true,
		},
		[ServiceType.KickBot]: {
			active: false,
			color: "#53fc18",
			authPath: "/kick-bot/authorize",
			image: "https://www.google.com/s2/favicons?domain=kick.com&sz=128",
			description: "services.descriptions.kick_bot",
		},
		[ServiceType.TwitchBot]: {
			active: false,
			color: "#9147ff",
			authPath: "/twitch-bot/device-code",
			image: "https://www.google.com/s2/favicons?domain=twitch.tv&sz=128",
			description: "services.descriptions.twitch_bot",
		},
		[ServiceType.Gemini]: {
			active: false,
			color: "#121a3a",
			authPath: "/gemini/api-key",
			image:
				"https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128",
			description: "services.descriptions.gemini",
		},
		[ServiceType.OpenAI]: {
			active: false,
			color: "#000000",
			authPath: "/openai/api-key",
			image: "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
			description: "services.descriptions.openai",
		},
		[ServiceType.Claude]: {
			active: false,
			color: "#d97757",
			authPath: "/claude/api-key",
			image: "https://www.google.com/s2/favicons?domain=claude.ai&sz=128",
			description: "services.descriptions.claude",
		},
		[ServiceType.KickSession]: {
			active: false,
			color: "#53fc18",
			authPath: "/kick-session/authorize",
			image: "https://www.google.com/s2/favicons?domain=kick.com&sz=128",
			description: "services.descriptions.kick_session",
		},
		[ServiceType.FishAudio]: {
			active: false,
			color: "#f0f3ef",
			authPath: "/fish-audio/api-key",
			image: "https://www.google.com/s2/favicons?domain=fish.audio&sz=128",
			description: "services.descriptions.fish_audio",
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
