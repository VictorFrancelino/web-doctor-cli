import type { DiagnosticLog } from "../../logs";
import type { AstItem } from "../types";
import { addErrorLog } from "../../logs";

function deeplyNestedSelector(currentItem: AstItem, logs: DiagnosticLog[]) {
	const selectors = currentItem.selector.split(',');
	for (let selector of selectors) {
		const cleanSelector = selector.trim();
		const result = cleanSelector.match(/\S+/g) || [];
		if (result.length >= 5) {
			addErrorLog(logs, {
				title: 'Deeply Nested Selector',
				msg: 'Avoid nesting selectors more than 4 levels deep. It hurts render performance and maintainability.'
			});

			break;
		}
	}
}

export default deeplyNestedSelector;
