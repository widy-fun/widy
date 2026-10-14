import { IVariable } from "@widy/sdk";

const getDefaultVariable = (): IVariable => {
	return {
		id: crypto.randomUUID(),
		name: "Count",
		description: "",
		value: "0",
	};
};
export default getDefaultVariable;
