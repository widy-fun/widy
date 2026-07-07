import { ServiceType } from "@widy/sdk";
import {
	useDestreamSignOutMutation,
	useDonatePaySignOutMutation,
	useDonationAlertsSignOutMutation,
	useKickBotSignOutMutation,
	useKickSignOutMutation,
	useStreamLabsSignOutMutation,
	useTributeSignOutMutation,
	useTwitchBotSignOutMutation,
	useTwitchSignOutMutation,
	useWidySolSignOutMutation,
	useWidyTonSignOutMutation,
} from "../api";
import useStreamElementsSocketService from "./useStreamElementsService";

const useSignOut = (id: ServiceType) => {
	const [twitchSignOut] = useTwitchSignOutMutation();
	const [widySolSignOut] = useWidySolSignOutMutation();
	const [widyTonSignOut] = useWidyTonSignOutMutation();
	const [donationAlertsSignOut] = useDonationAlertsSignOutMutation();
	const [streamLabsSignOut] = useStreamLabsSignOutMutation();
	const [donatePaySignOut] = useDonatePaySignOutMutation();
	const [destreamSignOut] = useDestreamSignOutMutation();
	const [tributeSignOut] = useTributeSignOutMutation();
	const streamElementsSocketService = useStreamElementsSocketService();
	const [kickSignOut] = useKickSignOutMutation();
	const [kickBotSignOut] = useKickBotSignOutMutation();
	const [twitchBotSignOut] = useTwitchBotSignOutMutation();

	switch (id) {
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
		case ServiceType.Destream:
			return destreamSignOut;
		case ServiceType.Tribute:
			return tributeSignOut;
		case ServiceType.Kick:
			return kickSignOut;
		case ServiceType.KickBot:
			return kickBotSignOut;
		case ServiceType.TwitchBot:
			return twitchBotSignOut;
		default:
			return () => null;
	}
};
export default useSignOut;
