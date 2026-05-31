import { ServiceType } from "@widy/sdk";
import {
	useDonatePaySignOutMutation,
	useDonationAlertsSignOutMutation,
	useStreamLabsSignOutMutation,
	useTributeBotSignOutMutation,
	useTwitchSignOutMutation,
	useWidySolSignOutMutation,
	useWidyTonSignOutMutation,
} from "../api";
import useStreamElementsSocketService from "./useStreamElementsService";

const useSignOut = (id: ServiceType) => {
	const [tributeBotSignOut] = useTributeBotSignOutMutation();
	const [twitchSignOut] = useTwitchSignOutMutation();
	const [widySolSignOut] = useWidySolSignOutMutation();
	const [widyTonSignOut] = useWidyTonSignOutMutation();
	const [donationAlertsSignOut] = useDonationAlertsSignOutMutation();
	const [streamLabsSignOut] = useStreamLabsSignOutMutation();
	const [donatePaySignOut] = useDonatePaySignOutMutation();
	const streamElementsSocketService = useStreamElementsSocketService();

	switch (id) {
		case ServiceType.TributeBot:
			return tributeBotSignOut;
		case ServiceType.Streamelements:
			return streamElementsSocketService.signOut.bind(
				streamElementsSocketService,
			);
		case ServiceType.Twitch:
			return twitchSignOut;
		case ServiceType.WidySol:
			return widySolSignOut;
		case ServiceType.WidyTon:
			return widyTonSignOut;
		case ServiceType.DonationAlerts:
			return donationAlertsSignOut;
		case ServiceType.StreamLabs:
			return streamLabsSignOut;
		case ServiceType.DonatePay:
			return donatePaySignOut;
		default:
			return () => null;
	}
};
export default useSignOut;
