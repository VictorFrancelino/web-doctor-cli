import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addLog, DiagnosticLevel } from "../../logs";
import { getAttr } from "../utils";

const naturallyFocusableTags = new Set([
  'button',
  'input',
  'select',
  'textarea',
  'details'
]);

function tabIndexRule(currentTag: DomItem, logs: DiagnosticLog[]) {
	const tabIndexValue = getAttr(currentTag, 'tabindex');

	if (tabIndexValue !== null) {
		const numValue = Number(tabIndexValue);

		if (isNaN(numValue)) {
      addLog(logs, {
        type: DiagnosticLevel.ERROR,
        title: 'Invalid TabIndex',
        msg: `The tabindex value '${tabIndexValue}' is invalid. It must be an integer.`
			});

      return;
		}

		if (numValue > 0) {
      addLog(logs, {
        type: DiagnosticLevel.ERROR,
        title: 'Positive TabIndex',
        msg: 'Avoid tabindex > 0. It breaks natural keyboard navigation. Use 0 or -1.'
      });
    }

		if (numValue === 0) {
			const isNaturallyFocusable = naturallyFocusableTags.has(currentTag.tag);
			const isLinkWithHref = currentTag.tag === 'a' &&
				getAttr(currentTag, 'href') !== null;

			if (isNaturallyFocusable || isLinkWithHref) {
				addLog(logs, {
          type: DiagnosticLevel.INFO,
          title: 'Redundant TabIndex',
          msg: `The <${currentTag.tag}> element is naturally focusable. Adding tabindex="0" is redundant and can be removed.`
        });
			}
		}
	}
}

export default tabIndexRule;
