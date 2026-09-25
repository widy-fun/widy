import { TtsType } from "@widy/sdk";
import getDefaultAlert from "./getDefaultAlert";

const getDefaultTtsSettingsByType = (type: TtsType) => {
	switch (type) {
		case TtsType.Edge:
			return getDefaultAlert().tts_settings;
		case TtsType.Piper:
			return [];
		case TtsType.FishAudio:
			return [];
	}
};
export default getDefaultTtsSettingsByType;
