import { INsfwSettings, IWindowInfo } from "@widy/sdk";
import { api } from ".";

export const nsfwApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getWindows: builder.query<IWindowInfo[], void>({
			query: () => ({
				command: "get_windows",
			}),
		}),

		getNsfwSettings: builder.query<INsfwSettings, void>({
			query: () => ({
				command: "get_nsfw_settings",
			}),
			providesTags: ["Nsfw-Settings"],
		}),
		startNsfw: builder.mutation<void, { windowInfo: IWindowInfo }>({
			query: (args) => ({
				command: "start_nsfw",
				args,
			}),
		}),
		stopNsfw: builder.mutation<void, void>({
			query: () => ({
				command: "stop_nsfw",
			}),
		}),
		updateNsfwSettings: builder.mutation<void, { nsfwSettings: INsfwSettings }>(
			{
				query: (args) => ({
					command: "update_nsfw_settings",
					args,
				}),
				invalidatesTags: ["Nsfw-Settings"],
			},
		),
	}),
});
export const {
	useGetWindowsQuery,
	useStartNsfwMutation,
	useStopNsfwMutation,
	useGetNsfwSettingsQuery,
	useUpdateNsfwSettingsMutation,
} = nsfwApi;
