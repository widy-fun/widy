import type { ISettings } from "@widy/sdk";
import { widgetApi } from ".";

export const settingsApi = widgetApi.injectEndpoints({
	endpoints: (builder) => ({
		getSettings: builder.query<ISettings, void>({
			query: () => ({
				url: "/settings",
			}),
		}),
	}),
});
export const { useGetSettingsQuery } = settingsApi;
