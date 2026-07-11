import { IReward } from "@widy/sdk";
import { api } from ".";

export const kickApi = api.injectEndpoints({
	endpoints: (builder) => ({
		kickAuthorize: builder.mutation<void, void>({
			query: () => ({
				command: "kick_authorize",
			}),
			invalidatesTags: ["Services"],
		}),
		kickAddCustomReward: builder.mutation<void, { reward: IReward }>({
			query: (args) => ({
				command: "kick_add_custom_reward",
				args,
			}),
			invalidatesTags: ["Rewards", "Alerts"],
		}),
		kickRemoveCustomReward: builder.mutation<void, { id: string }>({
			query: (args) => ({
				command: "kick_remove_custom_reward",
				args,
			}),
			invalidatesTags: ["Rewards", "Alerts"],
		}),
	}),
});
export const {
	useKickAuthorizeMutation,
	useKickAddCustomRewardMutation,
	useKickRemoveCustomRewardMutation,
} = kickApi;
