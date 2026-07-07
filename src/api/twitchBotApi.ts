import type { ITwitchDeviceCodeResponse } from "@widy/sdk";
import { api } from ".";

export const twitchBotApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getTwitchBotDeviceCode: builder.query<ITwitchDeviceCodeResponse, void>({
			query: () => ({
				command: "get_twitch_bot_device_code",
			}),
		}),
		getTwitchBotToken: builder.mutation<void, { deviceCode: string }>({
			query: (args) => ({
				command: "get_twitch_bot_token",
				args,
			}),
		}),
		twitchBotConnect: builder.mutation<void, void>({
			query: () => ({
				command: "twitch_bot_connect",
			}),
			invalidatesTags: ["Services"],
		}),
	}),
});
export const {
	useGetTwitchBotDeviceCodeQuery,
	useGetTwitchBotTokenMutation,
	useTwitchBotConnectMutation,
} = twitchBotApi;
