import type { DomItem } from "../types";
import { addErrorLog, type DiagnosticLog } from "../../logs";
import { getAttr } from "../utils";

function labelRules(
	currentTag: DomItem,
	points: number,
	logs: DiagnosticLog[]
): number {
	const hasValidFor = getAttr(currentTag, 'for') !== '';
	if (!hasValidFor) {
		points--;

		addErrorLog(logs, {
			title: 'Unlinked <label>',
			msg: 'Labels must have a \'for\' attribute matching an input\'s \'id\'.'
		});
	}

	return points;
}

export default labelRules;
