import { ISettings } from "@widy/sdk";

export const appSettingsToWidgetSettings = (
	settings?: ISettings,
): ISettings | undefined => {
	if (!settings) return;
	return {
		...settings,
		widget_token: "",
	};
};

export default appSettingsToWidgetSettings;
