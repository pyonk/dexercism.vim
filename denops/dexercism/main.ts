import { Denops } from "https://deno.land/x/denops_std@v3.3.2/mod.ts";
import { echo } from "https://deno.land/x/denops_std@v3.3.2/helper/mod.ts";
import { confirm, execute, expand } from "https://deno.land/x/denops_std@v3.3.2/function/mod.ts";
import { ensureString } from "https://deno.land/x/unknownutil@v1.0.0/mod.ts";

export async function main(denops: Denops): Promise<void> {
	denops.dispatcher = {
		async main(command: unknown, ...args: Array<unknown>) {
			ensureString(command);
			await execute(denops, `call denops#request('${denops.name}', '${command}', ${JSON.stringify(args)})`, "")
		},
		async download(track: unknown, exercise: unknown): Promise<void> {
			ensureString(exercise);
			ensureString(track);
			// run Exercism command
			// e.g.) exercism download --exercise=weather-forecast --track=go
			const res = await execute(denops, `!exercism download --exercise=${exercise} --track=${track}`, "");
			const downloadedDir = (res as string).split('\n').map((line: string) => line).filter((line: string) => line.startsWith('/'))[0];
			await echo(denops, "Download complete")
			const changeDir = await confirm(denops, `Change dir? ${downloadedDir}`, "&Yes\n&No");
			if (changeDir === 1) {
				await execute(denops, `lcd ${downloadedDir} | edit ${downloadedDir}`);
			}
			return
		},
		async submit(path?: unknown): Promise<void> {
			if (path === undefined) {
				path = await expand(denops, "%:p");
			}
			await execute(denops, `!exercism submit ${path}`, "");
		}
	}
	await execute(
		denops, `command! -nargs=* Dexercism call denops#request('${denops.name}', 'main', [<f-args>])`
	)
}
