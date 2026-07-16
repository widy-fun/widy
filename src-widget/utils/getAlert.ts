import { IClientMessage } from "@widy/sdk";

const getAlert = ({ message }: { message: IClientMessage }) => {
	const urlParams = new URLSearchParams(window.location.search);
	const group_id = urlParams.get("group_id");
	let alert =
		message.donation?.alert ||
		message.follow?.alert ||
		message.subscription?.alert ||
		message.raid?.alert ||
		message.redemption?.alert ||
		message.command_action?.alert;
	if (group_id !== alert?.group_id) {
		return;
	}
	return alert;
};
export default getAlert;
