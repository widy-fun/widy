import {
	AlertVariant,
	AlertVariationConditions,
	Gender,
	IAlert,
	MessageType,
	TtsType,
	ViewType,
} from "@widy/sdk";
import i18n from "../../shared/i18n/i18n";
import { TEXT_STYLE } from "../constants";

const getDefaultAlert = (group_id = "1"): IAlert => {
	return {
		id: crypto.randomUUID(),
		audio_volume: 50,
		view_type: ViewType.Top,
		audio: "alert.mp3",
		video: "video.mp4",
		image: "image.gif",
		group_id,
		name: i18n.t("alert.new_variant"),
		title_style: TEXT_STYLE,
		title_template: "{{user_name}} donated {{amount}} {{currency}}",
		message_style: TEXT_STYLE,
		variation_conditions: AlertVariationConditions.Random,
		status: true,
		type: MessageType.Donation,
		amount: 100,
		video_volume: 50,
		delay: 0,
		duration: 3000,
		alert_variant: AlertVariant.ImageAndAudio,
		tts_type: TtsType.Edge,
		tts_volume: 50,
		tts_settings: { gender: Gender.Male },
	};
};
export default getDefaultAlert;
