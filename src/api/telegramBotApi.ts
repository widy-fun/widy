import { api } from ".";

export const telegramBotApi = api.injectEndpoints({
	endpoints: (builder) => ({
		telegramBotConnect: builder.mutation<void, void>({
			query: () => ({
				command: "telegram_bot_connect",
			}),
			invalidatesTags: ["Services"],
		}),
	}),
});
export const { useTelegramBotConnectMutation } = telegramBotApi;
