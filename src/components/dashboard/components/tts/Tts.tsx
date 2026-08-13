import { useTranslation } from "react-i18next";
import WidgetUrl from "../alerts/components/WidgetUrl";

const Tts = () => {
	const { t } = useTranslation();

	return (
		<>
			<h1>{t("tts.title")}</h1>
			<WidgetUrl
				widgetUrl="http://localhost:12553/tts"
				text={t("widget.url")}
			/>
		</>
	);
};
export default Tts;
