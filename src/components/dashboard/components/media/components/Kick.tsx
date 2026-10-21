import type { IMediaSettings } from "@widy/sdk";
import { setKickSettings } from "../../../../../../shared/slices/mediaSlice";
import MediaPlatformSettings from "./MediaPlatformSettings";

const Kick = ({ mediaSettings }: { mediaSettings: IMediaSettings }) => {
	return (
		<MediaPlatformSettings
			mediaPlatformSettings={mediaSettings.kick}
			setMediaPlatformSettings={setKickSettings}
		/>
	);
};
export default Kick;
