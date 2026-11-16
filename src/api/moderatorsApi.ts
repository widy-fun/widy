import { IModerator } from "@widy/sdk";
import { api } from ".";

export const moderatorsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getModerators: builder.query<IModerator[], void>({
			query: () => ({
				command: "get_moderators",
			}),
			providesTags: ["Moderators"],
		}),
		getModeratorById: builder.query<IModerator, { id?: string }>({
			query: (args) => ({
				command: "get_moderator_by_id",
				args,
			}),
			providesTags: ["Moderators"],
		}),
		createModerator: builder.mutation<void, { moderator: IModerator }>({
			query: (args) => ({
				command: "create_moderator",
				args,
			}),
			invalidatesTags: ["Moderators"],
		}),
		updateModerator: builder.mutation<void, { moderator: IModerator }>({
			query: (args) => ({
				command: "update_moderator",
				args,
			}),
			invalidatesTags: ["Moderators"],
		}),
		deleteModeratorById: builder.mutation<void, { id: string }>({
			query: (args) => ({
				command: "delete_moderator_by_id",
				args,
			}),
			invalidatesTags: ["Moderators"],
		}),
	}),
});
export const {
	useGetModeratorsQuery,
	useGetModeratorByIdQuery,
	useCreateModeratorMutation,
	useUpdateModeratorMutation,
	useDeleteModeratorByIdMutation,
} = moderatorsApi;
