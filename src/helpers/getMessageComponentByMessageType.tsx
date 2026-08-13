import type { IClientMessage } from "@widy/sdk";
import { MessageType, RewardType } from "@widy/sdk";
import CommandActionMessageCard from "../../shared/components/CommandActionMessageCard";
import CommandTtsActionMessageCard from "../../shared/components/CommandTtsActionMessageCard";
import DonationMessageCard from "../../shared/components/DonationMessageCard";
import FollowMessageCard from "../../shared/components/FollowMessageCard";
import RaidMessageCard from "../../shared/components/RaidMessageCard";
import RedemptionMessageCard from "../../shared/components/RedemptionMessageCard";
import RedemptionTtsMessageCard from "../../shared/components/RedemptionTtsMessageCard";
import SubscriptionMessageCard from "../../shared/components/SubscriptionMessageCard";

const getMessageComponentByMessageType = ({
	message,
	isAlertPlaying,
	isMediaPlaying,
	isTtsPlaying,
}: {
	message: IClientMessage;
	isAlertPlaying: boolean;
	isMediaPlaying: boolean;
	isTtsPlaying: boolean;
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
		case MessageType.Redemption: {
			if (message.redemption?.type === RewardType.TTS) {
				return (
					<RedemptionTtsMessageCard
						message={message}
						isTtsPlaying={isTtsPlaying}
					/>
				);
			}
			return (
				<RedemptionMessageCard
					message={message}
					isAlertPlaying={isAlertPlaying}
					isMediaPlaying={isMediaPlaying}
				/>
			);
		}
		case MessageType.CommandAction: {
			if (message.command_action?.tts) {
				return (
					<CommandTtsActionMessageCard
						message={message}
						isTtsPlaying={isTtsPlaying}
					/>
				);
			}
			return (
				<CommandActionMessageCard
					message={message}
					isAlertPlaying={isAlertPlaying}
					isMediaPlaying={isMediaPlaying}
				/>
			);
		}

		default:
			return <div></div>;
	}
};
export default getMessageComponentByMessageType;
