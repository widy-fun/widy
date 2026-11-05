import {
	IObsGetInputListResponse,
	IObsGetSceneItemListResponse,
	IObsGetSceneListResponse,
	IObsGetSourceFilterListResponse,
	IObsResponseData,
} from "@widy/sdk";
import { api } from ".";

export const obsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		obsConnect: builder.mutation<void, void>({
			query: () => ({
				command: "obs_connect",
			}),
			invalidatesTags: ["Services"],
		}),
		getObsSources: builder.query<
			IObsResponseData<IObsGetInputListResponse>,
			void
		>({
			query: () => ({
				command: "get_obs_sources",
			}),
		}),
		getObsScenes: builder.query<
			IObsResponseData<IObsGetSceneListResponse>,
			void
		>({
			query: () => ({
				command: "get_obs_scenes",
			}),
		}),
		getObsSceneSources: builder.query<
			IObsResponseData<IObsGetSceneItemListResponse>,
			{ sceneName?: string; sceneUuid?: string }
		>({
			query: (args) => ({
				command: "get_obs_scene_sources",
				args,
			}),
		}),
		getObsSourceFilters: builder.query<
			IObsResponseData<IObsGetSourceFilterListResponse>,
			{ sourceName?: string; sourceUuid?: string }
		>({
			query: (args) => ({
				command: "get_obs_source_filters",
				args,
			}),
		}),
	}),
});
export const {
	useObsConnectMutation,
	useGetObsSourcesQuery,
	useGetObsScenesQuery,
	useGetObsSceneSourcesQuery,
	useGetObsSourceFiltersQuery,
} = obsApi;
