import { IVariable } from "@widy/sdk";

const getDefaultVariable = (): IVariable => {
	return {
		id: crypto.randomUUID(),
		name: "count",
		description: "",
		value: "0",
	};
};
export default getDefaultVariable;
