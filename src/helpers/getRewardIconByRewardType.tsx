import CampaignIcon from "@mui/icons-material/Campaign";
import MovieIcon from "@mui/icons-material/Movie";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { type IReward, RewardType } from "@widy/sdk";
import AuctionIcon from "../components/dashboard/components/auction/components/AuctionIcon";

const getRewardIconByRewardType = ({
	reward,
	size,
}: {
	reward: IReward;
	size: number;
}) => {
	switch (reward.type) {
		case RewardType.Alert:
			return <CampaignIcon sx={{ width: size, height: size }} />;
		case RewardType.Media:
			return <MovieIcon sx={{ width: size, height: size }} />;
		case RewardType.Auction:
			return <AuctionIcon size={size} />;
		case RewardType.TTS:
			return <VolumeUpIcon sx={{ width: size, height: size }} />;
	}
};
export default getRewardIconByRewardType;
