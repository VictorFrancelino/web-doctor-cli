import type { DiagnosticLog } from "../../logs";
import { addErrorLog } from "../../logs";

function withStatementRules(logs: DiagnosticLog[]) {
	addErrorLog(logs, {
		title: `Usage of 'with' Statement`,
		msg: `Never use the 'with' statement. It creates unpredictable scopes and is forbidden in Strict Mode.`
	});
}

export default withStatementRules;
