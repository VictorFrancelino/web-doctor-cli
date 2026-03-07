import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addErrorLog } from "../../logs";
import { getAttr } from "../utils";

function inputRules(
	currentTag: DomItem,
	points: number,
	logs: DiagnosticLog[]
): number {
	const hasId = getAttr(currentTag, 'id') !== '';
	const hasName = getAttr(currentTag, 'name') !== '';
	if (!hasId && !hasName) {
		points--;

		addErrorLog(logs, {
			title: 'Anonymous <input>',
			msg: 'Inputs need an \'id\' (for labels) or \'name\' (for forms).'
		});
	}

	return points;
}

export default inputRules;
