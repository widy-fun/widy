import {
	CommandSourceType,
	IChatBotAction,
	IChatSource,
	ICommand,
	ITextStyle,
	ITimerSource,
	Platform,
	PostType,
	TextAnimation,
	TextAnimationVariant,
	UserLevel,
} from "@widy/sdk";

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

export const DEFAULT_TIMER_SOURCE: ITimerSource = {
	message: "Hello",
	mins_passed: 5,
	lines_passed: 10,
	post_type: PostType.Normal,
};

export const DEFAULT_CHAT_SOURCE: IChatSource = {
	trigger: "!command",
	platforms: [Platform.Kick, Platform.Twitch],
	user_levels: [
		UserLevel.Moderator,
		UserLevel.Streamer,
		UserLevel.Subscriber,
		UserLevel.Vip,
		UserLevel.Anyone,
	],
};

export const DEFAULT_COMMAND: ICommand = {
	id: crypto.randomUUID(),
	name: "command",
	description: "",
	source_type: CommandSourceType.None,
	is_enabled: true,
};

export const COMMAND_ACTION = [
	{
		source_type: CommandSourceType.Chat,
		description: "",
		path: "commands/action/chat-bot",
	},
	{
		source_type: CommandSourceType.Timer,
		description: "",
		path: "commands/action/alert",
	},
];

export const DEFAULT_CHAT_BOT_ACTION: IChatBotAction = {
	message: "",
	replay: false,
	platforms: [Platform.Kick, Platform.Twitch],
};
