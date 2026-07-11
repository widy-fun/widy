import { AlertVariant, IReward, Platform, RewardType } from "@widy/sdk";
import i18n from "../../shared/i18n/i18n";

const getDefaultReward = (): IReward => {
	return {
		id: crypto.randomUUID(),
		platform: Platform.Twitch,
		type: RewardType.Alert,
		title: i18n.t("reward.new"),
		description: "",
		cost: 100,
		background_color: "#1976d2",
		is_user_input_required: false,
		alert_variant: AlertVariant.ImageAndAudio,
		audio_volume: 50,
		video_volume: 50,
		duration: 3000,
		delay: 0,
		is_enabled: true,
		points_currency_ratio: 1,
		audio: "alert.mp3",
		video: "video.mp4",
		image: "image.gif",
		global_cooldown_seconds: 0,
		is_global_cooldown_enabled: false,
	};
};
export default getDefaultReward;
