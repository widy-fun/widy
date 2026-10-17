import { MessageType } from "@widy/sdk";

const getAlertVariablesByMessageType = (type: MessageType) => {
	switch (type) {
		case MessageType.Donation:
			return ["{{user_name}}", "{{amount}}", "{{currency}}"];
		case MessageType.Subscription:
			return ["{{user_name}}"];
		case MessageType.GiftSubscription:
			return ["{{user_name}}", "{{total}}"];
		case MessageType.Follow:
			return ["{{user_name}}"];
		case MessageType.Raid:
			return ["{{user_name}}", "{{viewers}}"];
		default:
			return [];
	}
};
export default getAlertVariablesByMessageType;
