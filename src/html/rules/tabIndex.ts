import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addErrorLog } from "../../logs";
import { getAttr } from "../utils";

function tabIndexRule(currentTag: DomItem, logs: DiagnosticLog[]) {
	const tabIndexValue = getAttr(currentTag, 'tabindex');
	if (tabIndexValue !== undefined && Number(tabIndexValue) > 0) {
		addErrorLog(logs,{
			title: 'Positive TabIndex',
			msg: 'Avoid tabindex > 0. It breaks natural keyboard navigation. Use 0 or -1.'
		});
	}
}

export default tabIndexRule;
