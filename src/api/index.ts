import { type BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import { type InvokeArgs, invoke } from "@tauri-apps/api/core";
import { SerializedAppError } from "@widy/sdk";
import i18n from "../../shared/i18n/i18n";

const tauriBaseQuery =
	(): BaseQueryFn<
		{ command: string; args?: InvokeArgs | undefined },
		unknown,
		SerializedAppError
	> =>
	async ({ command, args }) => {
		try {
			const result = await invoke<unknown>(command, args);
			return { data: result };
		} catch (error) {
			console.error(error);
			const err = error as SerializedAppError;
			return {
				error: { ...err, message: i18n.t(`errors.${err.kind}`) },
			};
		}
	};

export const api = createApi({
	reducerPath: "api",
	baseQuery: tauriBaseQuery(),
	tagTypes: [
		"Services",
		"Settings",
		"Alerts",
		"Auc-Filters",
		"Auction-Settings",
		"Goals",
		"Maption-Settings",
		"Media-Settings",
		"Messages",
		"Widgets",
		"Nsfw-Settings",
		"Rewards",
		"Commands",
	],
	endpoints: (builder) => ({
		init: builder.mutation<void, void>({
			query: () => ({
				command: "init",
			}),
		}),
		twitchSignOut: builder.mutation<void, void>({
			query: () => ({
				command: "twitch_sign_out",
			}),
			invalidatesTags: ["Services"],
		}),
		widySolSignOut: builder.mutation<void, void>({
			query: () => ({
				command: "widy_sol_sign_out",
			}),
			invalidatesTags: ["Services"],
		}),
		widyTonSignOut: builder.mutation<void, void>({
			query: () => ({
				command: "widy_ton_sign_out",
			}),
			invalidatesTags: ["Services"],
		}),
		donationAlertsSignOut: builder.mutation<void, void>({
			query: () => ({
				command: "donation_alerts_sign_out",
			}),
			invalidatesTags: ["Services"],
		}),
		streamLabsSignOut: builder.mutation<void, void>({
			query: () => ({
				command: "stream_labs_sign_out",
			}),
			invalidatesTags: ["Services"],
		}),
		donatePaySignOut: builder.mutation<void, void>({
			query: () => ({
				command: "donate_pay_sign_out",
			}),
			invalidatesTags: ["Services"],
		}),
		destreamSignOut: builder.mutation<void, void>({
			query: () => ({
				command: "destream_sign_out",
			}),
			invalidatesTags: ["Services"],
		}),
		tributeSignOut: builder.mutation<void, void>({
			query: () => ({
				command: "tribute_sign_out",
			}),
			invalidatesTags: ["Services"],
		}),
		kickSignOut: builder.mutation<void, void>({
			query: () => ({
				command: "kick_sign_out",
			}),
			invalidatesTags: ["Services"],
		}),
		kickBotSignOut: builder.mutation<void, void>({
			query: () => ({
				command: "kick_bot_sign_out",
			}),
			invalidatesTags: ["Services"],
		}),
		twitchBotSignOut: builder.mutation<void, void>({
			query: () => ({
				command: "twitch_bot_sign_out",
			}),
			invalidatesTags: ["Services"],
		}),
	}),
});

export const {
	useInitMutation,
	useTwitchSignOutMutation,
	useWidySolSignOutMutation,
	useWidyTonSignOutMutation,
	useDonationAlertsSignOutMutation,
	useStreamLabsSignOutMutation,
	useDonatePaySignOutMutation,
	useDestreamSignOutMutation,
	useTributeSignOutMutation,
	useKickSignOutMutation,
	useKickBotSignOutMutation,
	useTwitchBotSignOutMutation,
} = api;
