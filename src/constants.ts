import {
	CommandSourceType,
	Currency,
	IAuctionAction,
	IChatBotAction,
	IChatSource,
	ICommand,
	ISettings,
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

export const DEFAULT_AUCTION_ACTION: IAuctionAction = {
	regular_luck_modifier: 1,
	subscriber_luck_modifier: 1,
	vip_luck_modifier: 1,
	moderator_luck_modifier: 1,
};

export const DEFAULT_SETTINGS: ISettings = {
	id: 0,
	moderation_duration: 0,
	alert_paused: false,
	remove_links: false,
	black_list: "",
	language: "en",
	currency: Currency.EUR,
	widget_token: "",
};

export const NEMOTRON_3_5_ASR_LANGUAGES: Record<string, string> = {
	en: "English",
	es: "Español",
	fr: "Français",
	it: "Italiano",
	pt: "Português",
	nl: "Nederlands",
	de: "Deutsch",
	tr: "Türkçe",
	ru: "Русский",
	ar: "العربية",
	hi: "हिन्दी",
	ja: "日本語",
	ko: "한국어",
	vi: "Tiếng Việt",
	uk: "Українська",
	pl: "Polski",
	sv: "Svenska",
	cs: "Čeština",
	nb: "Norsk bokmål",
	da: "Dansk",
	bg: "Български",
	fi: "Suomi",
	hr: "Hrvatski",
	sk: "Slovenčina",
	zh: "普通话",
	hu: "Magyar",
	ro: "Română",
	et: "Eesti",
	el: "Ελληνικά",
	lt: "Lietuvių",
	lv: "Latviešu",
	mt: "Malti",
	sl: "Slovenščina",
	he: "עברית",
	th: "ไทย",
	nn: "Norsk nynorsk",
};

export const WHISPER_LANGUAGES: Record<string, string> = {
	en: "English",
	zh: "中文",
	de: "Deutsch",
	es: "Español",
	ru: "Русский",
	ko: "한국어",
	fr: "Français",
	ja: "日本語",
	pt: "Português",
	tr: "Türkçe",
	pl: "Polski",
	ca: "Català",
	nl: "Nederlands",
	ar: "العربية",
	sv: "Svenska",
	it: "Italiano",
	id: "Bahasa Indonesia",
	hi: "हिन्दी",
	fi: "Suomi",
	vi: "Tiếng Việt",
	he: "עברית",
	uk: "Українська",
	el: "Ελληνικά",
	ms: "Bahasa Melayu",
	cs: "Čeština",
	ro: "Română",
	da: "Dansk",
	hu: "Magyar",
	ta: "தமிழ்",
	no: "Norsk",
	th: "ไทย",
	ur: "اردو",
	hr: "Hrvatski",
	bg: "Български",
	lt: "Lietuvių",
	la: "Latina",
	mi: "Te Reo Māori",
	ml: "മലയാളം",
	cy: "Cymraeg",
	sk: "Slovenčina",
	te: "తెలుగు",
	fa: "فارسی",
	lv: "Latviešu",
	bn: "বাংলা",
	sr: "Српски",
	az: "Azərbaycanca",
	sl: "Slovenščina",
	kn: "ಕನ್ನಡ",
	et: "Eesti",
	mk: "Македонски",
	br: "Brezhoneg",
	eu: "Euskara",
	is: "Íslenska",
	hy: "Հայերեն",
	ne: "नेपाली",
	mn: "Монгол",
	bs: "Bosanski",
	kk: "Қазақша",
	sq: "Shqip",
	sw: "Kiswahili",
	gl: "Galego",
	mr: "मराठी",
	pa: "ਪੰਜਾਬੀ",
	si: "සිංහල",
	km: "ខ្មែរ",
	sn: "ChiShona",
	yo: "Yorùbá",
	so: "Soomaali",
	af: "Afrikaans",
	oc: "Occitan",
	ka: "ქართული",
	be: "Беларуская",
	tg: "Тоҷикӣ",
	sd: "سنڌي",
	gu: "ગુજરાતી",
	am: "አማርኛ",
	yi: "ייִדיש",
	lo: "ລາວ",
	uz: "Oʻzbekcha",
	fo: "Føroyskt",
	ht: "Kreyòl ayisyen",
	ps: "پښتو",
	tk: "Türkmençe",
	nn: "Norsk nynorsk",
	mt: "Malti",
	sa: "संस्कृतम्",
	lb: "Lëtzebuergesch",
	my: "မြန်မာ",
	bo: "བོད་སྐད་",
	tl: "Tagalog",
	mg: "Malagasy",
	as: "অসমীয়া",
	tt: "Татарча",
	haw: "ʻŌlelo Hawaiʻi",
	ln: "Lingála",
	ha: "Hausa",
	ba: "Башҡортса",
	jw: "Basa Jawa",
	su: "Basa Sunda",
};

const EN: Record<string, string> = { en: "English" };
const ES: Record<string, string> = { es: "Español" };

export const STT_MODELS = {
	"whisper-tiny": {
		languages: WHISPER_LANGUAGES,
	},
	"whisper-base": {
		languages: WHISPER_LANGUAGES,
	},
	"whisper-small": {
		languages: WHISPER_LANGUAGES,
	},
	"whisper-medium": {
		languages: WHISPER_LANGUAGES,
	},
	"whisper-large-v3-turbo": {
		languages: WHISPER_LANGUAGES,
	},
	"parakeet-tdt-0.6b-v2": {
		languages: EN,
	},
	"nemotron-3.5-asr-streaming-0.6b": {
		languages: NEMOTRON_3_5_ASR_LANGUAGES,
	},
	"nemotron-speech-streaming-en-0.6b": {
		languages: EN,
	},
	"nemotron-speech-streaming-es-0.6b": {
		languages: ES,
	},
} satisfies Record<string, { languages: Record<string, string> }>;

export const ROW_HEIGHT = 165;
export const CONTAINER_HEIGHT = 300;
export const TTS_MODELS_HEIGHT = 160;
