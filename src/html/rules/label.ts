import type { DomItem } from "../types";
import { addErrorLog, type DiagnosticLog } from "../../logs";
import { getAttr } from "../utils";

function labelRules(currentTag: DomItem, logs: DiagnosticLog[]) {
	const hasValidFor = getAttr(currentTag, 'for') !== '';
	if (!hasValidFor) {
		addErrorLog(logs, {
			title: 'Unlinked <label>',
			msg: 'Labels must have a \'for\' attribute matching an input\'s \'id\'.'
		});
	}
}

export default labelRules;
