import type { IAlert, IClientMessage, ISettings, MessageId } from "@widy/sdk";
import { AlertVariant, AppEvent, RewardType } from "@widy/sdk";
import { useCallback, useEffect, useRef, useState } from "react";
import useAppEvents from "../../shared/hooks/useAppEvents";
import getAlert from "../utils/getAlert";

const usePlayAlert = () => {
	const eventsService = useAppEvents();
	const alertAudioRef = useRef<HTMLAudioElement>(new Audio());
	const messageAudioRef = useRef<HTMLAudioElement>(new Audio());
	const alertVideoRef = useRef<HTMLVideoElement>(
		document.createElement("video"),
	);
	const settingsRef = useRef<ISettings | null>(null);
	const messagesRef = useRef<IClientMessage[]>([]);
	const [currentMessage, setCurrentMessage] = useState<IClientMessage>();
	const [currentAlert, setCurrentAlert] = useState<IAlert>();
	const [currentVideoSrcObject, setCurrentVideoSrcObject] =
		useState<MediaProvider>();
	const [isShowVideoElement, setIsShowVideoElement] = useState(true);
	const replaysIdRef = useRef<Set<string>>(new Set());

	const handleMessageAudioEnd = useCallback(
		({
			message,
			duration = 3000,
		}: {
			message?: IClientMessage;
			duration?: number;
		}) => {
			messageAudioRef.current.pause();
			alertAudioRef.current.pause();
			alertVideoRef.current.pause();
			if (!message) return;
			setTimeout(() => {
				eventsService.send<MessageId>({
					event: AppEvent.AlertPlayed,
					data: message.id,
				});
				messagesRef.current = messagesRef.current.filter(
					(m) => m.id !== message.id,
				);
				const newCurrentMessage = messagesRef.current.at(0);
				setCurrentMessage(undefined);
				if (newCurrentMessage) {
					const newAlert = getAlert({
						message: newCurrentMessage,
					});
					if (newAlert) {
						playMessage({ message: newCurrentMessage, alert: newAlert });
					}
				}
			}, duration);
		},
		[],
	);

	const playMessage = useCallback(
		({ message, alert }: { message: IClientMessage; alert: IAlert }) => {
			if (settingsRef.current && !settingsRef.current.alert_paused) {
				const replay = replaysIdRef.current.has(message.id);
				replaysIdRef.current.delete(message.id);
				setTimeout(
					() => {
						if (settingsRef.current && messagesRef.current.length) {
							eventsService.send<MessageId>({
								event: AppEvent.AlertPlaying,
								data: message.id,
							});

							setAlertAndMessage({ message, alert });
						}
					},
					replay ? 0 : settingsRef.current.moderation_duration,
				);
			}
		},
		[],
	);

	const setAlertAndMessage = useCallback(
		({ message, alert }: { message: IClientMessage; alert: IAlert }) => {
			setCurrentMessage(message);
			setCurrentAlert(alert);

			if (alert.alert_variant === AlertVariant.Video) {
				alertVideoRef.current.src = `static/${alert.video}`;
				alertVideoRef.current.volume = alert.video_volume / 100;
				alertVideoRef.current.play();
				setCurrentVideoSrcObject(alertVideoRef.current.captureStream());
				setIsShowVideoElement(true);
			} else if (
				alert.alert_variant === AlertVariant.Audio ||
				alert.alert_variant === AlertVariant.ImageAndAudio
			) {
				alertAudioRef.current.src = `static/${alert.audio}`;
				alertAudioRef.current.volume = alert.audio_volume / 100;
				alertAudioRef.current.play();
			} else if (alert.alert_variant === AlertVariant.Image) {
				handleMessageAudioEnd({
					message,
					duration: alert.duration,
				});
			}
		},
		[],
	);

	const skipMessage = useCallback(
		(id: string) => {
			if (currentMessage?.id === id) {
				handleMessageAudioEnd({ message: currentMessage, duration: 0 });
			} else {
				messagesRef.current = messagesRef.current.filter(
					(message) => message.id !== id,
				);
			}
		},
		[handleMessageAudioEnd, currentMessage],
	);
	const skipPlayingMessage = useCallback(() => {
		if (currentMessage) {
			handleMessageAudioEnd({ message: currentMessage, duration: 0 });
		}
	}, [handleMessageAudioEnd, currentMessage]);

	const handleNewMessage = useCallback(
		(message: IClientMessage) => {
			const alert = getAlert({ message });
			if (alert) {
				messagesRef.current = [...messagesRef.current, message];
				if (messagesRef.current.length === 1) {
					playMessage({ message, alert });
				}
			}
		},
		[playMessage],
	);
	const handleReplayMessage = useCallback(
		(message: IClientMessage) => {
			const alert = getAlert({ message });
			if (alert) {
				replaysIdRef.current.add(message.id);
				messagesRef.current = [message, ...messagesRef.current];
				if (messagesRef.current.length === 1) {
					playMessage({ message, alert });
				}
			}
		},
		[playMessage],
	);

	const handleAlertAudioVideoEnd = useCallback(
		({ message, delay = 0 }: { message?: IClientMessage; delay?: number }) => {
			setTimeout(() => {
				setIsShowVideoElement(false);
				const audio = message?.donation?.audio;
				if (
					audio &&
					settingsRef.current &&
					currentAlert?.alert_variant !== AlertVariant.Image
				) {
					messageAudioRef.current.src = `static/audio/${audio}`;
					messageAudioRef.current.volume = settingsRef.current.tts_volume / 100;
					messageAudioRef.current.play();
				} else {
					handleMessageAudioEnd({
						message: currentMessage,
						duration: currentAlert?.duration,
					});
				}
			}, delay);
		},
		[currentMessage, handleMessageAudioEnd],
	);

	useEffect(() => {
		messageAudioRef.current.onended = () =>
			handleMessageAudioEnd({
				message: currentMessage,
				duration: currentAlert?.duration,
			});
		messageAudioRef.current.onerror = () =>
			handleMessageAudioEnd({
				message: currentMessage,
				duration: currentAlert?.duration,
			});

		return () => {
			messageAudioRef.current.onended = null;
			messageAudioRef.current.onerror = null;
		};
	}, [currentMessage, handleMessageAudioEnd]);

	useEffect(() => {
		alertAudioRef.current.onended = () =>
			handleAlertAudioVideoEnd({
				message: currentMessage,
				delay: currentAlert?.delay,
			});
		alertAudioRef.current.onerror = () =>
			handleAlertAudioVideoEnd({
				message: currentMessage,
				delay: currentAlert?.delay,
			});
		return () => {
			alertAudioRef.current.onended = null;
			alertAudioRef.current.onerror = null;
		};
	}, [handleAlertAudioVideoEnd]);

	useEffect(() => {
		alertVideoRef.current.onended = () =>
			handleAlertAudioVideoEnd({
				message: currentMessage,
				delay: currentAlert?.delay,
			});
		alertVideoRef.current.onerror = () =>
			handleAlertAudioVideoEnd({
				message: currentMessage,
				delay: currentAlert?.delay,
			});
		return () => {
			alertVideoRef.current.onended = null;
			alertVideoRef.current.onerror = null;
		};
	}, [handleAlertAudioVideoEnd]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<IClientMessage>(
			AppEvent.Alert,
			handleNewMessage,
		);

		return () => unsubscribe();
	}, [handleNewMessage]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<IClientMessage>(
			AppEvent.Redemption,
			(message) => {
				if (message.redemption?.type === RewardType.Alert) {
					handleNewMessage(message);
				}
			},
		);

		return () => unsubscribe();
	}, [handleNewMessage]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<IClientMessage>(
			AppEvent.ReplayAlert,
			handleReplayMessage,
		);

		return () => unsubscribe();
	}, [handleReplayMessage]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<string>(
			AppEvent.SkipAlert,
			(id) => {
				skipMessage(id);
			},
		);

		return () => unsubscribe();
	}, [skipMessage]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<null>(
			AppEvent.SkipPlayingAlert,
			skipPlayingMessage,
		);

		return () => unsubscribe();
	}, [skipPlayingMessage]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<ISettings>(
			AppEvent.Settings,
			(settings) => {
				if (settingsRef.current?.alert_paused && !settings.alert_paused) {
					settingsRef.current = settings;
					const message = messagesRef.current.at(0);

					if (message) {
						const alert = getAlert({ message });
						if (alert) {
							playMessage({ message, alert });
						}
					}
					return;
				}
				settingsRef.current = settings;
			},
		);

		return () => unsubscribe();
	}, [playMessage]);

	return {
		currentMessage,
		currentAlert,
		settings: settingsRef.current,
		currentVideoSrcObject,
		isShowVideoElement,
	};
};
export default usePlayAlert;
