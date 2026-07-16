import { Box, Card, CardContent, Switch, Typography } from "@mui/material";
import type { ICommand } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import {
	useDeleteCommandByIdMutation,
	useUpdateCommandMutation,
} from "../../../../../api/commandsApi";
import ConfigurationMenu from "../../../../ConfigurationMenu";

const CommandCard = ({ command }: { command: ICommand }) => {
	const { t } = useTranslation();
	const [deleteCommandById] = useDeleteCommandByIdMutation();
	const [updateCommand] = useUpdateCommandMutation();

	return (
		<Card
			sx={{
				marginBottom: 1,
				position: "relative",
				width: "100%",
				minHeight: 100,
			}}
		>
			<CardContent>
				<Typography variant="h5" component="div" sx={{ marginBottom: 1 }}>
					{command.name}
				</Typography>
				<Typography>{command.description}</Typography>
				<Switch
					checked={command.is_enabled}
					onChange={async (_, value) => {
						await updateCommand({
							command: { ...command, is_enabled: value },
						}).unwrap();
					}}
				/>
				<Box
					sx={{
						display: "flex",
						justifyContent: "end",
						position: "absolute",
						top: 0,
						right: 0,
					}}
				>
					<ConfigurationMenu
						onConfirm={async () => {
							await deleteCommandById({ id: command.id }).unwrap();
						}}
						warning={t("sure_delete")}
						configurePath={`/dashboard/commands/${command.id}`}
						onTest={() => {}}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};
export default CommandCard;
