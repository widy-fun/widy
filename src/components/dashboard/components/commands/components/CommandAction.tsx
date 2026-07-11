import CampaignIcon from "@mui/icons-material/Campaign";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Box } from "@mui/material";
import { MessageType } from "@widy/sdk";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../../../../shared/slices/alertsSlice";
import getDefaultAlert from "../../../../../helpers/getDefaultAlert";
import type { AppState } from "../../../../../store";
import CommandSourceActionCard from "./CommandSourceActionCard";

const CommandAction = () => {
	const { command } = useSelector((state: AppState) => state.commandsState);
	const dispatch = useDispatch();

	return (
		<Box
			sx={{
				display: "flex",
				gap: 1,
				flexWrap: "wrap",
				placeContent: "center",
			}}
		>
			<CommandSourceActionCard
				title="ChatBot"
				description=""
				path="/dashboard/commands/action/chat-bot"
				icon={<SmartToyIcon sx={{ width: 40, height: 40 }} />}
				selected={!!command.chat_bot}
			/>
			<CommandSourceActionCard
				title="Alert"
				description=""
				path="/dashboard/alerts/new/alert"
				onNavigate={() => {
					dispatch(
						setAlert({
							...getDefaultAlert(),
							command_id: command.id,
							name: command.name,
							type: MessageType.Command,
						}),
					);
				}}
				icon={<CampaignIcon sx={{ width: 40, height: 40 }} />}
				selected={!!command.alert}
			/>
		</Box>
	);
};
export default CommandAction;
