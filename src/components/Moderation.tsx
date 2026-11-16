import { TokenType } from "@widy/sdk";
import { useGetModeratorsQuery } from "../api/moderatorsApi";
import { useGetTokenByTypeQuery } from "../api/tokensApi";
import useWebRtcMaster from "../hooks/useWebRtcMaster";

const Moderation = () => {
	const { data: moderators } = useGetModeratorsQuery();
	const { data: moderatorToken } = useGetTokenByTypeQuery({
		type: TokenType.Moderation,
	});

	const peer = useWebRtcMaster({
		allowedConnectionIds: moderators?.map((moderator) => moderator.id),
		allowedScopes: [
			"widgets:alert:skip.send",
			"widgets:alert:replay.send",
			"widgets:media:replay.send",
			"widgets:media:skip.send",
			"widgets:media:paused.send",
			"widgets:media:playing.send",
			"widgets:media:play.send",
			"widgets:tts:replay.send",
			"widgets:tts:skip.send",
			"widgets:messages.subscription",
			"widgets:alert:playing.subscription",
			"widgets:alert:played.subscription",
			"widgets:media:playing.subscription",
			"widgets:media:played.subscription",
			"widgets:media:pause.subscription",
			"widgets:tts:played.subscription",
			"widgets:tts:playing.subscription",
		],
		peerId: moderatorToken?.token,
	});

	return <div></div>;
};
export default Moderation;
