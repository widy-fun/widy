import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useGetModeratorsQuery } from "../../../../api/moderatorsApi";
import getDefaultModerator from "../../../../helpers/getDefaultModerator";
import { setModerator } from "../../../../store/slices/moderatorsSlice";
import ModeratorCard from "./components/ModeratorCard";

const Moderators = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { data } = useGetModeratorsQuery();
	const dispatch = useDispatch();

	return (
		<>
			<h1>{t("moderators.title")}</h1>
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
						dispatch(setModerator(getDefaultModerator()));
						navigate("/dashboard/moderators/new/moderator");
					}}
				>
					{t("moderators.add")}
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
				{data?.map((moderator) => (
					<ModeratorCard key={moderator.id} moderator={moderator} />
				))}
			</Box>
		</>
	);
};
export default Moderators;
