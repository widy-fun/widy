import SearchIcon from "@mui/icons-material/Search";
import { Box, Chip, InputAdornment, styled, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AutoSizer, List, type ListRowProps } from "react-virtualized";
import { useGetPiperVoicesQuery } from "../api/ttsApi";
import { SCROLLBAR_STYLES } from "../constants";
import readPipersVoicesDir from "../helpers/readPipersVoicesDir";
import PiperVoiceCard from "./PiperVoiceCard";

const ROW_HEIGHT = 165;
const CONTAINER_HEIGHT = 300;

const StyledList = styled(List)(() => ({
	...SCROLLBAR_STYLES,
}));

const PiperVoices = ({
	onChange,
	voices,
}: {
	onChange: (voices: Record<string, string>) => void;
	voices: Record<string, string>;
}) => {
	const { t } = useTranslation();
	const { data } = useGetPiperVoicesQuery();
	const [downloadedModels, setDownloadedModels] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedVoices, setSelectedVoices] = useState<Record<string, string>>(
		{},
	);

	const piperVoices = useMemo(() => (data ? Object.values(data) : []), [data]);

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
						isSelected={selectedVoices[voice.language.family] === voice.key}
						onChange={(checked) => {
							const voices = { ...selectedVoices };

							if (checked) {
								voices[voice.language.family] = voice.key;
							} else {
								delete voices[voice.language.family];
							}

							setSelectedVoices(voices);
							onChange(voices);
						}}
						downloadedModels={downloadedModels}
						setDownloadedModels={setDownloadedModels}
						onRemove={() => {
							const voices = { ...selectedVoices };
							delete voices[voice.language.family];
							setSelectedVoices(voices);
							onChange(voices);
						}}
					/>
				</Box>
			</div>
		);
	};

	useEffect(() => {
		readPipersVoicesDir().then(setDownloadedModels);
	}, []);

	useEffect(() => {
		if (piperVoices.length) {
			const validEntries = Object.entries(voices).filter(([, key]) =>
				piperVoices.some((v) => v.key === key),
			);
			setSelectedVoices(Object.fromEntries(validEntries));
		}
	}, [voices, piperVoices]);

	return (
		<Box sx={{ width: 400 }}>
			<TextField
				fullWidth
				size="small"
				placeholder={t("search_voices")}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				sx={{ mb: 1 }}
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
				{Object.entries(selectedVoices).map(([_, key]) => {
					const voice = piperVoices.find((v) => v.key === key);
					if (!voice) return null;

					return (
						<Chip
							key={key}
							label={voice.name}
							size="small"
							variant="outlined"
						/>
					);
				})}
			</Box>
		</Box>
	);
};
export default PiperVoices;
