import { MessageType } from "@widy/sdk";

const getColorByMessageType = (type: MessageType) => {
	switch (type) {
		case MessageType.Donation:
			return "#ffca28";
		case MessageType.Subscription:
			return "#FF4500";
		case MessageType.Follow:
			return "#B2DFDB";
		case MessageType.Raid:
			return "#00ffbfff";
		case MessageType.Redemption:
			return "#5C7E8C";
		case MessageType.CommandAction:
			return "#00fc86";
	}
};
export default getColorByMessageType;
