import { api } from ".";

export const destreamApi = api.injectEndpoints({
	endpoints: (builder) => ({
		destreamConnect: builder.mutation<void, void>({
			query: () => ({
				command: "destream_connect",
			}),
			invalidatesTags: ["Services"],
		}),
	}),
});
export const { useDestreamConnectMutation } = destreamApi;
