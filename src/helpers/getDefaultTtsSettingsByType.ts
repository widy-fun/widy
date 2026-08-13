import { TtsType } from "@widy/sdk";
import { DEFAULT_TTS_ACTION } from "../constants";
import getDefaultAlert from "./getDefaultAlert";

const getDefaultTtsSettingsByType = (type: TtsType) => {
	switch (type) {
		case TtsType.Edge:
			return getDefaultAlert().tts_settings;
		case TtsType.Piper:
			return DEFAULT_TTS_ACTION.tts_settings;

		default:
			break;
	}
};
export default getDefaultTtsSettingsByType;
