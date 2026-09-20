import { IClientMessage, IMediaData } from "@widy/sdk";

const getMediaFromMessage = (message?: IClientMessage) => {
	const mediaData = message?.assistant_action?.data as IMediaData | undefined;
	return (
		message?.donation?.media || message?.redemption?.media || mediaData?.media
	);
};
export default getMediaFromMessage;
