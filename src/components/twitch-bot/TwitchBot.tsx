import { Route, Routes } from "react-router";
import AuthorizationView from "../AuthorizationView";
import DeviceCode from "./components/DeviceCode";

const TwitchBot = () => {
	return (
		<AuthorizationView>
			<Routes>
				<Route path="device-code" element={<DeviceCode />} />
			</Routes>
		</AuthorizationView>
	);
};
export default TwitchBot;
