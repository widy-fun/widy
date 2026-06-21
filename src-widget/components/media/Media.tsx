import usePlayMedia from "../../hooks/usePlayMedia";
import getElementByMediaType from "../../utils/getElementByMediaType";

const Media = () => {
	const { media, mediaSettings, messageId } = usePlayMedia();

	return (
		mediaSettings &&
		messageId &&
		media && (
			<div style={{ height: "100dvh", width: "100dvw" }}>
				{getElementByMediaType({
					media,
					messageId,
					mediaSettings,
				})}
			</div>
		)
	);
};
export default Media;
