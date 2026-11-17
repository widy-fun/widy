import { IModeratorLogs, IPageParm } from "@widy/sdk";
import { api } from ".";

export const moderatorsLogsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getModeratorLogs: builder.infiniteQuery<
			IModeratorLogs[],
			{ id?: string },
			IPageParm
		>({
			infiniteQueryOptions: {
				initialPageParam: {
					offset: 0,
					limit: 30,
				},
				getNextPageParam: (
					lastPage,
					_allPages,
					lastPageParam,
					_allPageParams,
				) => {
					const nextOffset = lastPageParam.offset + lastPageParam.limit;

					if (lastPage?.length < lastPageParam.limit) {
						return undefined;
					}

					return {
						...lastPageParam,
						offset: nextOffset,
					};
				},
			},
			query: ({ pageParam, queryArg }) => ({
				command: "get_moderator_logs",
				args: { ...pageParam, ...queryArg },
			}),
			providesTags: ["ModeratorsLogs"],
		}),
		addModeratorLog: builder.mutation<void, { moderatorLog: IModeratorLogs }>({
			query: (args) => ({
				command: "add_moderator_log",
				args,
			}),
			invalidatesTags: ["ModeratorsLogs"],
		}),
	}),
});
export const { useAddModeratorLogMutation, useGetModeratorLogsInfiniteQuery } =
	moderatorsLogsApi;
