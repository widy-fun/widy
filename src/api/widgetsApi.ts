import { IManifest, ISerializedAppError, IWidget } from "@widy/sdk";
import { api } from ".";

export const widgetsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getWidgetById: builder.query<IWidget, { id: string }>({
			query: (args) => ({
				command: "get_widget_by_id",
				args,
			}),
			providesTags: ["Widgets"],
		}),
		getWidgets: builder.query<IWidget[], void>({
			query: () => ({
				command: "get_widgets",
			}),
			providesTags: ["Widgets"],
		}),
		getAllWidgets: builder.query<Record<string, IManifest>, void>({
			queryFn: async () => {
				try {
					const response = await fetch(
						"https://raw.githubusercontent.com/widy-fun/widgets/refs/heads/master/widgets.json",
					);
					if (!response.ok) {
						throw new Error(`HTTP ${response.status}`);
					}
					const widgets = (await response.json()) as Record<string, IManifest>;
					return { data: widgets };
				} catch (error) {
					return {
						error: {
							kind: "unknown",
							message: error instanceof Error ? error.message : String(error),
						} as unknown as ISerializedAppError,
					};
				}
			},
		}),
		addWidget: builder.mutation<
			void,
			{ devPath?: string; manifest: IManifest }
		>({
			query: (args) => ({
				command: "add_widget",
				args,
			}),
			invalidatesTags: ["Widgets"],
		}),
		deleteWidget: builder.mutation<void, { widget: IWidget }>({
			query: (args) => ({
				command: "delete_widget",
				args,
			}),
			invalidatesTags: ["Widgets"],
		}),
		installWidget: builder.mutation<void, { manifest: IManifest }>({
			query: (args) => ({
				command: "install_widget",
				args,
			}),
			invalidatesTags: ["Widgets"],
		}),
		updateWidget: builder.mutation<void, { manifest: IManifest; id: string }>({
			query: (args) => ({
				command: "update_widget",
				args,
			}),
			invalidatesTags: ["Widgets"],
		}),
	}),
});
export const {
	useGetWidgetByIdQuery,
	useAddWidgetMutation,
	useGetWidgetsQuery,
	useDeleteWidgetMutation,
	useInstallWidgetMutation,
	useUpdateWidgetMutation,
	useGetAllWidgetsQuery,
} = widgetsApi;
