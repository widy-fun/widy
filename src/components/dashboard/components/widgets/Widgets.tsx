import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
	useGetAllWidgetsQuery,
	useGetWidgetsQuery,
} from "../../../../api/widgetsApi";
import AddWidget from "./components/AddWidget";
import InstalledWidgetCard from "./components/InstalledWidgetCard";
import WidgetCard from "./components/WidgetCard";

const Widgets = () => {
	const { t } = useTranslation();
	const { data: installedWidgets } = useGetWidgetsQuery();
	const { data: widgets } = useGetAllWidgetsQuery();

	if (!installedWidgets || !widgets) return null;

	const allManifests = Object.entries(widgets);
	const catalogManifests = allManifests.filter(
		([, manifest]) =>
			!installedWidgets.some(
				(widget) => !widget.dev_path && widget.manifest.id === manifest.id,
			),
	);

	return (
		<>
			<h1>{t("widgets.title")}</h1>
			<div style={{ marginTop: 20 }}>
				<Box sx={{ display: "grid", gap: 1 }}>
					<AddWidget />
					{installedWidgets.map((widget) => {
						const availableManifest = widget.dev_path
							? undefined
							: allManifests.find(
									([, manifest]) => manifest.id === widget.manifest.id,
								)?.[1];

						return (
							<InstalledWidgetCard
								key={widget.id}
								widget={widget}
								availableManifest={availableManifest}
							/>
						);
					})}

					{catalogManifests.map(([id, manifest]) => (
						<WidgetCard
							key={id}
							manifest={manifest}
							installedWidgets={installedWidgets}
						/>
					))}
				</Box>
			</div>
		</>
	);
};
export default Widgets;
