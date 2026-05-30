import { Box } from "@mui/material";
import { AppEvent, type INsfwDetection, type INsfwSettings } from "@widy/sdk";
import { useEffect, useRef, useState } from "react";
import useAppEvents from "../../../shared/hooks/useAppEvents";

const Nsfw = () => {
	const eventsService = useAppEvents();
	const timeoutRef = useRef<number>(undefined);
	const boxRef = useRef<HTMLDivElement>(null);
	const [nsfwSettings, setNsfwSettings] = useState<INsfwSettings>();

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<INsfwDetection[]>(
			AppEvent.NsfwDetection,
			(detections) => {
				if (
					nsfwSettings &&
					boxRef.current &&
					detections.some(
						(detect) =>
							detect.confidence >=
							nsfwSettings.labels_confidence[detect.label] / 100,
					)
				) {
					boxRef.current.style.display = "block";
					window.clearTimeout(timeoutRef.current);
					timeoutRef.current = window.setTimeout(() => {
						if (boxRef.current) {
							boxRef.current.style.display = "none";
						}
					}, nsfwSettings.blur_timeout_duration);
				}
			},
		);

		return () => {
			unsubscribe();
			window.clearTimeout(timeoutRef.current);
		};
	}, [eventsService, nsfwSettings]);

	useEffect(() => {
		const unsubscribe = eventsService.subscribe<INsfwSettings>(
			AppEvent.NsfwSettings,
			(data) => {
				setNsfwSettings(data);
			},
		);

		return () => unsubscribe();
	}, [eventsService]);

	return (
		<Box
			ref={boxRef}
			sx={{
				background: "black",
				display: "none",
				width: "100vw",
				height: "100vh",
			}}
		/>
	);
};
export default Nsfw;
