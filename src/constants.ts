import { ITextStyle } from "@widy/sdk";

export const MENU_WIDTH = 260;
export const MENU_WIDTH_MD = 64;
export const DEFAULT_TIMER_DURATION = 600 * 1000;
export const DEFAULT_TIME = 60 * 1000;
export const ONE_METER_IN_DEGREES = 0.01 / (1.1 * 1000);
export const CHARACTERS = {
	RYU: 0,
	KEN: 3,
	SAGAT: 10,
	MBISON: 14,
	AKUMA: 13,
};
export const TEXT_STYLE: ITextStyle = {
	font_size: 60,
	text_color: "rgb(255,255,255,1)",
	bold: true,
	italics: false,
	underline: false,
	letter_spacing: 0,
	word_spacing: 0,
};

export const SCROLLBAR_STYLES = {
	overflowY: "auto",
	overflowX: "hidden",
	"&::-webkit-scrollbar": {
		width: 6,
	},
	"&::-webkit-scrollbar-track": {
		background: "transparent",
	},
	"&::-webkit-scrollbar-thumb": {
		background: "#9e9e9e",
	},
	"&::-webkit-scrollbar-thumb:hover": {
		background: "#bdbdbd",
	},
	"&::-webkit-scrollbar-button": {
		display: "none",
	},
} as unknown as TemplateStringsArray;
