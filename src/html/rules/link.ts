import type { DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { addErrorLog } from "../../logs";
import { getAttr, hasValidAttr } from "../utils";

const GENERIC_LINK_TEXTS = new Set([
	'clique aqui',
	'saiba mais',
	'veja mais',
	'click here',
	'read more'
]);

function linkRules(currentTag: DomItem, logs: DiagnosticLog[]) {
	let hasHref = hasValidAttr(currentTag, 'href');
	let isTargetBlank = getAttr(currentTag, 'target') === '_blank';

	const relAttr = getAttr(currentTag, 'rel') || '';
	const hasSecureRel = relAttr.includes('noopener')
		|| relAttr.includes('noreferrer');
	const hasAriaLabel = hasValidAttr(currentTag, 'aria-label');

	if (!hasHref) {
		addErrorLog(logs, {
			title: 'Missing \'href\' attribute',
			msg: 'Links (<a>) must have an \'href\'. Use <button> for JS clicks.'
		});
	}

	if (isTargetBlank && !hasSecureRel) {
		addErrorLog(logs, {
			title: 'Unsafe target="_blank"',
			msg: 'Add rel="noopener noreferrer" to prevent security vulnerabilities.'
		});
	}

	const linkText = (currentTag.content || '').toLowerCase().trim();
	const isGenericText = GENERIC_LINK_TEXTS.has(linkText);
	const isEmpty = linkText === '';

	if ((isGenericText || isEmpty) && !hasAriaLabel) {
		addErrorLog(logs, {
			title: 'Poor Link Text',
			msg: 'Avoid generic text like \'click here\' or empty links. Use descriptive text or an \'aria-label\'.'
		});
	}
}

export default linkRules;
