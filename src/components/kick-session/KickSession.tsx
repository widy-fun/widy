import { Route, Routes } from "react-router";
import AuthorizationView from "../AuthorizationView";
import SessionToken from "./components/SessionToken";

const KickSession = () => {
	return (
		<AuthorizationView>
			<Routes>
				<Route path="authorize" element={<SessionToken />} />
			</Routes>
		</AuthorizationView>
	);
};
export default KickSession;
