import type { DiagnosticLog } from "../../logs";
import { addErrorLog } from "../../logs";

function callExpressionRules(currentNode: any, logs: DiagnosticLog[]) {
	const funcName = currentNode.callee?.name;
	if (funcName === 'alert' || funcName === 'eval') {
		addErrorLog(logs, {
			title: `Usage of ${funcName}()`,
			msg: funcName === 'eval'
        ? `Never use 'eval()'. It is a severe security vulnerability.`
        : `Avoid 'alert()'. It blocks the main thread and ruins the User Experience.`
		});
	}
}

export default callExpressionRules;
