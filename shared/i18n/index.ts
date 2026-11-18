import {
	arTranslation,
	deTranslation,
	enTranslation,
	esTranslation,
	frTranslation,
	hiTranslation,
	ptTranslation,
	ruTranslation,
	uaTranslation,
	zhTranslation,
} from "@widy/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "../translation/ar.json";
import de from "../translation/de.json";
import en from "../translation/en.json";
import es from "../translation/es.json";
import fr from "../translation/fr.json";
import hi from "../translation/hi.json";
import pt from "../translation/pt.json";
import ru from "../translation/ru.json";
import ua from "../translation/ua.json";
import zh from "../translation/zh.json";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: { ...en, ...enTranslation },
		},
		ua: {
			translation: { ...ua, ...uaTranslation },
		},
		ru: {
			translation: { ...ru, ...ruTranslation },
		},
		de: {
			translation: { ...de, ...deTranslation },
		},
		es: {
			translation: { ...es, ...esTranslation },
		},
		fr: {
			translation: { ...fr, ...frTranslation },
		},
		hi: {
			translation: { ...hi, ...hiTranslation },
		},
		pt: {
			translation: { ...pt, ...ptTranslation },
		},
		zh: {
			translation: { ...zh, ...zhTranslation },
		},
		ar: {
			translation: { ...ar, ...arTranslation },
		},
	},
	lng: "en",
	fallbackLng: "en",
	nsSeparator: false,
});
export default i18n;
