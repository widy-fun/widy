import {
	AlertVariant,
	CommandSourceType,
	ICommand,
	IReward,
	ITextStyle,
	Platform,
	RewardType,
	TextAnimation,
	TextAnimationVariant,
} from "@widy/sdk";
import i18n from "../shared/i18n/i18n";

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
	animation: TextAnimation.No,
	animation_variant: TextAnimationVariant.AllText,
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

export const FILE_FILTERS = {
	image: {
		name: "Images",
		extensions: ["png", "jpg", "jpeg", "gif", "bmp"],
	},
	audio: {
		name: "Audio",
		extensions: ["mp3", "wav", "ogg"],
	},
	video: {
		name: "Video",
		extensions: ["mp4"],
	},
};

export const DEFAULT_REWARD: IReward = {
	id: crypto.randomUUID(),
	platform: Platform.Twitch,
	type: RewardType.Alert,
	title: i18n.t("reward.new"),
	description: "",
	cost: 100,
	background_color: "#1976d2",
	is_user_input_required: false,
	alert_variant: AlertVariant.ImageAndAudio,
	audio_volume: 50,
	video_volume: 50,
	duration: 3000,
	delay: 0,
	is_enabled: true,
	points_currency_ratio: 1,
	audio: "alert.mp3",
	video: "video.mp4",
	image: "image.gif",
	global_cooldown_seconds: 0,
	is_global_cooldown_enabled: false,
};

export const DEFAULT_COMMAND: ICommand = {
	id: crypto.randomUUID(),
	name: "command",
	description: "",
	source: {
		trigger: "!command",
	},
	action: {},
	source_type: CommandSourceType.None,
};

export const COMMAND_ACTION = [
	{
		source_type: CommandSourceType.Chat,
		description: "",
		path: "commands/action/chat-bot",
	},
	{
		source_type: CommandSourceType.Custom,
		description: "",
		path: "commands/action/alert",
	},
];
