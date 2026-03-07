import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addErrorLog } from "../../logs";
import { hasValidAttr } from "../utils";

function inlineJs(
	currentTag: DomItem,
	points: number,
	logs: DiagnosticLog[]
): number {
	const hasInlineJs = hasValidAttr(currentTag, 'on');
	if (hasInlineJs) {
		points--;

		addErrorLog(logs, {
			title: 'Inline JavaScript',
			msg: 'Avoid \'on...\' attributes. Use addEventListener() in a separate .js file.'
		});
	}

	return points;
}

export default inlineJs;
