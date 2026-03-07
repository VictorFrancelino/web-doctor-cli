import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addErrorLog } from "../../logs";
import { hasValidAttr } from "../utils";

function inlineCss(currentTag: DomItem, logs: DiagnosticLog[]) {
	const hasInlineStyle = hasValidAttr(currentTag, 'style');
	if (hasInlineStyle) {
		addErrorLog(logs, {
			title: 'Inline CSS',
			msg: 'Avoid the \'style\' attribute. Use external stylesheets (.css).'
		});
	}
}

export default inlineCss;
