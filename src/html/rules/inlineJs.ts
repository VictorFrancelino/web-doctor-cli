import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addErrorLog } from "../../logs";
import { hasValidAttr } from "../utils";

function inlineJs(currentTag: DomItem, logs: DiagnosticLog[]) {
	const hasInlineJs = hasValidAttr(currentTag, 'on');
	if (hasInlineJs) {
		addErrorLog(logs, {
			title: 'Inline JavaScript',
			msg: 'Avoid \'on...\' attributes. Use addEventListener() in a separate .js file.'
		});
	}
}

export default inlineJs;
