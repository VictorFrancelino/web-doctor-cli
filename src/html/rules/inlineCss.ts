import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addErrorLog } from "../../logs";
import { hasValidAttr } from "../utils";

function inlineCss(
	currentTag: DomItem,
	points: number,
	logs: DiagnosticLog[]
): number {
	const hasInlineStyle = hasValidAttr(currentTag, 'style');
	if (hasInlineStyle) {
		points--;

		addErrorLog(logs, {
			title: 'Inline CSS',
			msg: 'Avoid the \'style\' attribute. Use external stylesheets (.css).'
		});
	}

	return points;
}

export default inlineCss;
