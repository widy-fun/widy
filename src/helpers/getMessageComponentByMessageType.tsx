import type { IClientMessage } from "@widy/sdk";
import { MessageType } from "@widy/sdk";
import CommandActionMessageCard from "../../shared/components/CommandActionMessageCard";
import DonationMessageCard from "../../shared/components/DonationMessageCard";
import FollowMessageCard from "../../shared/components/FollowMessageCard";
import RaidMessageCard from "../../shared/components/RaidMessageCard";
import RedemptionMessageCard from "../../shared/components/RedemptionMessageCard";
import SubscriptionMessageCard from "../../shared/components/SubscriptionMessageCard";

const getMessageComponentByMessageType = ({
	message,
	isAlertPlaying,
	isMediaPlaying,
}: {
	message: IClientMessage;
	isAlertPlaying: boolean;
	isMediaPlaying: boolean;
}) => {
	switch (message.type) {
		case MessageType.Donation:
			return (
				<DonationMessageCard
					message={message}
					isAlertPlaying={isAlertPlaying}
					isMediaPlaying={isMediaPlaying}
				/>
			);
		case MessageType.Follow:
			return (
				<FollowMessageCard message={message} isAlertPlaying={isAlertPlaying} />
			);
		case MessageType.Subscription:
			return (
				<SubscriptionMessageCard
					message={message}
					isAlertPlaying={isAlertPlaying}
				/>
			);
		case MessageType.Raid:
			return (
				<RaidMessageCard message={message} isAlertPlaying={isAlertPlaying} />
			);
		case MessageType.Redemption:
			return (
				<RedemptionMessageCard
					message={message}
					isAlertPlaying={isAlertPlaying}
					isMediaPlaying={isMediaPlaying}
				/>
			);
		case MessageType.CommandAction:
			return (
				<CommandActionMessageCard
					message={message}
					isAlertPlaying={isAlertPlaying}
					isMediaPlaying={isMediaPlaying}
				/>
			);

		default:
			return <div></div>;
	}
};
export default getMessageComponentByMessageType;
