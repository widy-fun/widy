import { MessageType } from "@widy/sdk";

import i18n from "../../shared/i18n/i18n";

const getDefaultAlertTitleTemplate = (type: MessageType) => {
	switch (type) {
		case MessageType.Donation:
			return i18n.t("message.donated");
		case MessageType.Follow:
			return i18n.t("message.followed");
		case MessageType.Subscription:
			return i18n.t("message.subscribed");
		case MessageType.GiftSubscription:
			return i18n.t("message.gifted_subscriptions");
		case MessageType.Raid:
			return i18n.t("message.raided_with");
		case MessageType.AssistantAction:
			return "";
		case MessageType.CommandAction:
			return "";
		case MessageType.Redemption:
			return "";
	}
};
export default getDefaultAlertTitleTemplate;
