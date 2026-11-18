import prepare, {
	prepareUtils,
	WrcMaster,
} from "@webrtc-remote-control/core/master";
import { AppEvent, IClientMessage, IWidgetRequest, MessageId } from "@widy/sdk";
import Peer, { PeerOptions } from "peerjs";
import { useEffect, useRef, useState } from "react";
import useAppEvents from "../../shared/hooks/useAppEvents";
import { store } from "./../../src-widget/store/index";
import { moderatorsLogsApi } from "../api/moderatorsLogsApi";

type Unsubscribe = () => void;
type ConnectionSubscriptions = Map<string, Unsubscribe>;
type Payload = MessageId | IClientMessage;

const SEND_SCOPES: Record<string, AppEvent> = {
	"widgets:alert:skip.send": AppEvent.SkipAlert,
	"widgets:alert:replay.send": AppEvent.ReplayAlert,
	"widgets:media:replay.send": AppEvent.ReplayMedia,
	"widgets:media:skip.send": AppEvent.SkipMedia,
	"widgets:media:paused.send": AppEvent.PauseMedia,
	"widgets:media:playing.send": AppEvent.MediaPlaying,
	"widgets:media:play.send": AppEvent.PlayMedia,
	"widgets:tts:replay.send": AppEvent.ReplayTts,
	"widgets:tts:skip.send": AppEvent.SkipTts,
};

const SUBSCRIPTION_SCOPES: Record<string, AppEvent> = {
	"widgets:messages.subscription": AppEvent.Message,
	"widgets:alert:playing.subscription": AppEvent.AlertPlaying,
	"widgets:alert:played.subscription": AppEvent.AlertPlayed,
	"widgets:media:playing.subscription": AppEvent.MediaPlaying,
	"widgets:media:played.subscription": AppEvent.MediaPlayed,
	"widgets:media:pause.subscription": AppEvent.MediaPaused,
	"widgets:tts:played.subscription": AppEvent.TtsPlayed,
	"widgets:tts:playing.subscription": AppEvent.TtsPlaying,
};

const useWebRtcMaster = ({
	allowedScopes,
	allowedConnectionIds,
	peerId,
	peerOptions,
}: {
	allowedScopes: Set<string>;
	allowedConnectionIds: Set<string>;
	peerId?: string;
	peerOptions?: PeerOptions;
}) => {
	const eventsService = useAppEvents();
	const allowedScopesRef = useRef(allowedScopes);
	const allowedConnectionIdsRef = useRef(allowedConnectionIds);
	allowedScopesRef.current = allowedScopes;
	allowedConnectionIdsRef.current = allowedConnectionIds;
	const subscriptionsRef = useRef<Record<string, ConnectionSubscriptions>>({});
	const [webRtcMaster, setWebRtcMaster] = useState<Peer>();
	const hasAllowedConnections = allowedConnectionIds.size > 0;

	useEffect(() => {
		if (!peerId || !hasAllowedConnections) return;

		const subscriptions = subscriptionsRef.current;
		let disposed = false;

		const unsubscribeConnection = (connectionId: string) => {
			for (const unsubscribe of subscriptions[connectionId]?.values() ?? []) {
				unsubscribe();
			}
			delete subscriptions[connectionId];
		};

		const handleRequest = (
			api: WrcMaster,
			{ id, scope, arg, unsubscribe }: IWidgetRequest,
			connectionId: string,
		) => {
			if (!id) return;

			if (unsubscribe) {
				const connectionSubscriptions = subscriptions[connectionId];
				connectionSubscriptions?.get(id)?.();
				connectionSubscriptions?.delete(id);
				return;
			}

			if (!scope) return;
			const scopes = allowedScopesRef.current;
			if (!scopes.has(scope)) return;

			try {
				const sendEvent = SEND_SCOPES[scope];
				if (sendEvent !== undefined) {
					eventsService.send<Payload>({
						event: sendEvent,
						data: arg as Payload,
					});
					store.dispatch(
						moderatorsLogsApi.endpoints.addModeratorLog.initiate({
							moderatorLog: {
								event_type: SEND_SCOPES[scope],
								id: crypto.randomUUID(),
								moderator_id: connectionId,
								created_at: Math.round(new Date().getTime() / 1000),
							},
						}),
					);
					api.sendTo(connectionId, { id });
					return;
				}

				const subscribeEvent = SUBSCRIPTION_SCOPES[scope];
				if (subscribeEvent !== undefined) {
					const connectionSubscriptions = (subscriptions[connectionId] ??=
						new Map());

					connectionSubscriptions.get(id)?.();

					const unsubscribeEvent = eventsService.subscribe<Payload>(
						subscribeEvent,
						(data) => {
							if (!allowedConnectionIdsRef.current.has(connectionId)) {
								unsubscribeConnection(connectionId);
								return;
							}
							api.sendTo(connectionId, { id, data });
						},
					);
					connectionSubscriptions.set(id, unsubscribeEvent);
				}
			} catch (error) {
				console.error(error);
			}
		};

		const { bindConnection } = prepare(prepareUtils());
		const peer = new Peer(peerId, peerOptions);
		setWebRtcMaster(peer);

		bindConnection(peer).then((api) => {
			if (disposed) return;

			api.on("data", ({ id }, data) => {
				if (!allowedConnectionIdsRef.current.has(id)) return;
				handleRequest(api, data as IWidgetRequest, id);
			});
			api.on("remote.connect", ({ id }) => {
				if (!allowedConnectionIdsRef.current.has(id)) return;
				subscriptions[id] ??= new Map();
			});
			api.on("remote.disconnect", ({ id }) => {
				unsubscribeConnection(id);
			});
		});

		return () => {
			disposed = true;
			for (const connectionId of Object.keys(subscriptions)) {
				unsubscribeConnection(connectionId);
			}
			peer.destroy();
			setWebRtcMaster(undefined);
		};
	}, [peerId, hasAllowedConnections]);

	return webRtcMaster;
};
export default useWebRtcMaster;
