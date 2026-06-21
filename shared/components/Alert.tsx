import type { IAlert } from "@widy/sdk";
import { AlertVariant, MessageType, ViewType } from "@widy/sdk";
import { type ReactNode, useEffect, useRef } from "react";
import computePXSize from "../utils/computePXSize";
import getGridAutoColumns from "../utils/getGridAutoColumns";
import getGridAutoRows from "../utils/getGridAutoRows";
import getGridTemplateAreas from "../utils/getGridTemplateAreas";

const Alert = ({
	alert,
	width,
	height,
	backgroundColor,
	base,
	text,
	children,
	videoSrcObject,
	isShowVideoElement,
}: {
	alert: IAlert;
	base: string;
	width: number;
	height: number;
	backgroundColor?: string;
	text?: string;
	children: ReactNode;
	videoSrcObject?: MediaProvider;
	isShowVideoElement: boolean;
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const isShowImage =
		alert.alert_variant !== AlertVariant.Video &&
		alert.alert_variant !== AlertVariant.Audio;
	const isShowVideo = alert.alert_variant === AlertVariant.Video;

	useEffect(() => {
		const video = videoRef.current;
		if (!video || !videoSrcObject) return;
		if (video && videoSrcObject) {
			video.srcObject = videoSrcObject;
			video.volume = 0;
			video.play();
		}

		return () => {
			video.pause();
			video.srcObject = null;
		};
	}, [videoSrcObject]);

	return (
		<div
			style={{
				display: "grid",
				height,
				width,
				backgroundColor,
				gridTemplateAreas: getGridTemplateAreas(alert.view_type),
				gridAutoRows: getGridAutoRows(alert.view_type),
				gridAutoColumns: getGridAutoColumns(alert.view_type),
				placeItems: "center",
				gap: 5,
				color: "white",
				fontSize: 25,
			}}
		>
			{isShowImage && (
				<div
					style={{
						gridArea: "Media",
						height: alert.view_type === ViewType.Overlay ? height : "100%",
						width: alert.view_type === ViewType.Overlay ? width : "100%",
						position:
							alert.view_type === ViewType.Overlay ? "absolute" : undefined,
						backgroundImage: `url(${base}/${alert.image})`,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundSize: "contain",
					}}
				/>
			)}
			{isShowVideo && (
				<video
					ref={videoRef}
					src={`${base}/${alert.video}`}
					style={{
						gridArea: "Media",
						display: isShowVideoElement ? "block" : "none",
						height: alert.view_type === ViewType.Overlay ? height : "100%",
						width: alert.view_type === ViewType.Overlay ? width : "100%",
						position:
							alert.view_type === ViewType.Overlay ? "absolute" : undefined,
						minHeight: 0,
					}}
				>
					<track default kind="captions" srcLang="en" />
				</video>
			)}

			<div
				style={{
					gridArea: isShowImage || isShowVideo ? "Text" : "Media",
					height: alert.view_type === ViewType.Overlay ? height : "100%",
					width: alert.view_type === ViewType.Overlay ? width : "100%",
					maxWidth: `${(width / 100) * 60}px`,
					display: "flex",
					flexDirection: "column",
					placeContent: "center",
					textAlign: "center",
					position:
						alert.view_type === ViewType.Overlay ? "absolute" : undefined,
				}}
			>
				<span
					style={{
						display: "block",
						fontSize: computePXSize({
							percent: alert.title_style.font_size,
							width,
							coefficient: alert.type === MessageType.Donation ? 4 : 12,
						}),
						color: alert.title_style.text_color,
						fontWeight: alert.title_style.bold ? "bold" : undefined,
						fontStyle: alert.title_style.italics ? "italic" : undefined,
						textDecoration: alert.title_style.underline
							? "underline"
							: undefined,
						letterSpacing: computePXSize({
							percent: alert.title_style.letter_spacing,
							width,
						}),
						wordSpacing: computePXSize({
							percent: alert.title_style.word_spacing,
							width,
						}),
					}}
				>
					{children}
				</span>

				<span
					style={{
						display: "block",
						fontSize: computePXSize({
							percent: alert.message_style.font_size,
							width,
							coefficient: alert.type === MessageType.Donation ? 4 : 8,
						}),
						color: alert.message_style.text_color,
						fontWeight: alert.message_style.bold ? "bold" : undefined,
						fontStyle: alert.message_style.italics ? "italic" : undefined,
						textDecoration: alert.message_style.underline
							? "underline"
							: undefined,
						letterSpacing: computePXSize({
							percent: alert.message_style.letter_spacing,
							width,
						}),
						wordSpacing: computePXSize({
							percent: alert.message_style.word_spacing,
							width,
						}),
					}}
				>
					{text}
				</span>
			</div>
		</div>
	);
};
export default Alert;
