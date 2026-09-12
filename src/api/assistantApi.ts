import {
	IAssistantSettings,
	IAssistantStatus,
	IInputDeviceInfo,
	ToolCallingProvider,
} from "@widy/sdk";
import { api } from ".";

export const assistantApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getInputDevices: builder.query<IInputDeviceInfo[], void>({
			query: () => ({
				command: "get_input_devices",
			}),
		}),
		startAssistant: builder.mutation<
			void,
			{ assistantSettings: IAssistantSettings }
		>({
			query: (args) => ({
				command: "start_assistant",
				args,
			}),
			invalidatesTags: ["Assistant-Settings"],
		}),
		stopAssistant: builder.mutation<void, void>({
			query: () => ({
				command: "stop_assistant",
			}),
		}),
		getAssistantSettings: builder.query<IAssistantSettings, void>({
			query: () => ({
				command: "get_assistant_settings",
			}),
			providesTags: ["Assistant-Settings"],
		}),
		getAssistantProviderModels: builder.query<
			string[],
			{ provider: ToolCallingProvider }
		>({
			query: (args) => ({
				command: "get_assistant_provider_models",
				args,
			}),
		}),
		getAssistantStatus: builder.query<IAssistantStatus, void>({
			query: () => ({
				command: "get_assistant_status",
			}),
		}),
		updateAssistantSettings: builder.mutation<
			void,
			{ assistantSettings: IAssistantSettings }
		>({
			query: (args) => ({
				command: "update_assistant_settings",
				args,
			}),
			invalidatesTags: ["Assistant-Settings"],
		}),
	}),
});
export const {
	useGetInputDevicesQuery,
	useStartAssistantMutation,
	useStopAssistantMutation,
	useGetAssistantSettingsQuery,
	useUpdateAssistantSettingsMutation,
	useGetAssistantProviderModelsQuery,
	useGetAssistantStatusQuery,
} = assistantApi;
