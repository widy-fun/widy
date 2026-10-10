import {
	Currency,
	IAuctionEvent,
	IClientMessage,
	ISubscription,
} from "@widy/sdk";

const auctionEventFromChannelSubscription = ({
	subscription,
	message,
}: {
	subscription: ISubscription;
	message: IClientMessage;
}): IAuctionEvent => {
	return {
		amount: subscription.total,
		user_name: subscription.user_name,
		text: subscription.user_name,
		service: subscription.service,
		currency: Currency.NONE,
		exchanged_amount: subscription.total,
		exchanged_currency: Currency.NONE,
		id: crypto.randomUUID(),
		created_at: message.created_at,
	};
};
export default auctionEventFromChannelSubscription;
