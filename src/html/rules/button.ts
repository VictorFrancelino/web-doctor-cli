import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addLog, DiagnosticLevel } from "../../logs";
import { getAttr } from "../utils";

function buttonRules(currentTag: DomItem, logs: DiagnosticLog[]) {
	const typeAttr = getAttr(currentTag, 'type');

	if (!typeAttr) {
		addLog(logs, {
			type: DiagnosticLevel.ERROR,
			title: 'Untyped <button>',
			msg: 'Always define type="button" or type="submit" to prevent form bugs.'
		});
	} else {
		const validTypes = ['button', 'submit', 'reset'];
		if (!validTypes.includes(typeAttr.toLowerCase())) {
			addLog(logs, {
        type: DiagnosticLevel.ERROR,
        title: 'Invalid Button Type',
        msg: `The type '${typeAttr}' is invalid. Use 'button', 'submit', or 'reset'.`
      });
		}
	}

	const hasTextContent = currentTag.content && currentTag.content.trim() !== '';
	const hasAriaLabel = getAttr(currentTag, 'aria-label') !== '';
	if (!hasTextContent && !hasAriaLabel) {
		const hasAltInside = currentTag.children?.some(
			child => child.tag === 'img' && getAttr(child, 'alt')?.trim() !== ''
		);

		if (!hasAltInside) {
			addLog(logs, {
				type: DiagnosticLevel.ERROR,
				title: 'Empty Button',
				msg: 'Buttons without text must have an \'aria-label\' or an internal image with \'alt\' for screen readers.'
			});
		}
	}

	if (currentTag.children && currentTag.children.length > 0) {
		const hasNestedLink = currentTag.children.some(child => child.tag === 'a');
		if (hasNestedLink) {
      addLog(logs, {
        type: DiagnosticLevel.ERROR,
        title: 'Link Inside Button',
        msg: 'Never nest an <a> tag inside a <button>. It violates HTML specs and breaks screen readers.'
      });
    }
	}
}

export default buttonRules;
