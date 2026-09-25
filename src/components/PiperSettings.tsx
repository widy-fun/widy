import SearchIcon from "@mui/icons-material/Search";
import { Box, Chip, InputAdornment, styled, TextField } from "@mui/material";
import type { IPiperVoice, ITtsSettings } from "@widy/sdk";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AutoSizer, List, type ListRowProps } from "react-virtualized";
import { useGetPiperVoicesQuery } from "../api/ttsApi";
import { CONTAINER_HEIGHT, ROW_HEIGHT, SCROLLBAR_STYLES } from "../constants";
import readAppLocalDirEntrys from "../helpers/readAppLocalDirEntrys";
import PiperVoiceCard from "./PiperVoiceCard";

const StyledList = styled(List)(() => ({
	...SCROLLBAR_STYLES,
}));

const PiperSettings = ({
	onSettingsChange,
	tts_settings,
}: {
	onSettingsChange: (tts_settings: ITtsSettings) => void;
	tts_settings: ITtsSettings;
}) => {
	const { t } = useTranslation();
	const { data } = useGetPiperVoicesQuery();
	const [downloadedModels, setDownloadedModels] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [piperTtsVoices, setPiperTtsVoices] = useState<IPiperVoice[]>([]);

	const piperVoices = data ?? [];

	const filteredVoices = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return piperVoices;

		return piperVoices.filter((voice) => {
			const haystack = [
				voice.name,
				voice.key,
				voice.language.name_english,
				voice.language.country_english,
				voice.language.code,
				...voice.aliases,
			]
				.join(" ")
				.toLowerCase();

			return haystack.includes(query);
		});
	}, [piperVoices, searchQuery]);

	const rowRenderer = ({ index, key, style }: ListRowProps) => {
		const voice = filteredVoices[index];
		return (
			<div key={key} style={style}>
				<Box
					sx={{
						px: 0,
						pb: 1,
						height: "100%",
						boxSizing: "border-box",
						marginBottom: 5,
					}}
				>
					<PiperVoiceCard
						voice={voice}
						isSelected={
							piperTtsVoices.some((v) => v.key === voice.key) ?? false
						}
						onChange={(checked) => {
							if (checked) {
								setPiperTtsVoices((prev) => [...prev, voice]);
								onSettingsChange({
									...tts_settings,
									models: [...piperTtsVoices, voice],
								});
							} else {
								const updatedVoices = piperTtsVoices.filter(
									(v) => v.key !== voice.key,
								);
								setPiperTtsVoices(updatedVoices);
								onSettingsChange({
									...tts_settings,
									models: updatedVoices,
								});
							}
						}}
						downloadedModels={downloadedModels}
						setDownloadedModels={setDownloadedModels}
						onRemove={() => {
							const updatedVoices = piperTtsVoices.filter(
								(v) => v.key !== voice.key,
							);
							setPiperTtsVoices(updatedVoices);
							onSettingsChange({
								...tts_settings,
								models: updatedVoices,
							});
						}}
					/>
				</Box>
			</div>
		);
	};

	useEffect(() => {
		readAppLocalDirEntrys("piper-voices").then(setDownloadedModels);
	}, []);

	useEffect(() => {
		if (piperVoices.length) {
			const validEntries = (tts_settings.models as IPiperVoice[]).filter(
				(settingsVoice) => piperVoices.some((v) => v.key === settingsVoice.key),
			);
			setPiperTtsVoices(validEntries);
		}
	}, [tts_settings, piperVoices]);

	return (
		<Box sx={{ width: 400 }}>
			<TextField
				fullWidth
				size="small"
				placeholder={t("search_voices")}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				sx={{ mb: 1 }}
				autoComplete="off"
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon fontSize="small" />
							</InputAdornment>
						),
					},
				}}
			/>

			<Box sx={{ width: "100%", height: CONTAINER_HEIGHT }}>
				<AutoSizer>
					{({ width, height }) => (
						<StyledList
							width={width}
							height={height}
							rowCount={filteredVoices.length}
							rowHeight={ROW_HEIGHT}
							rowRenderer={rowRenderer}
							overscanRowCount={5}
						/>
					)}
				</AutoSizer>
			</Box>
			<Box sx={{ margin: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
				{piperTtsVoices.map((settingsVoice) => {
					const voice = piperVoices.find((v) => v.key === settingsVoice.key);
					if (!voice) return null;

					return (
						<Chip
							key={voice.key}
							label={voice.name}
							size="small"
							variant="outlined"
							onDelete={() => {
								const updatedVoices = piperTtsVoices.filter(
									(v) => v.key !== voice.key,
								);
								setPiperTtsVoices(updatedVoices);
								onSettingsChange({
									...tts_settings,
									models: updatedVoices,
								});
							}}
						/>
					);
				})}
			</Box>
		</Box>
	);
};
export default PiperSettings;
