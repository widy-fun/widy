/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
import SearchIcon from "@mui/icons-material/Search";
import {
	Box,
	Chip,
	InputAdornment,
	Skeleton,
	styled,
	TextField,
} from "@mui/material";
import type {
	IFishAudioModel,
	IFishAudioSearchFilter,
	ITtsSettings,
} from "@widy/sdk";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { useGetFishAudioModelsInfiniteQuery } from "../api/fishAudioApi";
import {
	CONTAINER_HEIGHT,
	SCROLLBAR_STYLES,
	TTS_MODELS_HEIGHT,
} from "../constants";
import useDebouncedValue from "../hooks/useDebouncedValue";
import FishAudioModelCard from "./FishAudioModelCard";
import FishAudioModelsFilter from "./FishAudioModelsFilter";

const StyledBox = styled(Box)(() => ({
	...SCROLLBAR_STYLES,
}));

const FishAudioSettings = ({
	onChange,
	tts_settings,
}: {
	onChange: (tts_settings: ITtsSettings) => void;
	tts_settings: ITtsSettings;
}) => {
	const { t } = useTranslation();
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);
	const [searchFilter, setSearchFilter] = useState<IFishAudioSearchFilter>({
		isSearchLanguage: false,
		isSearchTitle: true,
	});
	const [fishTtsSettings, setFishTtsSettings] = useState<IFishAudioModel[]>([]);
	const pattern = debouncedSearchQuery.trim();
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useGetFishAudioModelsInfiniteQuery(
			{
				filter: {
					language:
						pattern && searchFilter.isSearchLanguage ? pattern : undefined,
					title:
						searchQuery && searchFilter.isSearchTitle ? pattern : undefined,
				},
			},
			{
				refetchOnFocus: false,
				refetchOnMountOrArgChange: false,
				refetchOnReconnect: false,
			},
		);

	useEffect(() => {
		setFishTtsSettings((tts_settings as IFishAudioModel[]) ?? []);
	}, [tts_settings]);

	return (
		<Box sx={{ width: 400 }}>
			<Box sx={{ display: "flex" }}>
				<TextField
					fullWidth
					size="small"
					placeholder={t("fish_audio.search_models")}
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
				<div>
					<FishAudioModelsFilter
						searchFilter={searchFilter}
						setSearchFilter={setSearchFilter}
					/>
				</div>
			</Box>
			<StyledBox sx={{ height: CONTAINER_HEIGHT }}>
				{!data?.pages[0].items.length ? (
					<>
						<Skeleton
							variant="rectangular"
							sx={{
								borderRadius: 1,

								marginBottom: "5px",
								height: TTS_MODELS_HEIGHT,
							}}
						/>
						<Skeleton
							variant="rectangular"
							sx={{
								borderRadius: 1,

								marginBottom: "5px",
								height: TTS_MODELS_HEIGHT,
							}}
						/>
					</>
				) : (
					<InfiniteScroll
						loadMore={() => fetchNextPage()}
						hasMore={!isFetchingNextPage && hasNextPage}
						initialLoad={false}
						useWindow={false}
						threshold={3000}
						loader={<div key="loader">{t("loading")}</div>}
					>
						<div>
							{data.pages.map((page) =>
								page.items.map((model) => (
									<Box
										sx={{
											marginBottom: "5px",
										}}
										key={model._id}
									>
										<FishAudioModelCard
											model={model}
											isSelected={
												fishTtsSettings.some((m) => m._id === model._id) ??
												false
											}
											onChange={(checked) => {
												if (checked) {
													setFishTtsSettings((prev) => [...prev, model]);
													onChange([...fishTtsSettings, model]);
												} else {
													const updatedModels = fishTtsSettings.filter(
														(m) => m._id !== model._id,
													);
													setFishTtsSettings(updatedModels);
													onChange(updatedModels);
												}
											}}
										/>
									</Box>
								)),
							)}
						</div>
					</InfiniteScroll>
				)}
			</StyledBox>
			<Box sx={{ margin: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
				{fishTtsSettings.map((model) => (
					<Chip
						key={model._id}
						label={model.title}
						size="small"
						variant="outlined"
						onDelete={() => {
							const updatedModels = fishTtsSettings.filter(
								(m) => m._id !== model._id,
							);
							setFishTtsSettings(updatedModels);
							onChange(updatedModels);
						}}
					/>
				))}
			</Box>
		</Box>
	);
};
export default FishAudioSettings;
