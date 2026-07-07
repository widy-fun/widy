import { api } from ".";

export const kickBotApi = api.injectEndpoints({
	endpoints: (builder) => ({
		kickBotAuthorize: builder.mutation<void, void>({
			query: () => ({
				command: "kick_bot_authorize",
			}),
			invalidatesTags: ["Services"],
		}),
	}),
});
export const { useKickBotAuthorizeMutation } = kickBotApi;
