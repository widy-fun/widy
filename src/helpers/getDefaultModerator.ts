import { IModerator } from "@widy/sdk";

const getDefaultModerator = (): IModerator => {
	return {
		id: crypto.randomUUID(),
		name: "",
	};
};
export default getDefaultModerator;
