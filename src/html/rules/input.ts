import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addLog, DiagnosticLevel } from "../../logs";
import { getAttr } from "../utils";

function inputRules(currentTag: DomItem, logs: DiagnosticLog[]) {
	const hasId = getAttr(currentTag, 'id') !== '';
	const hasName = getAttr(currentTag, 'name') !== '';
	const typeAttr = getAttr(currentTag, 'type');

	if (!hasId && !hasName) {
		addLog(logs, {
			type: DiagnosticLevel.ERROR,
			title: 'Anonymous <input>',
			msg: 'Inputs need an \'id\' (for labels) or \'name\' (for forms submission).'
		});
	}

	if (typeAttr === null || typeAttr.trim() === '') {
		addLog(logs, {
      type: DiagnosticLevel.INFO,
      title: 'Missing <input> Type',
      msg: 'Always specify a \'type\' attribute (e.g., type="text"). Relying on browser defaults can lead to bugs.'
    });
	} else {
		const typeLower = typeAttr.toLowerCase();

		if (typeLower === 'radio' || typeLower === 'checkbox') {
      const hasValue = getAttr(currentTag, 'value') !== null;
      if (!hasValue) {
        addLog(logs, {
          type: DiagnosticLevel.ERROR,
          title: `Missing Value on ${typeAttr}`,
          msg: `Inputs of type '${typeLower}' must have a 'value' attribute. Otherwise, the server only receives "on".`
        });
			}
		}

		if (typeLower === 'image') {
      const hasAlt = getAttr(currentTag, 'alt') !== null;
      if (!hasAlt) {
        addLog(logs, {
          type: DiagnosticLevel.ERROR,
          title: 'Missing Alt on Image Input',
          msg: 'Inputs of type="image" act as buttons and must have an \'alt\' attribute for screen readers.'
        });
      }
    }
	}
}

export default inputRules;
