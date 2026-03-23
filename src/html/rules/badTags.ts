import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addLog, DiagnosticLevel } from "../../logs";

const BAD_TAGS = new Set([
	'acronym',
	'applet',
	'b',
	'basefont',
	'big',
	'blink',
	'center',
	'dir',
	'font',
	'frame',
	'frameset',
	'i',
	'marquee',
	'noframes',
	'strike',
	'tt'
]);

function badTags(currentTag: DomItem, logs: DiagnosticLog[]) {
	if (BAD_TAGS.has(currentTag.tag)) {
		addLog(logs, {
			type: DiagnosticLevel.WARNING,
			title: `Obsolete tag detected`,
			msg: `Tag <${currentTag.tag}> is deprecated. Use CSS for styling or semantic HTML5 tags.`
		});
	}
}

export default badTags;
