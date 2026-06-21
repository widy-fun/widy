import { IAlert, IClientMessage, MessageType } from "@widy/sdk";
import alertFromRedemption from "../../src/helpers/alertFromRedemption";
import alertFromMessage from "./alertFromMessage";

const getAlert = ({
	alerts,
	message,
}: {
	alerts: IAlert[];
	message: IClientMessage;
}) => {
	let alert: IAlert | undefined;
	switch (message.type) {
		case MessageType.Redemption:
			if (message.redemption) {
				alert = alertFromRedemption({
					redemption: message.redemption,
				});
			}
			break;

		default:
			alert = alertFromMessage({
				alerts,
				message: message,
			});
	}
	return alert;
};
export default getAlert;
