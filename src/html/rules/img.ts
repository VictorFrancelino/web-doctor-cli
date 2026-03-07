import type { DomItem } from "../types";
import { addErrorLog, type DiagnosticLog } from "../../logs";
import { getAttr, hasValidAttr } from "../utils";

function imgRules(currentTag: DomItem, logs: DiagnosticLog[]) {
	const hasLoadingLazy = getAttr(currentTag, 'loading') === 'lazy';

	const hasWidth = hasValidAttr(currentTag, 'width');
	const hasHeight = hasValidAttr(currentTag, 'height');
	const hasValidAlt = hasValidAttr(currentTag, 'alt');

	if (!hasLoadingLazy) {
		addErrorLog(logs, {
			title: 'Missing \'loading="lazy"\'',
			msg: 'Add loading="lazy" to images to defer offscreen loading and improve performance.',
		});
	}

	if (!hasWidth || !hasHeight) {
		addErrorLog(logs, {
			title: 'Missing Image Dimensions (CLS)',
			msg: 'Always set explicit \'width\' and \'height\' attributes on <img> tags to prevent Cumulative Layout Shift.'
		});
	}

	if (!hasValidAlt) {
		addErrorLog(logs, {
			title: 'Missing \'alt\' attribute',
			msg: 'Images must have an \'alt\' attribute describing them for accessibility.'
		});
	}
}

export default imgRules;
