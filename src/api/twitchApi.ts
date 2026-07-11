import type { IReward, ITwitchDeviceCodeResponse } from "@widy/sdk";
import { api } from ".";

export const twitchApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getDeviceCode: builder.query<ITwitchDeviceCodeResponse, void>({
			query: () => ({
				command: "get_device_code",
			}),
		}),
		getToken: builder.mutation<void, { deviceCode: string }>({
			query: (args) => ({
				command: "get_token",
				args,
			}),
		}),
		twitchConnect: builder.mutation<void, void>({
			query: () => ({
				command: "twitch_connect",
			}),
			invalidatesTags: ["Services"],
		}),

		twitchAddCustomReward: builder.mutation<void, { reward: IReward }>({
			query: (args) => ({
				command: "twitch_add_custom_reward",
				args,
			}),
			invalidatesTags: ["Rewards", "Alerts"],
		}),
		twitchRemoveCustomReward: builder.mutation<void, { id: string }>({
			query: (args) => ({
				command: "twitch_remove_custom_reward",
				args,
			}),
			invalidatesTags: ["Rewards", "Alerts"],
		}),
	}),
});
export const {
	useGetDeviceCodeQuery,
	useGetTokenMutation,
	useTwitchConnectMutation,
	useTwitchAddCustomRewardMutation,
	useTwitchRemoveCustomRewardMutation,
} = twitchApi;
