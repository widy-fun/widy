import { Route, Routes } from "react-router";
import NavigateBackButton from "../NavigateBackButton";
import TwitchServiceSettings from "./components/TwitchServiceSettings";

const ServicesSettings = () => {
	return (
		<div style={{ padding: 15 }}>
			<NavigateBackButton />
			<Routes>
				<Route path="twitch" element={<TwitchServiceSettings />} />
			</Routes>
		</div>
	);
};
export default ServicesSettings;
