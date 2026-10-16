import { Box, Card, CardContent, Typography } from "@mui/material";
import type { IVariable } from "@widy/sdk";
import { useTranslation } from "react-i18next";
import { useDeleteVariableByIdMutation } from "../../../../../api/variablesApi";
import ConfigurationMenu from "../../../../ConfigurationMenu";

const VariableCard = ({ variable }: { variable: IVariable }) => {
	const { t } = useTranslation();
	const [deleteVariableById] = useDeleteVariableByIdMutation();

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
					{`{{${variable.name}}}`}
				</Typography>
				<Typography>{variable.description}</Typography>

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
							await deleteVariableById({ id: variable.id }).unwrap();
						}}
						warning={t("sure_delete")}
						configurePath={`/dashboard/variables/${variable.id}`}
						isShowTest={false}
					/>
				</Box>
			</CardContent>
		</Card>
	);
};
export default VariableCard;
