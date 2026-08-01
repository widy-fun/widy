import { CircularProgress } from "@mui/material";
import { showSnackBar } from "@widy/react";
import { AlertSeverity, AppError } from "@widy/sdk";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import useAppEvents from "../shared/hooks/useAppEvents";
import { useGetInitialStateQuery } from "./api";
import { useGetSettingsQuery } from "./api/settingsApi";
import { AppSnackBar } from "./components/AppSnackBar";
import WidgetControl from "./components/dashboard/components/widgets/components/WidgetControl";
import Dashboard from "./components/dashboard/Dashboard";
import Destream from "./components/destream/Destream";
import Donatello from "./components/donatello/Donatello";
import DonatePay from "./components/donatepay/DonatePay";
import Donatik from "./components/donatik/Donatik";
import DonationAlerts from "./components/donationalerts/DonationAlerts";
import Kick from "./components/kick/Kick";
import KickBot from "./components/kick-bot/KickBot";
import StreamElements from "./components/streamelements/StreamElements";
import StreamLabs from "./components/streamlabs/StreamLabs";
import Tribute from "./components/tribute/Tribute";
import Twitch from "./components/twitch/Twitch";
import TwitchBot from "./components/twitch-bot/TwitchBot";
import UpdaterDialog from "./components/UpdaterDialog";
import Widy from "./components/widy/Widy";
import useStreamElementsSocketService from "./hooks/useStreamElementsService";
import { setSettings } from "./store/slices/settingsSlice";

function App() {
	const eventsService = useAppEvents();
	const streamElementsSocketService = useStreamElementsSocketService();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { i18n, t } = useTranslation();
	const hasNavigated = useRef(false);
	const [isLoading, setIsLoading] = useState(true);
	const { data } = useGetInitialStateQuery(undefined, {
		pollingInterval: 100,
		skip: !isLoading,
	});

	useEffect(() => {
		if (!isLoading) return;
		if (data?.error?.kind === AppError.Internet) {
			dispatch(
				showSnackBar({
					message: t(`errors.${data.error.kind}`),
					alertSeverity: AlertSeverity.error,
				}),
			);
			return;
		} else if (data?.is_initialized) {
			eventsService.connect();
			streamElementsSocketService.connect();
			setIsLoading(false);
			if (data?.error) {
				dispatch(
					showSnackBar({
						message: t(`errors.${data.error.kind}`),
						alertSeverity: AlertSeverity.error,
					}),
				);
			}
		}
	}, [
		data,
		eventsService,
		streamElementsSocketService,
		isLoading,
		dispatch,
		t,
	]);

	const { data: settings } = useGetSettingsQuery(undefined, {
		skip: isLoading,
	});

	useEffect(() => {
		if (settings) {
			i18n.changeLanguage(settings.language);
			dispatch(setSettings(settings));
		}
	}, [i18n, settings, dispatch]);

	useEffect(() => {
		if (!hasNavigated.current) {
			hasNavigated.current = true;
			navigate("/dashboard/messages");
		}
	}, [navigate]);

	return (
		<main style={{ display: "grid", height: "100dvh" }}>
			{settings && <UpdaterDialog />}
			<AppSnackBar />
			{isLoading ? (
				<CircularProgress sx={{ placeSelf: "center" }} />
			) : (
				<Routes>
					<Route path="/streamelements/*" element={<StreamElements />} />
					<Route path="/streamlabs/*" element={<StreamLabs />} />
					<Route path="/twitch/*" element={<Twitch />} />
					<Route path="/twitch-bot/*" element={<TwitchBot />} />
					<Route path="/kick/*" element={<Kick />} />
					<Route path="/kick-bot/*" element={<KickBot />} />
					<Route path="/widy/*" element={<Widy />} />
					<Route path="/donationalerts/*" element={<DonationAlerts />} />
					<Route path="/donatepay/*" element={<DonatePay />} />
					<Route path="/destream/*" element={<Destream />} />
					<Route path="/donatello/*" element={<Donatello />} />
					<Route path="/donatik/*" element={<Donatik />} />
					<Route path="/dashboard/*" element={<Dashboard />} />
					<Route path="/tribute/*" element={<Tribute />} />
					<Route path="/widget/:id" element={<WidgetControl />} />
				</Routes>
			)}
		</main>
	);
}

export default App;
