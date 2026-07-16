import { ICommand } from "@widy/sdk";
import { api } from ".";

export const commandsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCommands: builder.query<ICommand[], void>({
			query: () => ({
				command: "get_commands",
			}),
			providesTags: ["Commands"],
		}),

		getCommandById: builder.query<ICommand, { id?: string }>({
			query: (args) => ({
				command: "get_command_by_id",
				args,
			}),
			providesTags: ["Commands"],
		}),
		deleteCommandById: builder.mutation<void, { id?: string }>({
			query: (args) => ({
				command: "delete_command_by_id",
				args,
			}),
			invalidatesTags: ["Commands", "Alerts"],
		}),
		updateCommand: builder.mutation<void, { command: ICommand }>({
			query: (args) => ({
				command: "update_command",
				args,
			}),
			invalidatesTags: ["Commands", "Alerts"],
		}),
		createCommand: builder.mutation<void, { command: ICommand }>({
			query: (args) => ({
				command: "create_command",
				args,
			}),
			invalidatesTags: ["Commands", "Alerts"],
		}),
	}),
});
export const {
	useGetCommandsQuery,
	useGetCommandByIdQuery,
	useDeleteCommandByIdMutation,
	useUpdateCommandMutation,
	useCreateCommandMutation,
} = commandsApi;
