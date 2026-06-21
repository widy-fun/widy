import { open } from "@tauri-apps/plugin-dialog";
import { BaseDirectory, readFile, writeFile } from "@tauri-apps/plugin-fs";
import getFilenameFromPath from "../utils/getFilenameFromPath";

const selectAndSaveStaticFile = async (
	filters: {
		name: string;
		extensions: string[];
	}[],
) => {
	const path = await open({
		multiple: false,
		directory: false,
		filters,
	});
	if (!path) return;
	const fileName = getFilenameFromPath(path);
	if (!fileName) return;
	const data = await readFile(path);
	await writeFile(`static/${getFilenameFromPath(fileName)}`, data, {
		baseDir: BaseDirectory.AppLocalData,
	});
	return fileName;
};
export default selectAndSaveStaticFile;
