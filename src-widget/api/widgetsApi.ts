import type { IWidget } from "@widy/sdk";
import { widgetApi } from ".";

export const widgetsApi = widgetApi.injectEndpoints({
	endpoints: (builder) => ({
		getWidgetById: builder.query<IWidget, { id?: string }>({
			query: (args) => ({
				url: `/widgets/${args.id}`,
			}),
			providesTags: ["Widgets"],
		}),
		updateWidgetViewStorage: builder.mutation<
			void,
			{ viewStorage: string; id: string }
		>({
			query: (args) => ({
				url: `/widgets/view/storage/${args.id}`,
				body: args.viewStorage,
				method: "PATCH",
			}),
			invalidatesTags: ["Widgets"],
		}),
		updateControlViewStorage: builder.mutation<
			void,
			{ controlStorage: string; id: string }
		>({
			query: (args) => ({
				url: `/widgets/control/storage/${args.id}`,
				body: args.controlStorage,
				method: "PATCH",
			}),
			invalidatesTags: ["Widgets"],
		}),
	}),
});
export const {
	useGetWidgetByIdQuery,
	useUpdateControlViewStorageMutation,
	useUpdateWidgetViewStorageMutation,
} = widgetsApi;
