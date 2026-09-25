import {
	IFishAudioListModelsFilter,
	IFishAudioListModelsResponse,
	IFishAudioPageParams,
} from "@widy/sdk";
import { api } from ".";

export const fishAudioApi = api.injectEndpoints({
	endpoints: (builder) => ({
		fishAudioConnect: builder.mutation<void, void>({
			query: () => ({
				command: "fish_audio_connect",
			}),
			invalidatesTags: ["Services"],
		}),
		// getFishAudioModels: builder.query<IFishAudioListModelsResponse, void>({
		// 	query: () => ({
		// 		command: "get_fish_audio_models",
		// 	}),
		// }),
		getFishAudioModels: builder.infiniteQuery<
			IFishAudioListModelsResponse,
			{ filter: IFishAudioListModelsFilter },
			IFishAudioPageParams
		>({
			infiniteQueryOptions: {
				initialPageParam: {
					pageNumber: 1,
					pageSize: 20,
				},
				getNextPageParam: (
					lastPage,
					_allPages,
					lastPageParam,
					_allPageParams,
				) => {
					const nextPageNumber = lastPageParam.pageNumber + 1;

					if (!lastPage.has_more) {
						return undefined;
					}

					return {
						...lastPageParam,
						pageNumber: nextPageNumber,
					};
				},
			},
			query: ({ pageParam, queryArg }) => ({
				command: "get_fish_audio_models",
				args: { ...pageParam, ...queryArg },
			}),
			providesTags: ["FishAudioModels"],
		}),
	}),
});
export const {
	useFishAudioConnectMutation,
	useGetFishAudioModelsInfiniteQuery,
} = fishAudioApi;
