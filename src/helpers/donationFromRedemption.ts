import {
	Currency,
	IClientMessage,
	IDonation,
	IRedemption,
	ServiceType,
} from "@widy/sdk";

const donationFromRedemption = ({
	redemption,
	message,
}: {
	redemption: IRedemption;
	message: IClientMessage;
}): IDonation => {
	const amount = redemption.cost * redemption.points_currency_ratio;
	return {
		service_id: redemption.id,
		amount: amount,
		user_name: redemption.user_name,
		played: false,
		text: redemption.user_input,
		service: redemption.platform as unknown as ServiceType,
		currency: Currency.NONE,
		exchanged_amount: amount,
		exchanged_currency: Currency.NONE,
		created_at: message.created_at,
		id: crypto.randomUUID(),
		message_id: message.id,
	};
};
export default donationFromRedemption;
