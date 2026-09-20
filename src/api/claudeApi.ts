import { api } from ".";

export const claudeApi = api.injectEndpoints({
	endpoints: (builder) => ({
		claudeConnect: builder.mutation<void, void>({
			query: () => ({
				command: "claude_connect",
			}),
			invalidatesTags: ["Services"],
		}),
	}),
});
export const { useClaudeConnectMutation } = claudeApi;
