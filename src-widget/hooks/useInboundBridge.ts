import {
	AppEvent,
	GoalType,
	IDonationsQuery,
	IMessagesFilter,
	IPageParm,
	IWidget,
	IWidgetRequest,
	IWidgetResponse,
	WidgetSend,
	WidgetSubscription,
} from "@widy/sdk";
import { useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useAppEvents from "../../shared/hooks/useAppEvents";
import { AppDispatch } from "../../src/store";
import { alertsApi } from "../api/alertsApi";
import { aucFighterApi } from "../api/aucFighterApi";
import { donationsApi } from "../api/donationsApi";
import { goalsApi } from "../api/goalsApi";
import { messagesApi } from "../api/messagesApi";
import { settingsApi } from "../api/settingsApi";
import { widgetsApi } from "../api/widgetsApi";

type WidgetSubscriptions = Exclude<
	WidgetSubscription,
	"widgets:view:storage.subscription" | "widgets:control:storage.subscription"
>;
interface RequestContext {
	dispatch: AppDispatch;
	widget: IWidget;
	arg: unknown;
}
interface RequestResult {
	data?: unknown;
	error?: unknown;
}

const SEND_SCOPES: Record<WidgetSend, AppEvent> = {
	"widgets:auc-fighter:match-end.send": AppEvent.AucFighterMatchEnd,
	"widgets:auc-fighter:match-playing.send": AppEvent.AucFighterMatchPlaying,
	"widgets:auc-fighter:match-paused.send": AppEvent.AucFighterMatchPaused,
	"widgets:alert:played.send": AppEvent.AlertPlayed,
	"widgets:alert:playing.send": AppEvent.AlertPlaying,
	"widgets:alert:replay.send": AppEvent.ReplayAlert,
	"widgets:alert:skip.send": AppEvent.SkipAlert,
	"widgets:media:played.send": AppEvent.MediaPlayed,
	"widgets:media:play.send": AppEvent.PlayMedia,
	"widgets:media:playing.send": AppEvent.MediaPlaying,
	"widgets:media:paused.send": AppEvent.MediaPaused,
	"widgets:media:end.send": AppEvent.MediaEnd,
	"widgets:media:error.send": AppEvent.MediaError,
	"widgets:media:replay.send": AppEvent.ReplayMedia,
	"widgets:media:skip.send": AppEvent.SkipMedia,
	"widgets:tts:played.send": AppEvent.TtsPlayed,
	"widgets:tts:playing.send": AppEvent.TtsPlaying,
	"widgets:tts:replay.send": AppEvent.ReplayTts,
	"widgets:tts:skip.send": AppEvent.SkipTts,
};

const SUBSCRIPTION_SCOPES: Record<WidgetSubscriptions, AppEvent> = {
	"widgets:messages.subscription": AppEvent.Message,
	"widgets:donation.subscription": AppEvent.Donation,
	"widgets:redemption.subscription": AppEvent.Redemption,
	"widgets:media.subscription": AppEvent.Media,
	"widgets:alert.subscription": AppEvent.Alert,
	"widgets:chat-message.subscription": AppEvent.ChatMessage,
	"widgets:chat-message-delete.subscription": AppEvent.ChatMessageDelete,
	"widgets:goal.subscription": AppEvent.Goal,
	"widgets:settings.subscription": AppEvent.Settings,
	"widgets:auc-fighter:start-match.subscription": AppEvent.StartAucFighterMatch,
	"widgets:auc-fighter:pause-match.subscription": AppEvent.PauseAucFighterMatch,
	"widgets:auc-fighter:resume-match.subscription":
		AppEvent.ResumeAucFighterMatch,
	"widgets:auc-fighter:cancel-match.subscription":
		AppEvent.CancelAucFighterMatch,
	"widgets:auc-fighter:update-match.subscription":
		AppEvent.UpdateAucFighterMatch,
	"widgets:auc-fighter:settings.subscription": AppEvent.AucFighterSettings,
	"widgets:alert:replay.subscription": AppEvent.ReplayAlert,
	"widgets:alert:skip.subscription": AppEvent.SkipAlert,
	"widgets:alert:skip-playing.subscription": AppEvent.SkipPlayingAlert,
	"widgets:alert:update.subscription": AppEvent.UpdateAlert,
	"widgets:alert:played.subscription": AppEvent.AlertPlayed,
	"widgets:alert:playing.subscription": AppEvent.AlertPlaying,
	"widgets:media:replay.subscription": AppEvent.ReplayMedia,
	"widgets:media:settings.subscription": AppEvent.MediaSettings,
	"widgets:media:skip.subscription": AppEvent.SkipMedia,
	"widgets:media:skip-playing-media.subscription": AppEvent.SkipPlayingMedia,
	"widgets:media:end.subscription": AppEvent.MediaEnd,
	"widgets:media:error.subscription": AppEvent.MediaError,
	"widgets:media:pause.subscription": AppEvent.PauseMedia,
	"widgets:media:play.subscription": AppEvent.PlayMedia,
	"widgets:media:played.subscription": AppEvent.MediaPlayed,
	"widgets:media:playing.subscription": AppEvent.MediaPlaying,
	"widgets:tts:replay.subscription": AppEvent.ReplayTts,
	"widgets:tts:skip.subscription": AppEvent.SkipTts,
	"widgets:tts:skip-playing.subscription": AppEvent.SkipPlayingTts,
	"widgets:tts:played.subscription": AppEvent.TtsPlayed,
	"widgets:tts:playing.subscription": AppEvent.TtsPlaying,
	"widgets:command:action.subscription": AppEvent.CommandAction,
	"widgets:assistant:action.subscription": AppEvent.AssistantAction,
	"widgets:channel-user-banned.subscription": AppEvent.ChannelUserBanned,
	"widgets:channel-subscription.subscription": AppEvent.ChannelSubscription,
	"widgets:command-auction-action.subscription": AppEvent.CommandAuctionAction,
};

const WIDGET_STORAGE_SCOPES: Record<
	string,
	{ event: AppEvent; field: "view_storage" | "control_storage" }
> = {
	"widgets:view:storage.subscription": {
		event: AppEvent.WidgetViewStorage,
		field: "view_storage",
	},
	"widgets:control:storage.subscription": {
		event: AppEvent.WidgetControlStorage,
		field: "control_storage",
	},
};

const REQUEST_SCOPES: Record<
	string,
	(ctx: RequestContext) => Promise<RequestResult>
> = {
	"widgets:goals.read": ({ dispatch, arg }) =>
		dispatch(
			goalsApi.endpoints.getNotEndedGoal.initiate(arg as { type: GoalType }, {
				forceRefetch: true,
			}),
		),
	"widgets:auc-fighter:settings.read": ({ dispatch }) =>
		dispatch(
			aucFighterApi.endpoints.getAucFighterSettings.initiate(undefined, {
				forceRefetch: true,
			}),
		),
	"widgets:messages.read": async ({ dispatch, arg }) => {
		const params = arg as { filter: IMessagesFilter } & IPageParm;
		const { data, error } = await dispatch(
			messagesApi.endpoints.getMessages.initiate(params, {
				initialPageParam: { limit: params.limit, offset: params.offset },
				forceRefetch: true,
			}),
		);
		return { data: data?.pages.flat(), error };
	},
	"widgets:settings.read": ({ dispatch }) =>
		dispatch(
			settingsApi.endpoints.getSettings.initiate(undefined, {
				forceRefetch: true,
			}),
		),
	"widgets:alerts.read": ({ dispatch }) =>
		dispatch(
			alertsApi.endpoints.getAlerts.initiate(undefined, {
				forceRefetch: true,
			}),
		),
	"widgets:donations.read": ({ dispatch, arg }) =>
		dispatch(
			donationsApi.endpoints.getDonations.initiate(arg as IDonationsQuery, {
				forceRefetch: true,
			}),
		),
	"widgets:view:storage.read": async ({ dispatch, widget }) => {
		const { data, error } = await dispatch(
			widgetsApi.endpoints.getWidgetById.initiate(
				{ id: widget.id },
				{ forceRefetch: true },
			),
		);
		return { data: data?.view_storage, error };
	},
	"widgets:control:storage.read": async ({ dispatch, widget }) => {
		const { data, error } = await dispatch(
			widgetsApi.endpoints.getWidgetById.initiate(
				{ id: widget.id },
				{ forceRefetch: true },
			),
		);
		return { data: data?.control_storage, error };
	},
	"widgets:view:storage.write": ({ dispatch, widget, arg }) =>
		dispatch(
			widgetsApi.endpoints.updateWidgetViewStorage.initiate({
				...widget,
				viewStorage: JSON.stringify(arg),
			}),
		),
	"widgets:control:storage.write": ({ dispatch, widget, arg }) =>
		dispatch(
			widgetsApi.endpoints.updateControlViewStorage.initiate({
				...widget,
				controlStorage: JSON.stringify(arg),
			}),
		),
};

const useInboundBridge = (widget?: IWidget) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const eventsService = useAppEvents();
	const dispatch = useDispatch<AppDispatch>();

	const widgetRef = useRef(widget);
	const eventsServiceRef = useRef(eventsService);
	const dispatchRef = useRef(dispatch);
	widgetRef.current = widget;
	eventsServiceRef.current = eventsService;
	dispatchRef.current = dispatch;

	const subscriptionsRef = useRef<Map<string, () => void>>(new Map());

	useLayoutEffect(() => {
		const subscriptions = subscriptionsRef.current;

		const reply = (response: IWidgetResponse) => {
			iframeRef.current?.contentWindow?.postMessage(response, "*");
		};

		const unsubscribeRequest = (id: string) => {
			subscriptions.get(id)?.();
			subscriptions.delete(id);
		};

		const subscribe = (
			id: string,
			event: AppEvent,
			transform?: (data: any) => { data: unknown } | undefined,
		) => {
			unsubscribeRequest(id);

			const unsubscribe = eventsServiceRef.current.subscribe<any>(
				event,
				(data) => {
					if (!transform) return reply({ id, data });
					const result = transform(data);
					if (result) reply({ id, data: result.data });
				},
			);
			subscriptions.set(id, unsubscribe);
		};

		const handleRequest = async (event: MessageEvent<IWidgetRequest>) => {
			if (
				!iframeRef.current ||
				event.source !== iframeRef.current.contentWindow
			) {
				return;
			}

			const currentWidget = widgetRef.current;
			const { id, scope, arg, unsubscribe } = event.data ?? {};
			if (!currentWidget || !id) return;

			if (!scope || !currentWidget.manifest.scopes.includes(scope)) return;

			if (unsubscribe) {
				unsubscribeRequest(id);
				return;
			}

			try {
				const sendEvent = SEND_SCOPES[scope as WidgetSend];
				if (sendEvent) {
					eventsServiceRef.current.send({
						event: sendEvent,
						data: arg,
					});
					reply({ id });
					return;
				}

				const subscribeEvent =
					SUBSCRIPTION_SCOPES[scope as WidgetSubscriptions];
				if (subscribeEvent) {
					subscribe(id, subscribeEvent);
					return;
				}

				const storageScope = WIDGET_STORAGE_SCOPES[scope];
				if (storageScope) {
					subscribe(id, storageScope.event, (data: IWidget) =>
						data.id === currentWidget.id
							? { data: data[storageScope.field] }
							: undefined,
					);
					return;
				}

				const requestHandler = REQUEST_SCOPES[scope];
				if (requestHandler) {
					const { data, error } = await requestHandler({
						dispatch: dispatchRef.current,
						widget: currentWidget,
						arg,
					});
					reply({ id, data, error });
				}
			} catch (error) {
				reply({ id, error });
			}
		};

		window.addEventListener("message", handleRequest);
		return () => {
			window.removeEventListener("message", handleRequest);
			for (const unsubscribe of subscriptions.values()) {
				unsubscribe();
			}
			subscriptions.clear();
		};
	}, []);

	return iframeRef;
};
export default useInboundBridge;
