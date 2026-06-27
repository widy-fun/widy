import { Route, Routes } from "react-router";
import AuthorizationView from "../AuthorizationView";
import Authorize from "./components/Authorize";

const Kick = () => {
	return (
		<AuthorizationView>
			<Routes>
				<Route path="authorize" element={<Authorize />} />
			</Routes>
		</AuthorizationView>
	);
};
export default Kick;
