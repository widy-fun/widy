import { IReward, Platform } from "@widy/sdk";
import { api } from ".";

export const rewardsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getRewards: builder.query<IReward[], void>({
			query: () => ({
				command: "get_rewards",
			}),
			providesTags: ["Rewards"],
		}),
		getRewardById: builder.query<IReward, { id?: string }>({
			query: (args) => ({
				command: "get_reward_by_id",
				args,
			}),
			providesTags: ["Rewards"],
		}),
		getRewardByTitle: builder.mutation<
			IReward | undefined,
			{ title: string; platform: Platform }
		>({
			query: (args) => ({
				command: "get_reward_by_title",
				args,
			}),
		}),
		updateRewardSettings: builder.mutation<void, { reward: IReward }>({
			query: (args) => ({
				command: "update_reward_settings",
				args,
			}),
			invalidatesTags: ["Rewards"],
		}),
	}),
});
export const {
	useGetRewardsQuery,
	useGetRewardByIdQuery,
	useUpdateRewardSettingsMutation,
	useGetRewardByTitleMutation,
} = rewardsApi;
