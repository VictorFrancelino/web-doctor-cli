import type { DiagnosticLog } from "../../logs";
import { addErrorLog } from "../../logs";

function assignmentExpressionRules(currentNode: any, logs: DiagnosticLog[]) {
	const hasInnerHtml = currentNode.left?.property?.name === 'innerHTML';
	if (hasInnerHtml) {
		addErrorLog(logs, {
			title: 'Usage of innerHTML',
			msg: `Avoid 'innerHTML' due to Cross-Site Scripting (XSS) risks. Use 'textContent' or direct DOM manipulation.`
		});
	}
}

export default assignmentExpressionRules;
