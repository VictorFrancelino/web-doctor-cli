import type { AstItem } from "../types";
import { addErrorLog, type DiagnosticLog } from "../../logs";

function hasNoProperties(currentItem: AstItem, logs: DiagnosticLog[]) {
	const selectorHasNoProperties = currentItem.properties.length < 1;
	if (selectorHasNoProperties) {
		addErrorLog(logs, {
			title: 'Empty CSS Rule',
			msg: `Remove empty selectors like '${currentItem.selector}' to reduce file size.`
		});
	}
}

export default hasNoProperties;
