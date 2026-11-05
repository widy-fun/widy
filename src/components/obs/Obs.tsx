import { Route, Routes } from "react-router";
import AuthorizationView from "../AuthorizationView";
import ServerSettings from "./components/ServerSettings";

const Obs = () => {
	return (
		<AuthorizationView>
			<Routes>
				<Route path="server-settings" element={<ServerSettings />} />
			</Routes>
		</AuthorizationView>
	);
};
export default Obs;
