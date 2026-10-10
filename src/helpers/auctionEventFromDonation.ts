import { IAuctionEvent, IClientMessage, IDonation } from "@widy/sdk";

const auctionEventFromDonation = ({
	donation,
	message,
}: {
	donation: IDonation;
	message: IClientMessage;
}): IAuctionEvent => {
	return {
		amount: donation.amount,
		user_name: donation.user_name,
		text: donation.text,
		service: donation.service,
		currency: donation.currency,
		exchanged_amount: donation.exchanged_amount,
		exchanged_currency: donation.exchanged_currency,
		created_at: message.created_at,
		id: crypto.randomUUID(),
	};
};
export default auctionEventFromDonation;
