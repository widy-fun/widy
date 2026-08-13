import AddLinkIcon from "@mui/icons-material/AddLink";
import CampaignIcon from "@mui/icons-material/Campaign";
import InfoIcon from "@mui/icons-material/Info";
import MapIcon from "@mui/icons-material/Map";
import MessageIcon from "@mui/icons-material/Message";
import MovieIcon from "@mui/icons-material/Movie";
import NoAdultContentIcon from "@mui/icons-material/NoAdultContent";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SettingsIcon from "@mui/icons-material/Settings";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Alerts from "../components/dashboard/components/alerts/Alerts";
import Auction from "../components/dashboard/components/auction/Auction";
import AuctionIcon from "../components/dashboard/components/auction/components/AuctionIcon";
import Commands from "../components/dashboard/components/commands/Commands";
import AucFighter from "../components/dashboard/components/fighter/AucFighter";
import GoalIcon from "../components/dashboard/components/goals/components/GoalIcon";
import Goals from "../components/dashboard/components/goals/Goals";
import Info from "../components/dashboard/components/info/Info";
import Maption from "../components/dashboard/components/maption/Maption";
import Media from "../components/dashboard/components/media/Media";
import Messages from "../components/dashboard/components/messages/Messages";
import Nsfw from "../components/dashboard/components/nsfw/Nsfw";
import RewardIcon from "../components/dashboard/components/rewards/components/RewardIcon";
import Rewards from "../components/dashboard/components/rewards/Rewards";
import Services from "../components/dashboard/components/services/Services";
import Settings from "../components/dashboard/components/settings/Settings";
import Tts from "../components/dashboard/components/tts/Tts";
import Widgets from "../components/dashboard/components/widgets/Widgets";

export const dashboardRouts = [
	{
		path: "messages",
		element: <Messages />,
		icon: <MessageIcon />,
		name: "messages",
	},
	{
		path: "settings",
		element: <Settings />,
		icon: <SettingsIcon />,
		name: "settings",
	},
	{
		path: "services",
		element: <Services />,
		icon: <AddLinkIcon />,
		name: "services",
	},
	{
		path: "alerts",
		element: <Alerts />,
		icon: <CampaignIcon />,
		name: "alerts",
	},
	{
		path: "rewards",
		element: <Rewards />,
		icon: <RewardIcon />,
		name: "rewards",
	},
	{
		path: "goals",
		element: <Goals />,
		icon: <GoalIcon />,
		name: "goals",
	},
	{
		path: "media",
		element: <Media />,
		icon: <MovieIcon />,
		name: "media",
	},
	{
		path: "auction",
		element: <Auction />,
		icon: <AuctionIcon />,
		name: "auction",
	},
	{
		path: "fighter",
		element: <AucFighter />,
		icon: <SportsMartialArtsIcon />,
		name: "fighter",
	},
	{
		path: "maption",
		element: <Maption />,
		icon: <MapIcon />,
		name: "maption",
	},
	{
		path: "widgets",
		element: <Widgets />,
		icon: <WidgetsIcon />,
		name: "widgets",
	},
	{
		path: "nsfw",
		element: <Nsfw />,
		icon: <NoAdultContentIcon />,
		name: "nsfw",
	},
	{
		path: "commands",
		element: <Commands />,
		icon: <PriorityHighIcon />,
		name: "commands",
	},
	{
		path: "tts",
		element: <Tts />,
		icon: <VolumeUpIcon />,
		name: "tts",
	},
	{
		path: "info",
		element: <Info />,
		icon: <InfoIcon />,
		name: "info",
	},
];
