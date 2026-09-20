import { api } from ".";

export const kickSessionApi = api.injectEndpoints({
	endpoints: (builder) => ({
		kickSessionConnect: builder.mutation<void, void>({
			query: () => ({
				command: "kick_session_connect",
			}),
			invalidatesTags: ["Services"],
		}),
	}),
});
export const { useKickSessionConnectMutation } = kickSessionApi;
