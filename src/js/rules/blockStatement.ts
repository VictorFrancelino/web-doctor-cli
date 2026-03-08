import type { DiagnosticLog } from "../../logs";
import { addErrorLog } from "../../logs";

function blockStatementRules(currentNode: any, logs: DiagnosticLog[]) {
	const hasNoCodeInBlock = currentNode.body.length === 0
	if (hasNoCodeInBlock) {
		addErrorLog(logs, {
			title: 'Empty Block Statement',
			msg: `Remove empty blocks (e.g., empty 'if' or 'function') to keep the code clean and maintainable.`
		});
	}
}

export default blockStatementRules;
