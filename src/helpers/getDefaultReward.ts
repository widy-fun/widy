import {
	AlertVariant,
	IReward,
	Platform,
	RewardType,
	TtsType,
} from "@widy/sdk";
import i18n from "../../shared/i18n/i18n";
import getDefaultTtsSettingsByType from "./getDefaultTtsSettingsByType";

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
		tts_settings: getDefaultTtsSettingsByType(TtsType.Piper),
	};
};
export default getDefaultReward;
