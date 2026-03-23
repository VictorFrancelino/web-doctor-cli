import { addLog, DiagnosticLevel, type DiagnosticLog } from "../../logs";
import type { DomItem } from "../types";
import { hasChildTag } from "../utils";

function bodyRules(currentTag: DomItem, logs: DiagnosticLog[]) {
	if (currentTag.tag !== 'body') return;

	if (!currentTag.children || currentTag.children.length === 0) {
		addLog(logs, {
      type: DiagnosticLevel.ERROR,
      title: 'Empty Body',
      msg: 'Your <body> tag has no content. A functional webpage needs at least a <main> tag to house its primary content.'
    });

		return;
	}

	const hasHeaderTag = hasChildTag(currentTag, 'header');
	const hasNavTag = hasChildTag(currentTag, 'nav');
	const hasMainTag = hasChildTag(currentTag, 'main');
	const hasSectionTag = hasChildTag(currentTag, 'section');
	const hasFooterTag = hasChildTag(currentTag, 'footer');

	if (!hasHeaderTag) {
		addLog(logs, {
      type: DiagnosticLevel.WARNING,
      title: 'Missing <header>',
      msg: 'Consider adding a <header> tag to group your introductory content or navigation links. This improves SEO and accessibility.'
    });
	}

	if (!hasNavTag) {
		addLog(logs, {
      type: DiagnosticLevel.INFO,
      title: 'No <nav> Landmark',
      msg: 'Using a <nav> tag for your primary menus helps screen readers identify navigation areas quickly.'
    });
	}

	if (!hasMainTag) {
		addLog(logs, {
      type: DiagnosticLevel.ERROR,
      title: 'Missing <main> Landmark',
      msg: 'Your page lacks a <main> tag. This is the most important landmark for search engines and assistive technologies to find your core content.'
    });
	}

	if (!hasSectionTag) {
		addLog(logs, {
      type: DiagnosticLevel.INFO,
      title: 'Lack of Document Sections',
      msg: 'Consider using <section> tags to organize your content into thematic chapters. It makes the HTML structure much cleaner than using <div>.'
    });
	}

	if (!hasFooterTag) {
		addLog(logs, {
      type: DiagnosticLevel.WARNING,
      title: 'Missing <footer>',
      msg: 'Adding a <footer> provides a clear closure to your document, perfect for copyrights, contact info, and secondary links.'
    });
	}
}

export default bodyRules;
