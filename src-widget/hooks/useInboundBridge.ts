import {
	AppEvent,
	GoalType,
	IAlert,
	IAucFighterMatch,
	IAucFighterMatchWinner,
	IAucFighterSettings,
	IClientMessage,
	IGoal,
	IMediaSettings,
	IMessagesFilter,
	IPageParm,
	ISettings,
	IWidget,
	IWidgetRequest,
	MatchId,
	MessageId,
} from "@widy/sdk";
import { useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useAppEvents from "../../shared/hooks/useAppEvents";
import { AppDispatch } from "../../src/store";
import { alertsApi } from "../api/alertsApi";
import { aucFighterApi } from "../api/aucFighterApi";
import { goalsApi } from "../api/goalsApi";
import { messagesApi } from "../api/messagesApi";
import { settingsApi } from "../api/settingsApi";
import { widgetsApi } from "../api/widgetsApi";

const useInboundBridge = (widget?: IWidget) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const eventsService = useAppEvents();
	const dispatch = useDispatch<AppDispatch>();
	const messageHandler = async (event: MessageEvent<IWidgetRequest>) => {
		const { id, scope, arg } = event.data;

		if (widget && id && scope && widget.manifest.scopes.includes(scope)) {
			try {
				switch (scope) {
					case "widgets:messages.subscription":
						eventsService.subscribe<IClientMessage>(
							AppEvent.Message,
							(data) => {
								iframeRef.current?.contentWindow?.postMessage(
									{ id, data },
									"*",
								);
							},
						);
						break;
					case "widgets:goal.subscription":
						eventsService.subscribe<IGoal>(AppEvent.Goal, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:settings.subscription":
						eventsService.subscribe<ISettings>(AppEvent.Settings, (data) => {
							data.widget_token="";
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;

					case "widgets:goals.read": {
						const { data, error } = await dispatch(
							goalsApi.endpoints.getNotEndedGoal.initiate(
								arg as { type: GoalType },
								{ forceRefetch: true },
							),
						);
						iframeRef.current?.contentWindow?.postMessage(
							{ id, data, error },
							"*",
						);

						break;
					}
					case "widgets:auc-fighter:settings.read": {
						const { data, error } = await dispatch(
							aucFighterApi.endpoints.getAucFighterSettings.initiate(
								undefined,
								{ forceRefetch: true },
							),
						);
						iframeRef.current?.contentWindow?.postMessage(
							{ id, data, error },
							"*",
						);
						break;
					}
					case "widgets:auc-fighter:start-match.subscription":
						eventsService.subscribe<IAucFighterMatch>(
							AppEvent.StartAucFighterMatch,
							(data) => {
								iframeRef.current?.contentWindow?.postMessage(
									{ id, data },
									"*",
								);
							},
						);
						break;
					case "widgets:auc-fighter:match-winner.send":
						eventsService.send<IAucFighterMatchWinner>({
							event: AppEvent.AucFighterMatchEnd,
							data: arg as IAucFighterMatchWinner,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;

					case "widgets:auc-fighter:match-playing.send":
						eventsService.send<MatchId>({
							event: AppEvent.AucFighterMatchPlaying,
							data: arg as MatchId,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;

					case "widgets:auc-fighter:pause-match.subscription":
						eventsService.subscribe<MatchId>(
							AppEvent.PauseAucFighterMatch,
							(data) => {
								iframeRef.current?.contentWindow?.postMessage(
									{ id, data },
									"*",
								);
							},
						);
						break;
					case "widgets:auc-fighter:match-paused.send":
						eventsService.send<MatchId>({
							event: AppEvent.AucFighterMatchPaused,
							data: arg as MatchId,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;
					case "widgets:auc-fighter:resume-match.subscription":
						eventsService.subscribe(AppEvent.ResumeAucFighterMatch, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:auc-fighter:cancel-match.subscription":
						eventsService.subscribe(AppEvent.CancelAucFighterMatch, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:auc-fighter:update-match.subscription":
						eventsService.subscribe<IAucFighterMatch>(
							AppEvent.UpdateAucFighterMatch,
							(data) => {
								iframeRef.current?.contentWindow?.postMessage(
									{ id, data },
									"*",
								);
							},
						);
						break;
					case "widgets:auc-fighter:settings.subscription":
						eventsService.subscribe<IAucFighterSettings>(
							AppEvent.AucFighterSettings,
							(data) => {
								iframeRef.current?.contentWindow?.postMessage(
									{ id, data },
									"*",
								);
							},
						);
						break;
					case "widgets:messages.read": {
						const params = arg as { filter: IMessagesFilter } & IPageParm;
						const { data, error } = await dispatch(
							messagesApi.endpoints.getMessages.initiate(params, {
								initialPageParam: {
									limit: params.limit,
									offset: params.offset,
								},
								forceRefetch: true,
							}),
						);

						iframeRef.current?.contentWindow?.postMessage(
							{ id, data: data?.pages.flat(), error },
							"*",
						);
						break;
					}
					case "widgets:alert:played.send":
						eventsService.send<MessageId>({
							event: AppEvent.AlertPlayed,
							data: arg as MessageId,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;
					case "widgets:alert:playing.send":
						eventsService.send<MessageId>({
							event: AppEvent.AlertPlaying,
							data: arg as MessageId,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;
					case "widgets:alert:replay.subscription":
						eventsService.subscribe<IClientMessage>(
							AppEvent.ReplayAlert,
							(data) => {
								iframeRef.current?.contentWindow?.postMessage(
									{ id, data },
									"*",
								);
							},
						);
						break;
					case "widgets:alert:skip.subscription":
						eventsService.subscribe<string>(AppEvent.SkipAlert, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:alert:test.subscription":
						eventsService.subscribe<string>(AppEvent.TestAlert, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:alert:skip-playing.subscription":
						eventsService.subscribe<null>(AppEvent.SkipPlayingAlert, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:alert:alerts.subscription":
						eventsService.subscribe<IAlert[]>(AppEvent.Alerts, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:settings.read": {
						const { data, error } = await dispatch(
							settingsApi.endpoints.getSettings.initiate(undefined, {
								forceRefetch: true,
							}),
						);
						if(data){
							data.widget_token="";
						}

						iframeRef.current?.contentWindow?.postMessage(
							{ id, data, error },
							"*",
						);
						break;
					}
					case "widgets:alerts.read": {
						const { data, error } = await dispatch(
							alertsApi.endpoints.getAlerts.initiate(undefined, {
								forceRefetch: true,
							}),
						);
						iframeRef.current?.contentWindow?.postMessage(
							{ id, data, error },
							"*",
						);

						break;
					}
					case "widgets:media:played.send":
						eventsService.send<MessageId>({
							event: AppEvent.MediaPlayed,
							data: arg as MessageId,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;
					case "widgets:media:replay.subscription":
						eventsService.subscribe<IClientMessage>(
							AppEvent.ReplayMedia,
							(data) => {
								iframeRef.current?.contentWindow?.postMessage(
									{ id, data },
									"*",
								);
							},
						);
						break;
					case "widgets:media:settings.subscription":
						eventsService.subscribe<IMediaSettings>(
							AppEvent.MediaSettings,
							(data) => {
								iframeRef.current?.contentWindow?.postMessage(
									{ id, data },
									"*",
								);
							},
						);
						break;
					case "widgets:media:skip.subscription":
						eventsService.subscribe<string>(AppEvent.SkipMedia, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:media:skip-playing-media.subscription":
						eventsService.subscribe<null>(AppEvent.SkipPlayingMedia, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:media:end.subscription":
						eventsService.subscribe<string>(AppEvent.MediaEnd, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:media:error.subscription":
						eventsService.subscribe<string>(AppEvent.MediaError, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:alert:played.subscription":
						eventsService.subscribe<string>(AppEvent.AlertPlayed, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:media:pause.subscription":
						eventsService.subscribe<MessageId>(AppEvent.PauseMedia, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:media:play.subscription":
						eventsService.subscribe<MessageId>(AppEvent.PlayMedia, (data) => {
							iframeRef.current?.contentWindow?.postMessage({ id, data }, "*");
						});
						break;
					case "widgets:media:end.send":
						eventsService.send<MessageId>({
							event: AppEvent.MediaEnd,
							data: arg as MessageId,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;
					case "widgets:media:playing.send":
						eventsService.send<MessageId>({
							event: AppEvent.MediaPlaying,
							data: arg as MessageId,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;
					case "widgets:media:paused.send":
						eventsService.send<MessageId>({
							event: AppEvent.MediaPaused,
							data: arg as MessageId,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;
					case "widgets:media:error.send":
						eventsService.send<MessageId>({
							event: AppEvent.MediaError,
							data: arg as MessageId,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;
					case "widgets:media:replay.send":
						eventsService.send<IClientMessage>({
							event: AppEvent.ReplayMedia,
							data: arg as IClientMessage,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;
					case "widgets:alert:replay.send":
						eventsService.send<IClientMessage>({
							event: AppEvent.ReplayAlert,
							data: arg as IClientMessage,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;
					case "widgets:alert:skip.send":
						eventsService.send<MessageId>({
							event: AppEvent.SkipAlert,
							data: arg as MessageId,
						});
						iframeRef.current?.contentWindow?.postMessage({ id }, "*");
						break;
					case "widgets:view:storage.read":
						{
							const { data, error } = await dispatch(
								widgetsApi.endpoints.getWidgetById.initiate(
									{
										id: widget.id,
									},
									{ forceRefetch: true },
								),
							);
							iframeRef.current?.contentWindow?.postMessage(
								{ id, data: data?.view_storage, error },
								"*",
							);
						}

						break;
					case "widgets:control:storage.read": {
						const { data, error } = await dispatch(
							widgetsApi.endpoints.getWidgetById.initiate(
								{
									id: widget.id,
								},
								{ forceRefetch: true },
							),
						);
						iframeRef.current?.contentWindow?.postMessage(
							{ id, data: data?.control_storage, error },
							"*",
						);
						break;
					}
					case "widgets:view:storage.write": {
						const { data, error } = await dispatch(
							widgetsApi.endpoints.updateWidgetViewStorage.initiate({
								...widget,
								viewStorage: JSON.stringify(arg),
							}),
						);
						iframeRef.current?.contentWindow?.postMessage(
							{ id, data, error },
							"*",
						);
						break;
					}
					case "widgets:control:storage.write": {
						const { data, error } = await dispatch(
							widgetsApi.endpoints.updateControlViewStorage.initiate({
								...widget,
								controlStorage: JSON.stringify(arg),
							}),
						);

						iframeRef.current?.contentWindow?.postMessage(
							{ id, data, error },
							"*",
						);
						break;
					}
					case "widgets:view:storage.subscription":
						eventsService.subscribe<IWidget>(
							AppEvent.WidgetViewStorage,
							(data) => {
								if (data.id === widget.id) {
									iframeRef.current?.contentWindow?.postMessage(
										{ id, data: data.view_storage },
										"*",
									);
								}
							},
						);
						break;
					case "widgets:control:storage.subscription":
						eventsService.subscribe<IWidget>(
							AppEvent.WidgetControlStorage,
							(data) => {
								if (data.id === widget.id) {
									iframeRef.current?.contentWindow?.postMessage(
										{ id, data: data.control_storage },
										"*",
									);
								}
							},
						);
						break;
					default:
						break;
				}
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				iframeRef.current?.contentWindow?.postMessage(
					{ id, error: message },
					"*",
				);
			}
		}
	};

	useLayoutEffect(() => {
		window.addEventListener("message", messageHandler);
		return () => {
			window.removeEventListener("message", messageHandler);
		};
	}, [messageHandler]);

	return iframeRef;
};
export default useInboundBridge;
