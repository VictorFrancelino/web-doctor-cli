import type { DiagnosticLog } from "../../logs";
import type { PropertiesItem } from "../types";
import { addErrorLog } from "../../logs";

function hasIsImportantFlag(
	currentDeclaration: PropertiesItem, logs: DiagnosticLog[]
) {
	if (currentDeclaration.isImportant) {
		addErrorLog(logs, {
			title: 'Usage of !important',
			msg: `Avoid '!important' on '${currentDeclaration.property}'. It breaks the natural cascade of CSS.`
		});
	}
}

export default hasIsImportantFlag;
