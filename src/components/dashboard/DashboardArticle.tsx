import { useMediaQuery, useTheme } from "@mui/material";
import { Route, Routes } from "react-router";
import { MENU_WIDTH, MENU_WIDTH_MD } from "../../constants";
import { dashboardRouts } from "../../routes/dashboardRouts";
import CreateAlert from "./components/alerts/components/CreateAlert";
import UpdateAlertSettings from "./components/alerts/UpdateAlertSettings";
import AlertAction from "./components/commands/components/AlertAction";
import AuctionAction from "./components/commands/components/AuctionAction";
import ChatBotAction from "./components/commands/components/ChatBotAction";
import ChatSource from "./components/commands/components/ChatSource";
import CreateCommand from "./components/commands/components/CreateCommand";
import KickAction from "./components/commands/components/KickAction";
import KickSource from "./components/commands/components/KickSource";
import TelegramBotAction from "./components/commands/components/TelegramBotAction";
import TimerSource from "./components/commands/components/TimerSource";
import TtsAction from "./components/commands/components/TtsAction";
import TwitchAction from "./components/commands/components/TwitchAction";
import TwitchSource from "./components/commands/components/TwitchSource";
import UpdateCommandSettings from "./components/commands/UpdateCommandSettings";
import CreateGoal from "./components/goals/components/CreateGoal";
import UpdateGoalSettings from "./components/goals/components/UpdateGoalSettings";
import CreateReward from "./components/rewards/components/CreateReward";
import UpdateRewardSettings from "./components/rewards/UpdateRewardSettings";
import CreateVariable from "./components/variables/components/CreateVariable";
import UpdateVariable from "./components/variables/components/UpdateVariable";

const DashboardArticle = () => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<article
			style={{
				padding: 15,
				width: "100%",
				marginLeft: !matches ? MENU_WIDTH : MENU_WIDTH_MD,
			}}
		>
			<Routes>
				{dashboardRouts.map((navItem) => (
					<Route
						path={navItem.path}
						element={navItem.element}
						key={navItem.path}
					/>
				))}
				<Route path="alerts/new/alert" element={<CreateAlert />} />
				<Route path="alerts/:id" element={<UpdateAlertSettings />} />
				<Route path="goals/new/goal" element={<CreateGoal />} />
				<Route path="goals/:id" element={<UpdateGoalSettings />} />
				<Route path="rewards/new/reward" element={<CreateReward />} />
				<Route path="rewards/:id" element={<UpdateRewardSettings />} />
				<Route path="commands/new/command" element={<CreateCommand />} />
				<Route path="commands/:id" element={<UpdateCommandSettings />} />
				<Route path="commands/source/chat" element={<ChatSource />} />
				<Route path="commands/source/timer" element={<TimerSource />} />
				<Route path="commands/action/chat-bot" element={<ChatBotAction />} />
				<Route path="commands/action/tts" element={<TtsAction />} />
				<Route
					path="commands/action/alert/create"
					element={<AlertAction isUpdate={false} />}
				/>
				<Route
					path="commands/action/alert/update"
					element={<AlertAction isUpdate={true} />}
				/>
				<Route path="commands/action/auction" element={<AuctionAction />} />
				<Route path="commands/source/kick" element={<KickSource />} />
				<Route path="commands/action/kick" element={<KickAction />} />
				<Route path="variables/new/variable" element={<CreateVariable />} />
				<Route path="variables/:id" element={<UpdateVariable />} />
				<Route path="commands/source/twitch" element={<TwitchSource />} />
				<Route path="commands/action/twitch" element={<TwitchAction />} />
				<Route
					path="commands/action/telegram-bot"
					element={<TelegramBotAction />}
				/>
			</Routes>
		</article>
	);
};
export default DashboardArticle;
