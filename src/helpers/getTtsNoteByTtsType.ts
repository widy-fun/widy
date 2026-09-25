import { TtsType } from "@widy/sdk";
import i18n from "../../shared/i18n/i18n";

const getTtsNoteByTtsType = (tts_type: TtsType) => {
	switch (tts_type) {
		case TtsType.Google:
			return i18n.t("tts.quotas");
		case TtsType.Edge:
			return i18n.t("tts.quotas");
		case TtsType.Piper:
			return i18n.t("tts.model_ram");
		case TtsType.FishAudio:
			return i18n.t("tts.need_connect");
	}
};
export default getTtsNoteByTtsType;
