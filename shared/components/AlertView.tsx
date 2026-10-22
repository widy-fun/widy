import type { IAlert, IClientMessage, IDonation } from "@widy/sdk";
import { MessageType } from "@widy/sdk";
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
				/>
			);
		}
		case MessageType.Follow: {
			return (
				<Alert
					alert={alert}
					base={base}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					videoSrcObject={videoSrcObject}
					isShowVideoElement={isShowVideoElement}
				/>
			);
		}
		case MessageType.Subscription: {
			return (
				<Alert
					alert={alert}
					base={base}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					videoSrcObject={videoSrcObject}
					isShowVideoElement={isShowVideoElement}
				/>
			);
		}
		case MessageType.GiftSubscription: {
			return (
				<Alert
					alert={alert}
					base={base}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					videoSrcObject={videoSrcObject}
					isShowVideoElement={isShowVideoElement}
				/>
			);
		}
		case MessageType.Raid: {
			return (
				<Alert
					alert={alert}
					base={base}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					videoSrcObject={videoSrcObject}
					isShowVideoElement={isShowVideoElement}
				/>
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
				/>
			);
		}
		case MessageType.CommandAction: {
			return (
				<Alert
					alert={alert}
					base={base}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					videoSrcObject={videoSrcObject}
					isShowVideoElement={isShowVideoElement}
				/>
			);
		}
		case MessageType.AssistantAction: {
			return (
				<Alert
					alert={alert}
					base={base}
					width={width}
					height={height}
					backgroundColor={backgroundColor}
					videoSrcObject={videoSrcObject}
					isShowVideoElement={isShowVideoElement}
				/>
			);
		}
	}
};
export default AlertView;
