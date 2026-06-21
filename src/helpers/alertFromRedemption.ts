import {
	AlertVariationConditions,
	IAlert,
	IRedemption,
	MessageType,
	ViewType,
} from "@widy/sdk";
import { TEXT_STYLE } from "../constants";

const alertFromRedemption = ({
	redemption,
}: {
	redemption: IRedemption;
}): IAlert => {
	return {
		id: redemption.id,
		audio_volume: redemption.audio_volume,
		view_type: ViewType.Top,
		image: redemption.image,
		audio: redemption.audio,
		video: redemption.video,
		type: MessageType.Redemption,
		video_volume: redemption.video_volume,
		delay: redemption.delay,
		duration: redemption.duration,
		alert_variant: redemption.alert_variant,
		group_id: "",
		name: redemption.title,
		variation_conditions: AlertVariationConditions.Random,
		status: true,
		amount: 0,
		title_style: TEXT_STYLE,
		message_style: TEXT_STYLE,
	};
};
export default alertFromRedemption;
