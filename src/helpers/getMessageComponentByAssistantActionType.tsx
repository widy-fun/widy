import type { IClientMessage } from "@widy/sdk";
import { AssistantActionType } from "@widy/sdk";
import AssistantAlertActionMessageCard from "../../shared/components/AssistantAlertActionMessageCard";
import AssistantBanUserActionMessageCard from "../../shared/components/AssistantBanUserActionMessageCard";

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
		case AssistantActionType.BanUser:
			return (
				<AssistantBanUserActionMessageCard
					message={message}
					isAlertPlaying={isAlertPlaying}
					isMediaPlaying={isMediaPlaying}
				/>
			);
	}
};
export default getMessageComponentByAssistantActionType;
