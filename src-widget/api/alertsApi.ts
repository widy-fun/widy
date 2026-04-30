import type { IAlert } from "@widy/sdk";
import { widgetApi } from ".";

export const alertsApi = widgetApi.injectEndpoints({
	endpoints: (builder) => ({
		getAlerts: builder.query<IAlert[], void>({
			query: () => ({
				url: "/alerts",
			}),
		}),
	}),
});
export const { useGetAlertsQuery } = alertsApi;
