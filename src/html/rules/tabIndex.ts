import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addErrorLog } from "../../logs";
import { getAttr } from "../utils";

function tabIndexRule(
	currentTag: DomItem,
	points: number,
	logs: DiagnosticLog[]
): number {
	const tabIndexValue = getAttr(currentTag, 'tabindex');
	if (tabIndexValue !== undefined && Number(tabIndexValue) > 0) {
		points--;

		addErrorLog(logs,{
			title: 'Positive TabIndex',
			msg: 'Avoid tabindex > 0. It breaks natural keyboard navigation. Use 0 or -1.'
		});
	}

	return points;
}

export default tabIndexRule;
