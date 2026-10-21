import type { IMedia, IMediaPlatformSettings, MessageId } from "@widy/sdk";
import { AppEvent } from "@widy/sdk";
import { useEffect, useRef } from "react";
import useAppEvents from "../../../shared/hooks/useAppEvents";
import Hls from 'hls.js';

const Kick = ({
	mediaPlatformSettings,
	media,
	messageId,
}: {
	mediaPlatformSettings: IMediaPlatformSettings;
	media: IMedia;
	messageId: string;
}) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const eventsService = useAppEvents();

	useEffect(() => {
		if (!videoRef.current) return;
		videoRef.current.volume = mediaPlatformSettings.video_volume / 100;
	}, [mediaPlatformSettings]);

	useEffect(() => {
		if (!videoRef.current) return;
		videoRef.current.onplay = () => {
			eventsService.send<MessageId>({
				event: AppEvent.MediaPlaying,
				data: messageId,
			});
		};

		videoRef.current.onended = () => {
			eventsService.send<MessageId>({
				event: AppEvent.MediaEnd,
				data: messageId,
			});
		};
		videoRef.current.onpause = () => {
			eventsService.send<MessageId>({
				event: AppEvent.MediaPaused,
				data: messageId,
			});
		};
		videoRef.current.onerror = () => {
			eventsService.send<MessageId>({
				event: AppEvent.MediaError,
				data: messageId,
			});
		};

		return () => {
			if (!videoRef.current) return;
			videoRef.current.onplay = null;
			videoRef.current.onended = null;
			videoRef.current.onpause = null;
			videoRef.current.onerror = null;
		};
	}, [messageId, eventsService]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<MessageId>(
			AppEvent.PauseMedia,
			(id) => {
				if (messageId === id && videoRef.current) {
					videoRef.current.pause();
				}
			},
		);

		return () => unsubscribe();
	}, [messageId, eventsService]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<MessageId>(
			AppEvent.PlayMedia,
			(id) => {
				if (messageId === id && videoRef.current) {
					videoRef.current.play();
				}
			},
		);

		return () => unsubscribe();
	}, [messageId, eventsService]);

useEffect(() => {
    const video = videoRef.current;
    if (!video || !media.temporary_src) return;

    let hls:Hls;

    if (Hls.isSupported()) {
      hls = new Hls();

      hls.loadSource(media.temporary_src);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error('HLS error:', data.type, data.details);

        if (data.fatal) {
          console.error('Fatal HLS error');
        }
      });
    } else if (
      video.canPlayType('application/vnd.apple.mpegurl')
    ) {
      video.src = media.temporary_src;
    } else {
      console.error('HLS is not supported');
    }

    return () => {
      hls?.destroy();
      video.removeAttribute('src');
      video.load();
    };
  }, [media.temporary_src]);

	return (
		<>
			{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
			<video
				autoPlay
				ref={videoRef}
				src={media.temporary_src}
				style={{ height: "100%", width: "100%" }}
			/>
		</>
	);
};
export default Kick;
