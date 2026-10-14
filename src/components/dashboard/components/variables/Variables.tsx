import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useGetVariablesQuery } from "../../../../api/variablesApi";
import getDefaultReward from "../../../../helpers/getDefaultReward";
import { setReward } from "../../../../store/slices/rewardsSlice";
import VariableCard from "./components/VariableCard";

const Variables = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { data } = useGetVariablesQuery();
	const dispatch = useDispatch();

	return (
		<>
			<h1>{t("variables.title")}</h1>
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
						dispatch(setReward(getDefaultReward()));
						navigate("/dashboard/variables/new/variable");
					}}
				>
					{t("variable.create")}
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
				{data?.map((variable) => (
					<VariableCard key={variable.id} variable={variable} />
				))}
			</Box>
		</>
	);
};
export default Variables;
