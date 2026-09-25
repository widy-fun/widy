import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
	Box,
	Card,
	CardContent,
	Chip,
	Stack,
	Switch,
	Typography,
} from "@mui/material";
import type { IFishAudioModel } from "@widy/sdk";
import { TTS_MODELS_HEIGHT } from "../constants";

const MAX_LANGUAGE_CHIPS = 2;

const compactNumber = new Intl.NumberFormat(undefined, {
	notation: "compact",
	maximumFractionDigits: 1,
});

const FishAudioModelCard = ({
	model,
	onChange,
	isSelected,
}: {
	model: IFishAudioModel;
	onChange: (checked: boolean) => void;
	isSelected: boolean;
}) => {
	const languages = model.languages ?? [];
	const visibleLanguages = languages.slice(0, MAX_LANGUAGE_CHIPS);
	const hiddenLanguagesCount = languages.length - visibleLanguages.length;

	return (
		<Card sx={{ height: TTS_MODELS_HEIGHT, overflow: "hidden" }}>
			<CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="flex-start"
				>
					<Box sx={{ minWidth: 0 }}>
						<Typography variant="subtitle1" noWrap title={model.title}>
							{model.title}
						</Typography>
						<Typography variant="body2" color="text.secondary" noWrap>
							{model.author?.nickname}
						</Typography>
					</Box>
					<Switch
						checked={isSelected}
						onChange={(_, checked) => onChange(checked)}
					/>
				</Stack>

				<Stack
					direction="row"
					spacing={1}
					flexWrap="wrap"
					useFlexGap
					sx={{ mt: 0.5, mb: 0.5 }}
				>
					{visibleLanguages.map((language) => (
						<Chip
							key={language}
							label={language}
							size="small"
							variant="outlined"
						/>
					))}
					{hiddenLanguagesCount > 0 && (
						<Chip
							label={`+${hiddenLanguagesCount}`}
							size="small"
							variant="outlined"
						/>
					)}
					<Chip
						icon={<FavoriteBorderIcon />}
						label={compactNumber.format(model.like_count)}
						size="small"
						variant="outlined"
					/>
				</Stack>

				{model.description && (
					<Typography
						variant="caption"
						color="text.secondary"
						sx={{
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}}
					>
						{model.description}
					</Typography>
				)}
			</CardContent>
		</Card>
	);
};
export default FishAudioModelCard;
