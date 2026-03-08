import type { DiagnosticLog } from "../../logs";
import { addErrorLog } from "../../logs";

function binaryExpressionRules(currentNode: any, logs: DiagnosticLog[]) {
	const hasDoubleEqualExpression = currentNode.operator === '=='
		|| currentNode.operator === '!=';
	if (hasDoubleEqualExpression) {
		addErrorLog(logs, {
			title: 'Loose Equality Operator',
			msg: `Avoid '${currentNode.operator}'. Always use strict equality ('===' or '!==') to prevent type coercion bugs.`
		});
	}
}

export default binaryExpressionRules;
