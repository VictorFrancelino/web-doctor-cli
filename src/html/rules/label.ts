import type { DomItem } from "../types";
import { addLog, DiagnosticLevel, type DiagnosticLog } from "../../logs";
import { getAttr } from "../utils";

function labelRules(currentTag: DomItem, logs: DiagnosticLog[]) {
	let hasNestedInput = false;

	if (currentTag.children && currentTag.children.length > 0) {
    hasNestedInput = currentTag.children.some(
      child => child.tag === 'input' || child.tag === 'select' || child.tag === 'textarea'
    );
  }

	const hasValidFor = getAttr(currentTag, 'for') !== '';

	if (!hasValidFor && !hasNestedInput) {
		addLog(logs, {
			type: DiagnosticLevel.ERROR,
			title: 'Unlinked <label>',
			msg: 'Labels must have a \'for\' attribute matching an input\'s \'id\', or they must wrap the input element.'
		});
	}

	const hasTextContent = currentTag.content && currentTag.content.trim() !== '';
	const hasAriaLabel = getAttr(currentTag, 'aria-label') !== null;
	const hasContentInside = currentTag.children &&
		currentTag.children.length > 0;

	if (!hasTextContent && !hasAriaLabel && !hasContentInside) {
    addLog(logs, {
      type: DiagnosticLevel.ERROR,
      title: 'Empty <label>',
      msg: 'Labels must contain text to describe the associated input for screen readers.'
    });
  }
}

export default labelRules;
