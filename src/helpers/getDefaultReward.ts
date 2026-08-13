import { AlertVariant, IReward, Platform, RewardType } from "@widy/sdk";
import i18n from "../../shared/i18n/i18n";
import { DEFAULT_TTS_ACTION } from "../constants";

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
		is_enabled: true,
		points_currency_ratio: 1,
		global_cooldown_seconds: 0,
		is_global_cooldown_enabled: false,
		tts_action: DEFAULT_TTS_ACTION,
	};
};
export default getDefaultReward;
