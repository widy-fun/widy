import {
	AlertVariationConditions,
	Currency,
	IAlert,
	IClientMessage,
	IReward,
	MediaType,
	ServiceType,
} from "@widy/sdk";
import getDefaultAlert from "../../src/helpers/getDefaultAlert";
import getDefaultReward from "../../src/helpers/getDefaultReward";

const getTestAlertMessage = ({
	alert = getDefaultAlert(),
	userName,
	text,
	reward = getDefaultReward(),
}: {
	alert?: IAlert;
	userName: string;
	text: string;

	reward?: IReward;
}) => {
	const messageId = crypto.randomUUID();
	const testMessage: IClientMessage = {
		id: messageId,
		type: alert.type,
		created_at: Math.round(new Date().getTime() / 1000),
		donation: {
			service_id: crypto.randomUUID(),
			amount:
				alert.variation_conditions === AlertVariationConditions.AmountIsEqual
					? alert.amount
					: alert.amount + 1,
			user_name: userName,
			played: false,
			text,
			currency: Currency.EUR,
			exchanged_amount: 1,
			exchanged_currency: Currency.EUR,
			created_at: Math.round(new Date().getTime() / 1000),
			service: ServiceType.Tribute,
			id: crypto.randomUUID(),
			message_id: messageId,
			alert: alert,
		},
		follow: {
			user_name: userName,
			id: crypto.randomUUID(),
			service_id: crypto.randomUUID(),
			message_id: messageId,
			service: ServiceType.Twitch,
			played: false,
			followed_at: Math.round(new Date().getTime() / 1000),
			user_id: "1",
			alert: alert,
		},
		subscription: {
			id: crypto.randomUUID(),
			service_id: crypto.randomUUID(),
			user_name: userName,
			user_id: "1",
			message_id: messageId,
			played: false,
			is_gift: false,
			is_anonymous: false,
			service: ServiceType.Twitch,
			tier: "1000",
			cumulative_total: 1,
			total: 1,
			subscribed_at: Math.round(new Date().getTime() / 1000),
			alert: alert,
		},
		raid: {
			id: crypto.randomUUID(),
			service_id: crypto.randomUUID(),
			from_broadcaster_user_name: userName,
			from_broadcaster_user_id: "1",
			message_id: messageId,
			played: false,
			viewers: 43543,
			service: ServiceType.Twitch,
			created_at: Math.round(new Date().getTime() / 1000),
			alert: alert,
		},
		redemption: {
			id: crypto.randomUUID(),
			user_id: userName,
			user_name: userName,
			user_input: text,
			reward_id: crypto.randomUUID(),
			external_id: crypto.randomUUID(),
			title: reward.title,
			description: reward.description,
			cost: 100,
			platform: reward.platform,
			type: reward.type,
			points_currency_ratio: reward.points_currency_ratio,
			media: {
				url: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
				media_type: MediaType.Youtube,
				temporary_src: "oHg5SJYRHA0",
			},
			alert: alert,
		},
	};
	return testMessage;
};
export default getTestAlertMessage;
