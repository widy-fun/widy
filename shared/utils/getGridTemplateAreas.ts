import { ViewType } from "@widy/sdk";

const getGridTemplateAreas = (view_type: ViewType) => {
	switch (view_type) {
		case ViewType.Top:
			return `"Media"
                    "Text"`;
		case ViewType.Bottom:
			return `"Text"
                    "Media"`;
		case ViewType.Left:
			return `"Media Text"`;
		case ViewType.Right:
			return `"Text Media"`;

		default:
			return;
	}
};
export default getGridTemplateAreas;
