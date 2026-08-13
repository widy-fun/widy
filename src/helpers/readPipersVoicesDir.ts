import { BaseDirectory, readDir } from "@tauri-apps/plugin-fs";

const readPipersVoicesDir = async () => {
	const dirEntrys = await readDir("piper-voices", {
		baseDir: BaseDirectory.AppLocalData,
	});
	return dirEntrys.map((entry) => entry.name);
};
export default readPipersVoicesDir;
