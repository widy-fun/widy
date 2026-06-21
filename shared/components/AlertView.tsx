import type {
	IAlert,
	IClientMessage,
	IDonation,
	IFollow,
	IRaid,
	ISubscription,
} from "@widy/sdk";
import { MessageType } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import getCurrencySymbol from "../utils/getCurrencySymbol";
import Alert from "./Alert";

const AlertView = ({
	alert,
	message,
	base,
	width,
	height,
	backgroundColor,
	videoSrcObject,
	isShowVideoElement,
}: {
	alert: IAlert;
	message: IClientMessage;
	base: string;
	width: number;
	height: number;
	backgroundColor?: string;
	videoSrcObject?: MediaProvider;
	isShowVideoElement: boolean;
}) => {
	const { t } = useTranslation();

	switch (message.type) {
		case MessageType.Donation: {
			const donation = message.donation as IDonation;

			return (
				<Alert
					alert={alert}
					text={donation.text}
					base={base}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					videoSrcObject={videoSrcObject}
					isShowVideoElement={isShowVideoElement}
				>
					{t("message.donated", {
						user_name: donation.user_name,
						currency: getCurrencySymbol(donation.currency),
						amount: donation.amount,
					})}
				</Alert>
			);
		}
		case MessageType.Follow: {
			const follow = message.follow as IFollow;

			return (
				<Alert
					alert={alert}
					base={base}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					videoSrcObject={videoSrcObject}
					isShowVideoElement={isShowVideoElement}
				>
					{t("message.followed", { user_name: follow.user_name })}
				</Alert>
			);
		}
		case MessageType.Subscription: {
			const subscription = message.subscription as ISubscription;

			return (
				<Alert
					alert={alert}
					base={base}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					videoSrcObject={videoSrcObject}
					isShowVideoElement={isShowVideoElement}
				>
					{!subscription.is_gift
						? t("message.subscribed", { user_name: subscription.user_name })
						: t("message.gifted_subscriptions", {
								user_name: subscription.user_name,
								total: subscription.total,
							})}
				</Alert>
			);
		}
		case MessageType.Raid: {
			const raid = message.raid as IRaid;

			return (
				<Alert
					alert={alert}
					base={base}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					videoSrcObject={videoSrcObject}
					isShowVideoElement={isShowVideoElement}
				>
					{t("message.raided_with", {
						viewers: raid.viewers,
						user_name: raid.from_broadcaster_user_name,
					})}
				</Alert>
			);
		}
		case MessageType.Redemption: {
			return (
				<Alert
					alert={alert}
					base={base}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					videoSrcObject={videoSrcObject}
					isShowVideoElement={isShowVideoElement}
				>
					{""}
				</Alert>
			);
		}
	}
};
export default AlertView;
