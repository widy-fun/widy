import { IDonation, IDonationsQuery } from "@widy/sdk";
import { widgetApi } from ".";

export const donationsApi = widgetApi.injectEndpoints({
	endpoints: (builder) => ({
		getDonations: builder.query<IDonation[], IDonationsQuery>({
			query: (args) => ({
				url: "/donations",
				params: { ...args },
			}),
			providesTags: ["Donations"],
		}),
	}),
});
export const { useGetDonationsQuery } = donationsApi;
