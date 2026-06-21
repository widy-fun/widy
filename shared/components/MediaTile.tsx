import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { IconButton } from "@mui/material";
import type { IClientMessage, IMedia, MessageId } from "@widy/sdk";
import { AppEvent } from "@widy/sdk";
import { useSelector } from "react-redux";
import type { AppState } from "../../src/store";
import useAppEvents from "../hooks/useAppEvents";
import getColorByMediaType from "../utils/getColorByMediaType";
import MessageDate from "./MessageDate";

const MediaTile = ({
	media,
	message,
	user_name,
}: {
	media?: IMedia;
	message: IClientMessage;
	user_name?: string;
}) => {
	const { pausedMediaId } = useSelector((state: AppState) => state.mediaState);
	const eventsService = useAppEvents();

	return (
		<>
			{media && (
				<div
					style={{
						height: "100%",
						width: "100%",
						position: "absolute",
						display: "grid",
						placeItems: "center",
						zIndex: 1,
						top: 0,
						left: 0,
						background: getColorByMediaType(media.media_type),
					}}
				>
					<div
						style={{
							position: "absolute",
							top: 15,
							right: 15,
						}}
					>
						<MessageDate createdAt={message.created_at} />
					</div>
					<div
						style={{
							position: "absolute",
							top: 15,
							left: 15,
						}}
					>
						{user_name}
					</div>
					<div style={{ position: "relative", display: "grid" }}>
						<IconButton
							onClick={() => {
								if (pausedMediaId === message.id) {
									eventsService.send<MessageId>({
										event: AppEvent.PlayMedia,
										data: message.id,
									});
								} else {
									eventsService.send<MessageId>({
										event: AppEvent.PauseMedia,
										data: message.id,
									});
								}
							}}
						>
							{pausedMediaId === message.id ? (
								<PlayArrowIcon sx={{ height: 50, width: 50 }} />
							) : (
								<PauseIcon sx={{ height: 50, width: 50 }} />
							)}
						</IconButton>

						<IconButton
							style={{
								position: "absolute",
								justifySelf: "center",
								alignSelf: "center",
								left: 70,
							}}
							onClick={() => {
								eventsService.send<MessageId>({
									event: AppEvent.SkipMedia,
									data: message.id,
								});
							}}
						>
							<SkipNextIcon />
						</IconButton>
					</div>
				</div>
			)}
		</>
	);
};
export default MediaTile;
