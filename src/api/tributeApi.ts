import { api } from ".";

export const tributeApi = api.injectEndpoints({
	endpoints: (builder) => ({
		tributeConnect: builder.mutation<void, void>({
			query: () => ({
				command: "tribute_connect",
			}),
			invalidatesTags: ["Services"],
		}),
	}),
});
export const { useTributeConnectMutation } = tributeApi;
