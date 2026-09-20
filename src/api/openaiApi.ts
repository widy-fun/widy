import { api } from ".";

export const openaiApi = api.injectEndpoints({
	endpoints: (builder) => ({
		openaiConnect: builder.mutation<void, void>({
			query: () => ({
				command: "openai_connect",
			}),
			invalidatesTags: ["Services"],
		}),
	}),
});
export const { useOpenaiConnectMutation } = openaiApi;
