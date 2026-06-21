import { IReward, Platform } from "@widy/sdk";
import { useTwitchRemoveCustomRewardMutation } from "../api/twitchApi";

const useRemoveReward = (reward: IReward) => {
	const [twitchRemoveCustomReward] = useTwitchRemoveCustomRewardMutation();
	switch (reward.platform) {
		case Platform.Twitch:
			return twitchRemoveCustomReward;
	}
};
export default useRemoveReward;
