import type {
	IChanelData,
	IChatSettingsData,
	IClientMessage,
	IPinedMessageData,
	IUserData,
} from "@widy/sdk";
import { AssistantActionType } from "@widy/sdk";
import AssistantActionMessageCard from "../../shared/components/AssistantActionMessageCard";
import AssistantAlertActionMessageCard from "../../shared/components/AssistantAlertActionMessageCard";
import AssistantPlayMediaActionMessageCard from "../../shared/components/AssistantPlayMediaActionMessageCard";
import i18n from "../../shared/i18n/i18n";

const getMessageComponentByAssistantActionType = ({
	message,
	isAlertPlaying,
	isMediaPlaying,
}: {
	message: IClientMessage;
	isAlertPlaying: boolean;
	isMediaPlaying: boolean;
}) => {
	switch (message.assistant_action?.type) {
		case AssistantActionType.PlayAlert:
			return (
				<AssistantAlertActionMessageCard
					message={message}
					isAlertPlaying={isAlertPlaying}
				/>
			);
		case AssistantActionType.BanUser: {
			const data = message.assistant_action.data as IUserData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_ban_user", {
						user_name: data.name,
					})}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.UnbanUser: {
			const data = message.assistant_action.data as IUserData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_unban_user", {
						user_name: data.name,
					})}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.PinMessage: {
			const data = message.assistant_action.data as IPinedMessageData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_pin_message", {
						message: data.message,
					})}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.ChangeChannelCategory: {
			const data = message.assistant_action.data as IChanelData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_change_channel_category", {
						category: data.category,
					})}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.ChangeChannelTitle: {
			const data = message.assistant_action.data as IChanelData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_change_channel_title", {
						title: data.title,
					})}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.AddEmotesMode: {
			const data = message.assistant_action.data as IChatSettingsData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_add_emote_mode")}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.RemoveEmotesMode: {
			const data = message.assistant_action.data as IChatSettingsData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_remove_emote_mode")}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.AddFollowMode: {
			const data = message.assistant_action.data as IChatSettingsData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_add_follow_mode")}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.RemoveFollowMode: {
			const data = message.assistant_action.data as IChatSettingsData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_remove_follow_mode")}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.AddSlowMode: {
			const data = message.assistant_action.data as IChatSettingsData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_add_slow_mode")}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.RemoveSlowMode: {
			const data = message.assistant_action.data as IChatSettingsData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_remove_slow_mode")}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.AddSubscribersMode: {
			const data = message.assistant_action.data as IChatSettingsData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_add_subscribe_mode")}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.RemoveSubscribersMode: {
			const data = message.assistant_action.data as IChatSettingsData;
			return (
				<AssistantActionMessageCard
					message={message}
					text={i18n.t("message.assistant_remove_subscribe_mode")}
					platform={data.platform}
				/>
			);
		}
		case AssistantActionType.PlayMedia:
			return (
				<AssistantPlayMediaActionMessageCard
					message={message}
					isMediaPlaying={isMediaPlaying}
				/>
			);
	}
};
export default getMessageComponentByAssistantActionType;
