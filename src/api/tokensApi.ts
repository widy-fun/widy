import { IToken, TokenType } from "@widy/sdk";
import { api } from ".";

export const moderatorsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getTokenByType: builder.query<IToken, { type: TokenType }>({
			query: (args) => ({
				command: "get_token_by_type",
				args,
			}),
			providesTags: ["Tokens"],
		}),

		rotateToken: builder.mutation<void, { token: IToken }>({
			query: (args) => ({
				command: "rotate_token",
				args,
			}),
			invalidatesTags: ["Tokens"],
		}),
	}),
});
export const { useRotateTokenMutation, useGetTokenByTypeQuery } = moderatorsApi;
