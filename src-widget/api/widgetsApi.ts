import type { IWidget } from "@widy/sdk";
import { api } from ".";

export const widgetsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getWidgetByWidgetId: builder.query<IWidget, { widgetId?: string }>({
			query: (args) => ({
				url: `/widgets/${args.widgetId}`,
			}),
			providesTags: ["Widgets"],
		}),
		updateWidget: builder.mutation<void, IWidget>({
			query: (args) => ({
				url: "/widgets",
				body: args,
				method: "PUT",
			}),
			invalidatesTags: ["Widgets"],
		}),
	}),
});
export const { useGetWidgetByWidgetIdQuery } = widgetsApi;
