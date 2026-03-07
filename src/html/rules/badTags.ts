import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addErrorLog } from "../../logs";

const BAD_TAGS = new Set([
	'center',
	'font',
	'marquee',
	'b',
	'blink',
	'i',
	'br',
	'strike',
	'frame'
]);

function badTags(
	currentTag: DomItem,
	points: number,
	logs: DiagnosticLog[]
): number {
	if (BAD_TAGS.has(currentTag.tag)) {
		points--;

		addErrorLog(logs, {
			title: `Obsolete tag detected`,
			msg: `Tag <${currentTag.tag}> is deprecated. Use CSS for styling or semantic HTML5 tags.`
		});
	}

	return points;
}

export default badTags;
