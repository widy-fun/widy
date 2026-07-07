import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useGetCommandsQuery } from "../../../../api/commandsApi";
import { DEFAULT_COMMAND } from "../../../../constants";
import { setCommand } from "../../../../store/slices/commandsSlice";
import CommandCard from "./components/CommandCard";

const Commands = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { data } = useGetCommandsQuery();

	return (
		<>
			<h1>{t("commands.title")}</h1>
			<Box
				sx={{
					display: "grid",
					placeItems: "center",
					marginBottom: 1,
				}}
			>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={() => {
						dispatch(
							setCommand({ ...DEFAULT_COMMAND, id: crypto.randomUUID() }),
						);
						navigate("/dashboard/commands/new/command");
					}}
				>
					{t("commands.create")}
				</Button>
			</Box>
			<Box
				sx={{
					display: "flex",
					gap: 1,
					flexWrap: "wrap",
					placeContent: "center",
				}}
			>
				{data?.map((command) => (
					<CommandCard key={command.id} command={command} />
				))}
			</Box>
		</>
	);
};
export default Commands;
