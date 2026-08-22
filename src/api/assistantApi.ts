import { IInputDeviceInfo } from "@widy/sdk";
import { api } from ".";

export const assistantApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getInputDevices: builder.query<IInputDeviceInfo[], void>({
			query: () => ({
				command: "get_input_devices",
			}),
		}),
		startAssistant: builder.mutation<void, { deviceInfo: IInputDeviceInfo }>({
			query: (args) => ({
				command: "start_assistant",
				args,
			}),
		}),
		stopAssistant: builder.mutation<void, void>({
			query: () => ({
				command: "stop_assistant",
			}),
		}),
	}),
});
export const {
	useGetInputDevicesQuery,
	useStartAssistantMutation,
	useStopAssistantMutation,
} = assistantApi;
