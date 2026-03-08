import type { DiagnosticLog } from "../../logs";
import { addErrorLog } from "../../logs";

function variableDeclarationRules(currentNode: any, logs: DiagnosticLog[]) {
	const hasVar = currentNode.kind === 'var';
	if (hasVar) {
		addErrorLog(logs, {
			title: `Usage of 'var'`,
			msg: `Avoid 'var'. Use 'const' for constants or 'let' for reassignable variables to prevent scope bugs.`
		});
	}
}

export default variableDeclarationRules;
