import { Box, Button } from "@mui/material";
import { open } from "@tauri-apps/plugin-dialog";
import { readFile } from "@tauri-apps/plugin-fs";
import { showSnackBar } from "@widy/react";
import {
	AlertSeverity,
	type IManifest,
	type SerializedAppError,
} from "@widy/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useAddWidgetMutation } from "../../../../../api/widgetsApi";
import WarningDialog from "../../../../WarningDialog";
import WidgetWarning from "./WidgetWarning";

const AddWidget = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [warningOpen, setWarningOpen] = useState(false);
	const [manifest, setManifest] = useState<IManifest>();
	const [devPath, setDevPath] = useState<string>();
	const [addWidget] = useAddWidgetMutation();

	return (
		<Box>
			{manifest && devPath && (
				<WarningDialog
					open={warningOpen}
					setOpen={setWarningOpen}
					title={t("widgets.add")}
					warning={<WidgetWarning manifest={manifest} />}
					onClick={async () => {
						try {
							await addWidget({ devPath, manifest }).unwrap();
							dispatch(
								showSnackBar({
									message: t("success"),
									alertSeverity: AlertSeverity.success,
								}),
							);
						} catch (error) {
							const err = error as SerializedAppError;
							dispatch(
								showSnackBar({
									message: err.message as string,
									alertSeverity: AlertSeverity.error,
								}),
							);
						}
						setWarningOpen(false);
					}}
				/>
			)}
			<Button
				onClick={() => {
					open({
						multiple: false,
						directory: true,
					}).then((path) => {
						if (!path) return;
						readFile(`${path}/manifest.json`)
							.then((data) => {
								const manifest = JSON.parse(
									new TextDecoder().decode(data),
								) as IManifest;
								setDevPath(path);
								setManifest(manifest);
								setWarningOpen(true);
							})
							.catch(() => {
								dispatch(
									showSnackBar({
										message: t("widgets.invalid_manifest"),
										alertSeverity: AlertSeverity.error,
									}),
								);
							});
					});
				}}
			>
				{t("widgets.add")}
			</Button>
		</Box>
	);
};
export default AddWidget;
