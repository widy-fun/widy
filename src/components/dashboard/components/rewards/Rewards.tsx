import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useGetRewardsQuery } from "../../../../api/rewardsApi";
import getDefaultReward from "../../../../helpers/getDefaultReward";
import { setReward } from "../../../../store/slices/rewardsSlice";
import RewardCard from "./components/RewardCard";

const Rewards = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { data } = useGetRewardsQuery();
	const dispatch = useDispatch();

	return (
		<>
			<h1>{t("rewards.title")}</h1>
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
						navigate("/dashboard/rewards/new/reward");
					}}
				>
					{t("rewards.create")}
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
				{data?.map((reward) => (
					<RewardCard key={reward.id} reward={reward} />
				))}
			</Box>
		</>
	);
};
export default Rewards;
