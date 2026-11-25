import { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import DashboardArticle from "./DashboardArticle";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
	const { pathname } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useLayoutEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, [pathname]);

	return (
		<div style={{ display: "flex" }}>
			<DashboardSidebar />
			<DashboardArticle />
		</div>
	);
};
export default Dashboard;
