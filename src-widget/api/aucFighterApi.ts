import type { IAucFighterSettings } from "@widy/sdk";
import { widgetApi } from ".";

export const aucFighterApi = widgetApi.injectEndpoints({
	endpoints: (builder) => ({
		getAucFighterSettings: builder.query<IAucFighterSettings, void>({
			query: () => ({
				url: "/auc-fighter-settings",
			}),
		}),
	}),
});
export const { useGetAucFighterSettingsQuery } = aucFighterApi;
