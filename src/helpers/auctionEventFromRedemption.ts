import {
	Currency,
	IAuctionEvent,
	IClientMessage,
	IRedemption,
	ServiceType,
} from "@widy/sdk";

const auctionEventFromRedemption = ({
	redemption,
	message,
}: {
	redemption: IRedemption;
	message: IClientMessage;
}): IAuctionEvent => {
	const amount = redemption.cost * redemption.points_currency_ratio;
	return {
		amount: amount,
		user_name: redemption.user_name,
		text: redemption.user_input,
		service: redemption.platform as unknown as ServiceType,
		currency: Currency.NONE,
		exchanged_amount: amount,
		exchanged_currency: Currency.NONE,
		id: crypto.randomUUID(),
		created_at: message.created_at,
	};
};
export default auctionEventFromRedemption;
