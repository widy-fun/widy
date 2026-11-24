import { Box } from "@mui/material";
import {
	useGetAllWidgetsQuery,
	useGetWidgetsQuery,
} from "../../../../../api/widgetsApi";
import WidgetCard from "./WidgetCard";

const AllWidgets = () => {
	const { data: installedWidgets } = useGetWidgetsQuery();
	const { data: widgets } = useGetAllWidgetsQuery();

	return (
		<>
			{installedWidgets && widgets && (
				<Box>
					{Object.entries(widgets).map(([id, manifest]) => (
						<WidgetCard
							key={id}
							manifest={manifest}
							installedWidgets={installedWidgets}
						/>
					))}
				</Box>
			)}
		</>
	);
};
export default AllWidgets;
