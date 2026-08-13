import type { IClientMessage, MessageId } from "@widy/sdk";
import { AppEvent, RewardType } from "@widy/sdk";
import { useCallback, useEffect, useRef, useState } from "react";
import useAppEvents from "../../shared/hooks/useAppEvents";

const useTts = () => {
	const eventsService = useAppEvents();
	const ttsAudioRef = useRef<HTMLAudioElement>(new Audio());
	const messagesRef = useRef<IClientMessage[]>([]);
	const [currentMessage, setCurrentMessage] = useState<IClientMessage>();
	const replaysIdRef = useRef<Set<string>>(new Set());

	const handleMessageAudioEnd = useCallback(
		({ message }: { message?: IClientMessage }) => {
			ttsAudioRef.current.pause();
			if (!message) return;

			eventsService.send<MessageId>({
				event: AppEvent.TtsPlayed,
				data: message.id,
			});
			messagesRef.current = messagesRef.current.filter(
				(m) => m.id !== message.id,
			);
			const newCurrentMessage = messagesRef.current.at(0);
			setCurrentMessage(undefined);
			if (newCurrentMessage) {
				playMessage({ message: newCurrentMessage });
			}
		},
		[],
	);

	const playMessage = useCallback(
		({ message }: { message: IClientMessage }) => {
			replaysIdRef.current.delete(message.id);
			setCurrentMessage(message);
			const audio =
				message.command_action?.tts?.audio || message.redemption?.tts?.audio;
			const tts_volume =
				message.command_action?.tts?.tts_volume ||
				message.redemption?.tts?.tts_volume;
			ttsAudioRef.current.src = `static/audio/${audio}`;
			ttsAudioRef.current.volume = (tts_volume ?? 0) / 100;
			ttsAudioRef.current.play();
			eventsService.send<MessageId>({
				event: AppEvent.TtsPlaying,
				data: message.id,
			});
		},
		[],
	);

	const skipMessage = useCallback(
		(id: string) => {
			if (currentMessage?.id === id) {
				handleMessageAudioEnd({ message: currentMessage });
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
			handleMessageAudioEnd({ message: currentMessage });
		}
	}, [handleMessageAudioEnd, currentMessage]);

	const handleNewMessage = useCallback(
		(message: IClientMessage) => {
			messagesRef.current = [...messagesRef.current, message];
			if (messagesRef.current.length === 1) {
				playMessage({ message });
			}
		},
		[playMessage],
	);

	const handleReplayMessage = useCallback(
		(message: IClientMessage) => {
			replaysIdRef.current.add(message.id);
			messagesRef.current = [message, ...messagesRef.current];
			if (messagesRef.current.length === 1) {
				playMessage({ message });
			}
		},
		[playMessage],
	);

	useEffect(() => {
		ttsAudioRef.current.onended = () =>
			handleMessageAudioEnd({
				message: currentMessage,
			});
		ttsAudioRef.current.onerror = () =>
			handleMessageAudioEnd({
				message: currentMessage,
			});

		return () => {
			ttsAudioRef.current.onended = null;
			ttsAudioRef.current.onerror = null;
		};
	}, [currentMessage, handleMessageAudioEnd]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<IClientMessage>(
			AppEvent.Redemption,
			(message) => {
				if (
					message.redemption?.type === RewardType.TTS &&
					message.redemption?.tts
				) {
					handleNewMessage(message);
				}
			},
		);

		return () => unsubscribe();
	}, [handleNewMessage]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<IClientMessage>(
			AppEvent.CommandAction,
			(message) => {
				if (message.command_action?.tts) {
					handleNewMessage(message);
				}
			},
		);

		return () => unsubscribe();
	}, [handleNewMessage]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<IClientMessage>(
			AppEvent.ReplayTts,
			handleReplayMessage,
		);

		return () => unsubscribe();
	}, [handleReplayMessage]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<string>(
			AppEvent.SkipTts,
			(id) => {
				skipMessage(id);
			},
		);

		return () => unsubscribe();
	}, [skipMessage]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<null>(
			AppEvent.SkipPlayingTts,
			skipPlayingMessage,
		);

		return () => unsubscribe();
	}, [skipPlayingMessage]);

	return {
		currentMessage,
	};
};
export default useTts;
