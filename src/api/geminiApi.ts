import { api } from ".";

export const geminiApi = api.injectEndpoints({
	endpoints: (builder) => ({
		geminiConnect: builder.mutation<void, void>({
			query: () => ({
				command: "gemini_connect",
			}),
			invalidatesTags: ["Services"],
		}),
	}),
});
export const { useGeminiConnectMutation } = geminiApi;
