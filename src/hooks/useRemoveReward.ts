import { IReward, Platform } from "@widy/sdk";
import { useKickRemoveCustomRewardMutation } from "../api/kickApi";
import { useTwitchRemoveCustomRewardMutation } from "../api/twitchApi";

const useRemoveReward = (reward: IReward) => {
	const [twitchRemoveCustomReward] = useTwitchRemoveCustomRewardMutation();
	const [kickRemoveCustomReward] = useKickRemoveCustomRewardMutation();
	switch (reward.platform) {
		case Platform.Twitch:
			return twitchRemoveCustomReward;
		case Platform.Kick:
			return kickRemoveCustomReward;
	}
};
export default useRemoveReward;
