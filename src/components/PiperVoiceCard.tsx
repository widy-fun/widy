import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Stack,
	Switch,
	Typography,
} from "@mui/material";
import { remove,mkdir } from "@tauri-apps/plugin-fs";
import { download } from "@tauri-apps/plugin-upload";
import { showSnackBar } from "@widy/react";
import { AlertSeverity, type IPiperVoice } from "@widy/sdk";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import formatBytes from "../helpers/formatBytes";
import readPipersVoicesDir from "../helpers/readPipersVoicesDir";
import type { AppState } from "../store";
import WarningDialog from "./WarningDialog";

const PiperVoiceCard = ({
	voice,
	onChange,
	downloadedModels,
	setDownloadedModels,
	isSelected,
	onRemove,
}: {
	voice: IPiperVoice;
	onChange: (checked: boolean) => void;
	downloadedModels: string[];
	setDownloadedModels: Dispatch<SetStateAction<string[]>>;
	isSelected: boolean;
	onRemove: () => void;
}) => {
	const { t } = useTranslation();

	const [dialogOpen, setDialogOpen] = useState(false);

	const dispatch = useDispatch();

	const { appDataDir } = useSelector((state: AppState) => state.mainState);

	const [downloading, setDownloading] = useState(false);

	const [removing, setRemoving] = useState(false);

	const huggingFaceModelFilePath = Object.keys(voice.files).find((f) =>
		f.endsWith(".onnx"),
	);

	const modelFilePath = `${appDataDir}/piper-voices/${voice.key}.onnx`;

	const huggingFaceConfigFilePath = Object.keys(voice.files).find((f) =>
		f.endsWith(".onnx.json"),
	);

	const piperVoicesPath=`${appDataDir}/piper-voices`;

	const configFilePath = `${piperVoicesPath}/${voice.key}.onnx.json`;

	const totalSizeBytes = Object.values(voice.files).reduce(
		(sum, f) => sum + f.size_bytes,
		0,
	);

	const isModelDownloaded = downloadedModels.includes(`${voice.key}.onnx`);

	const commitHash = "ea046e8458f6acd997706d6e6066a022b42f6fb1";
	const baseUrl = `https://huggingface.co/rhasspy/piper-voices/resolve/${commitHash}`;

	const handleDownload = async () => {
		if (!huggingFaceModelFilePath || !huggingFaceConfigFilePath) {
			dispatch(
				showSnackBar({
					message: t("piper.missing_model", { voice_key: voice.key }),
					alertSeverity: AlertSeverity.error,
				}),
			);
			return;
		}
		
		setDownloading(true);
		
		try {
			await mkdir(piperVoicesPath,{recursive:true});
			await Promise.all([
				download(
					`${baseUrl}/${huggingFaceModelFilePath}?download=true`,
					modelFilePath,
				),
				download(
					`${baseUrl}/${huggingFaceConfigFilePath}?download=true`,
					configFilePath,
				),
			]);
		} catch (err) {
			dispatch(
				showSnackBar({
					message: t("piper.failed_download", { voice_key: voice.key }),
					alertSeverity: AlertSeverity.error,
				}),
			);
			console.error(`Failed to download voice ${voice.key}`, err);
		} finally {
			setDownloading(false);
			readPipersVoicesDir().then(setDownloadedModels);
		}
	};

	const handleRemove = async () => {
		setRemoving(true);

		try {
			await Promise.all([remove(modelFilePath), remove(configFilePath)]);
		} catch (err) {
			dispatch(
				showSnackBar({
					message: t("piper.failed_remove", { voice_key: voice.key }),
					alertSeverity: AlertSeverity.error,
				}),
			);
			console.error(`Failed to remove voice ${voice.key}`, err);
		} finally {
			setRemoving(false);
			readPipersVoicesDir().then(setDownloadedModels);
			onRemove();
			setDialogOpen(false);
		}
	};

	return (
		<>
			<WarningDialog
				open={dialogOpen}
				setOpen={setDialogOpen}
				title={t("piper.remove_voice")}
				warning={t("piper.sure_remove")}
				onClick={handleRemove}
			/>
			<Card sx={{ height: 160 }}>
				<CardContent>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="flex-start"
					>
						<Box>
							<Typography variant="subtitle1">{voice.name}</Typography>
							<Typography variant="body2" color="text.secondary">
								{voice.language.name_english} ({voice.language.country_english})
							</Typography>
						</Box>
						{isModelDownloaded && (
							<span>
								<Switch
									checked={isSelected}
									onChange={(_, checked) => onChange(checked)}
								/>
							</span>
						)}
					</Stack>

					<Stack
						direction="row"
						spacing={1}
						flexWrap="wrap"
						sx={{ mt: 1, mb: 1 }}
					>
						<Chip
							label={t(`piper.${voice.quality}`)}
							size="small"
							variant="outlined"
						/>
						<Chip
							label={
								voice.num_speakers > 1
									? `${voice.num_speakers} ${t("speakers")}`
									: t("single_speaker")
							}
							size="small"
							variant="outlined"
						/>
						<Chip
							label={formatBytes(totalSizeBytes)}
							size="small"
							variant="outlined"
						/>
					</Stack>

					{!isModelDownloaded && (
						<Button
							onClick={handleDownload}
							disabled={
								downloading ||
								!huggingFaceModelFilePath ||
								!huggingFaceConfigFilePath
							}
							variant="contained"
							size="small"
						>
							{downloading ? t("downloading") : t("download")}
						</Button>
					)}
					{isModelDownloaded && (
						<Button
							onClick={() => setDialogOpen(true)}
							disabled={removing}
							variant="contained"
							size="small"
						>
							{removing ? t("removing") : t("remove")}
						</Button>
					)}
				</CardContent>
			</Card>
		</>
	);
};
export default PiperVoiceCard;
