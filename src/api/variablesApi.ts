import { IVariable } from "@widy/sdk";
import { api } from ".";

export const variablesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getVariables: builder.query<IVariable[], void>({
			query: () => ({
				command: "get_variables",
			}),
			providesTags: ["Variables"],
		}),
		getVariableById: builder.query<IVariable, { id?: string }>({
			query: (args) => ({
				command: "get_variable_by_id",
				args,
			}),
			providesTags: ["Variables"],
		}),
		createVariable: builder.mutation<void, { variable: IVariable }>({
			query: (args) => ({
				command: "create_variable",
				args,
			}),
			invalidatesTags: ["Variables"],
		}),
		updateVariable: builder.mutation<void, { variable: IVariable }>({
			query: (args) => ({
				command: "update_variable",
				args,
			}),
			invalidatesTags: ["Variables"],
		}),
	}),
});
export const {
	useGetVariablesQuery,
	useCreateVariableMutation,
	useUpdateVariableMutation,
	useGetVariableByIdQuery,
} = variablesApi;
