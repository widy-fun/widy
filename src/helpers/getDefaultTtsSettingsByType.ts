import { FishAudioTtsModel, Gender, ITtsSettings, TtsType } from "@widy/sdk";

const getDefaultTtsSettingsByType = (type: TtsType): ITtsSettings => {
	let tts_settings = { type, volume: 50 } as ITtsSettings;
	switch (type) {
		case TtsType.Edge:
			tts_settings.extra = { gender: Gender.Male };
			break;
		case TtsType.Piper:
			tts_settings.models = [];
			break;
		case TtsType.FishAudio:
			tts_settings.extra = { model: FishAudioTtsModel.S21ProFree };
			tts_settings.models = [];
			break;
	}
	return tts_settings;
};
export default getDefaultTtsSettingsByType;
