import { useGetWidgetsQuery } from "../api/widgetsApi";
import EmbeddedWidget from "./EmbeddedWidget";

const EmbeddedWidgets = () => {
	const { data } = useGetWidgetsQuery();

	return (
		<>
			{data
				?.filter((w) => w.manifest.embedded)
				.map((widget) => (
					<EmbeddedWidget key={widget.id} widget={widget} />
				))}
		</>
	);
};
export default EmbeddedWidgets;
