import { BaseDirectory, readDir } from "@tauri-apps/plugin-fs";

const readAppLocalDirEntrys = async (dir: string) => {
	const dirEntrys = await readDir(dir, {
		baseDir: BaseDirectory.AppLocalData,
	});
	return dirEntrys.map((entry) => entry.name);
};
export default readAppLocalDirEntrys;
