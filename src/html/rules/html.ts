import { addErrorLog, type DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { getAttr } from "../utils";

function htmlRules(currentTag: DomItem, logs: DiagnosticLog[]) {
	const hasLangAttr = getAttr(currentTag, 'lang') !== '';
	if (!hasLangAttr) {
		addErrorLog(logs, {
			title: 'Missing \'lang\' attribute',
			msg: 'The <html> tag needs a \'lang\' attribute (e.g., lang="en") for screen readers.'
		});
	}
}

export default htmlRules;
