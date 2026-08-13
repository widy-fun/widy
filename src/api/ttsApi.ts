import { PiperVoices } from "@widy/sdk";
import { api } from ".";

export const ttsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getPiperVoices: builder.query<PiperVoices, void>({
			query: () => ({
				command: "get_piper_voices",
			}),
		}),
	}),
});
export const { useGetPiperVoicesQuery } = ttsApi;
