import { IDonation, IDonationsQuery } from "@widy/sdk";
import { api } from ".";

export const donationsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getDonations: builder.query<IDonation[], IDonationsQuery>({
			query: (args) => ({
				command: "get_donations",
				args: { ...args },
			}),
			providesTags: ["Donations"],
		}),
	}),
});
export const { useGetDonationsQuery } = donationsApi;
