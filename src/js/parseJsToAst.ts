import { parse } from "meriyah";

async function parseJsToAst(path: string) {
	const code = await Bun.file(path).text();
	return parse(code, { next: true, module: true });
}

export default parseJsToAst;
