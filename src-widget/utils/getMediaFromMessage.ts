import { IClientMessage } from "@widy/sdk";

const getMediaFromMessage = (message?: IClientMessage) => {
	return message?.donation?.media || message?.redemption?.media;
};
export default getMediaFromMessage;
