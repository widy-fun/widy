import { MediaType } from "@widy/sdk";

const getColorByMediaType = (mediaType: MediaType) => {
	switch (mediaType) {
		case MediaType.Youtube:
			return "#c4302b";
		case MediaType.Twitch:
			return "#9146FF ";
		case MediaType.TikTok:
			return "#00f2ea";
		case MediaType.Kick:
			return "#53fc18";
	}
};
export default getColorByMediaType;
