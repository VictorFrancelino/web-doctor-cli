import type { DomItem } from "./types";
import { type DiagnosticLog } from "../logs";
import {
	badTags, inlineJs, inlineCss, tabIndexRule,
	htmlRules, imgRules, labelRules, inputRules, buttonRules, linkRules
} from './rules';

function calcHtmlPoints(dom: DomItem[]): [number, DiagnosticLog[]] {
	let points = 10;
	const logs: DiagnosticLog[] = [];

	for (let currentTag of dom) {
		points = badTags(currentTag, points, logs);
		points = inlineJs(currentTag, points, logs);
		points = inlineCss(currentTag, points, logs);
		points = tabIndexRule(currentTag, points, logs);

		if (points <= 0) return [0, logs];

		switch (currentTag.tag) {
			case 'html': {
				points = htmlRules(currentTag, points, logs);
				break;
			}
			case 'img': {
				points = imgRules(currentTag, points, logs);
				break;
			}
			case 'label': {
				points = labelRules(currentTag, points, logs);
        break;
			}
			case 'input': {
				points = inputRules(currentTag, points, logs);
        break;
			}
			case 'button': {
				points = buttonRules(currentTag, points, logs);
        break;
			}
			case 'a': {
				points = linkRules(currentTag, points, logs);
        break;
			}
		}

		if (points <= 0) return [0, logs];
  }

	return [Math.max(0, points), logs];
}

export default calcHtmlPoints;
