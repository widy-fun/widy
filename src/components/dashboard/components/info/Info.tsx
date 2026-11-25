import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SystemUpdateOutlinedIcon from "@mui/icons-material/SystemUpdateOutlined";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Chip,
	Stack,
	Typography,
} from "@mui/material";
import { appLogDir } from "@tauri-apps/api/path";
import { openPath, openUrl } from "@tauri-apps/plugin-opener";
import { useTranslation } from "react-i18next";
import { version } from "../../../../../package.json";
import {
	useGetSettingsQuery,
	useUpdateSettingsMutation,
} from "../../../../api/settingsApi";

const Info = () => {
	const { t } = useTranslation();
	const [updateSettings] = useUpdateSettingsMutation();
	const { data: settings } = useGetSettingsQuery();

	return (
		<>
			<h1>{t("dashboard.info")}</h1>
			<Box
				sx={{
					width: "100%",
					maxWidth: 760,
					mx: "auto",
				}}
			>
				<Card
					elevation={0}
					sx={{
						mb: 2,
						overflow: "hidden",
						border: "1px solid",
						borderColor: "divider",
						borderRadius: 3,
					}}
				>
					<Box
						sx={{
							height: 8,
							background:
								"linear-gradient(90deg, #7c5cff 0%, #b66cff 48%, #4ecdc4 100%)",
						}}
					/>
					<CardContent
						sx={{
							display: "flex",
							alignItems: "center",
							gap: { xs: 2.5, sm: 4 },
							p: { xs: 3, sm: 4 },
						}}
					>
						<Box
							sx={{
								width: { xs: 88, sm: 112 },
								height: { xs: 88, sm: 112 },
								flexShrink: 0,
								display: "grid",
								placeItems: "center",
								borderRadius: "24%",
								background:
									"linear-gradient(145deg, rgba(124,92,255,.12), rgba(78,205,196,.08))",
								border: "1px solid",
								borderColor: "divider",
							}}
						>
							<Box
								component="img"
								src="/logo.png"
								alt="Widy"
								sx={{
									width: { xs: 72, sm: 92 },
									height: { xs: 72, sm: 92 },
									objectFit: "contain",
								}}
							/>
						</Box>

						<Box sx={{ minWidth: 0 }}>
							<Typography
								variant="h4"
								component="h2"
								sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}
							>
								Widy
							</Typography>
							<Chip
								size="small"
								label={`${t("version")} ${version}`}
								variant="outlined"
								sx={{ mt: 1.25, fontWeight: 700 }}
							/>
						</Box>
					</CardContent>
				</Card>

				<Stack
					direction={{ xs: "column", sm: "row" }}
					spacing={2}
					sx={{ "& > *": { flex: 1 } }}
				>
					<Card
						elevation={0}
						sx={{
							border: "1px solid",
							borderColor: "divider",
							borderRadius: 3,
							transition: "transform .18s ease, border-color .18s ease",
							"&:hover": {
								transform: "translateY(-2px)",
								borderColor: "primary.main",
							},
						}}
					>
						<CardActionArea
							onClick={() => openUrl("https://docs.widy.fun/")}
							sx={{ height: "100%" }}
						>
							<CardContent sx={{ p: 2.5 }}>
								<MenuBookOutlinedIcon
									color="primary"
									sx={{ fontSize: 30, mb: 1.5 }}
								/>
								<Typography sx={{ fontWeight: 750 }}>
									{t("documentation")}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>

					<Card
						elevation={0}
						sx={{
							border: "1px solid",
							borderColor: "divider",
							borderRadius: 3,
							transition: "transform .18s ease, border-color .18s ease",
							"&:hover": {
								transform: "translateY(-2px)",
								borderColor: "primary.main",
							},
						}}
					>
						<CardActionArea
							onClick={async () => {
								await openPath(await appLogDir());
							}}
							sx={{ height: "100%" }}
						>
							<CardContent sx={{ p: 2.5 }}>
								<FolderOpenOutlinedIcon
									color="primary"
									sx={{ fontSize: 30, mb: 1.5 }}
								/>
								<Typography sx={{ fontWeight: 750 }}>{t("logs")}</Typography>
							</CardContent>
						</CardActionArea>
					</Card>

					<Card
						elevation={0}
						sx={{
							border: "1px solid",
							borderColor: "divider",
							borderRadius: 3,
							transition: "transform .18s ease, border-color .18s ease",
							"&:hover": {
								transform: "translateY(-2px)",
								borderColor: "primary.main",
							},
						}}
					>
						<CardActionArea
							disabled={!settings}
							onClick={async () => {
								if (settings) {
									await updateSettings({
										settings: { ...settings, check_update: true },
									});
									location.reload();
								}
							}}
							sx={{ height: "100%" }}
						>
							<CardContent sx={{ p: 2.5 }}>
								<SystemUpdateOutlinedIcon
									color="primary"
									sx={{ fontSize: 30, mb: 1.5 }}
								/>
								<Typography sx={{ fontWeight: 750 }}>
									{t("updater.check_update")}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Stack>
			</Box>
		</>
	);
};

export default Info;
