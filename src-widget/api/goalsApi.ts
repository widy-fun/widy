import type { IGoal } from "@widy/sdk";
import { GoalType } from "@widy/sdk";
import { widgetApi } from ".";

export const goalsApi = widgetApi.injectEndpoints({
	endpoints: (builder) => ({
		getNotEndedGoal: builder.query<IGoal, { type: GoalType }>({
			query: (args) => ({
				params: { ...args },
				url: "/goals",
			}),
		}),
	}),
});
export const { useGetNotEndedGoalQuery } = goalsApi;
