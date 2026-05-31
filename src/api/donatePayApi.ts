import { api } from ".";

export const donatePayApi = api.injectEndpoints({
	endpoints: (builder) => ({
		donatePayConnect: builder.mutation<void, void>({
			query: () => ({
				command: "donate_pay_connect",
			}),
			invalidatesTags: ["Services"],
		}),
	}),
});
export const { useDonatePayConnectMutation } = donatePayApi;
