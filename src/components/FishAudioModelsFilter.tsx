import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Checkbox, FormGroup, IconButton, Menu, MenuItem } from "@mui/material";
import type { IFishAudioSearchFilter } from "@widy/sdk";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

const FishAudioModelsFilter = ({
	searchFilter,
	setSearchFilter,
}: {
	searchFilter: IFishAudioSearchFilter;
	setSearchFilter: Dispatch<SetStateAction<IFishAudioSearchFilter>>;
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { t } = useTranslation();

	return (
		<>
			<div style={{ display: "flex", justifyContent: "flex-end" }}>
				<IconButton onClick={handleClick}>
					<FilterAltIcon></FilterAltIcon>
				</IconButton>
			</div>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<FormGroup>
					<MenuItem onClick={() => setSearchFilter({ isSearchTitle: true })}>
						<div>
							<Checkbox checked={!!searchFilter.isSearchTitle} />
							<span>{t("fish_audio.filter_title")}</span>
						</div>
					</MenuItem>
					<MenuItem onClick={() => setSearchFilter({ isSearchLanguage: true })}>
						<div>
							<Checkbox checked={!!searchFilter.isSearchLanguage} />
							<span>{t("fish_audio.filter_language")}</span>
						</div>
					</MenuItem>
				</FormGroup>
			</Menu>
		</>
	);
};
export default FishAudioModelsFilter;
