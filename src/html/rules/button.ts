import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addErrorLog } from "../../logs";
import { getAttr } from "../utils";

function buttonRules(currentTag: DomItem, logs: DiagnosticLog[]) {
	const hasValidType = getAttr(currentTag, 'type') !== '';
	if (!hasValidType) {
		addErrorLog(logs, {
			title: 'Untyped <button>',
			msg: 'Always define type="button" or type="submit" to prevent form bugs.'
		});
	}

	const hasTextContent = currentTag.content
		&& currentTag.content.trim() !== '';
	const hasAriaLabel = getAttr(currentTag, 'aria-label') !== '';
	if (!hasTextContent && !hasAriaLabel) {
		addErrorLog(logs, {
			title: 'Empty Button',
			msg: 'Buttons without text must have an \'aria-label\' for screen readers.'
		});
	}
}

export default buttonRules;
