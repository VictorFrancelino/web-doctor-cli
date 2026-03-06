import type { DomItem } from "./types";
import { type DiagnosticLog, addErrorLog } from "../logs";

const BAD_TAGS = new Set([
	'center',
	'font',
	'marquee',
	'b',
	'blink',
	'i',
	'br',
	'strike',
	'frame'
]);

const GENERIC_LINK_TEXTS = new Set([
	'clique aqui',
	'saiba mais',
	'veja mais',
	'click here',
	'read more'
]);

function calcHtmlPoints(dom: DomItem[]): [number, DiagnosticLog[]] {
	let points = 10;
	const logs: DiagnosticLog[] = [];

  for (let currentTag of dom) {
		if (BAD_TAGS.has(currentTag.tag)) {
			points--;

			addErrorLog(logs, {
				title: `Obsolete tag detected`,
				msg: `Tag <${currentTag.tag}> is deprecated. Use CSS for styling or semantic HTML5 tags.`
			});
		}

		const hasInlineJs = currentTag.attributes.some(
			attr => attr.name.startsWith('on')
		);
		if (hasInlineJs) {
			points--;

			addErrorLog(logs, {
				title: 'Inline JavaScript',
				msg: 'Avoid \'on...\' attributes. Use addEventListener() in a separate .js file.'
			});
		}

		const hasInlineStyle = currentTag.attributes.some(
			attr => attr.name === 'style'
		);
		if (hasInlineStyle) {
			points--;

			addErrorLog(logs, {
				title: 'Inline CSS',
				msg: 'Avoid the \'style\' attribute. Use external stylesheets (.css).'
			});
		}

		const tabIndexAttr = currentTag.attributes.find(
			attr => attr.name === 'tabindex'
		);
		if (tabIndexAttr && Number(tabIndexAttr.value) > 0) {
			points--;

			addErrorLog(logs,{
				title: 'Positive TabIndex',
				msg: 'Avoid tabindex > 0. It breaks natural keyboard navigation. Use 0 or -1.'
			});
		}

		switch (currentTag.tag) {
			case 'html': {
				const hasLangAttr = currentTag.attributes.some(
					attr => attr.name === 'lang' && attr.value.trim() !== ''
				);
				if (!hasLangAttr) {
					points--;

					addErrorLog(logs, {
						title: 'Missing \'lang\' attribute',
						msg: 'The <html> tag needs a \'lang\' attribute (e.g., lang="en") for screen readers.'
					});
				}

				break;
			}
			case 'img': {
				const hasValidAlt = currentTag.attributes.some(
					attr => attr.name === 'alt' && attr.value.trim() !== ''
				);
				if (!hasValidAlt) {
					points--;

					addErrorLog(logs, {
						title: 'Missing \'alt\' attribute',
						msg: 'Images must have an \'alt\' attribute describing them for accessibility.'
					});
				}

        break;
			}
			case 'label': {
				const hasValidFor = currentTag.attributes.some(
					attr => attr.name === 'for' && attr.value.trim() !== ''
				);
				if (!hasValidFor) {
					points--;

					addErrorLog(logs, {
						title: 'Unlinked <label>',
						msg: 'Labels must have a \'for\' attribute matching an input\'s \'id\'.'
					});
				}

        break;
			}
			case 'input': {
				const hasIdOrName = currentTag.attributes.some(
					attr =>
						(attr.name === 'id' || attr.name === 'name') &&
						attr.value.trim() !== ''
				);
				if (!hasIdOrName) {
					points--;

					addErrorLog(logs, {
						title: 'Anonymous <input>',
						msg: 'Inputs need an \'id\' (for labels) or \'name\' (for forms).'
					});
				}

        break;
			}
			case 'button': {
				const hasValidType = currentTag.attributes.some(
					attr => attr.name === 'type' && attr.value.trim() !== ''
				);
				if (!hasValidType) {
					points--;

					addErrorLog(logs, {
						title: 'Untyped <button>',
						msg: 'Always define type="button" or type="submit" to prevent form bugs.'
					});
				}

				const hasTextContent =
					currentTag.content && currentTag.content.trim() !== '';
				const hasAriaLabel = currentTag.attributes.some(
					attr => attr.name === 'aria-label' && attr.value.trim() !== ''
				);
				if (!hasTextContent && !hasAriaLabel) {
					points--;

					addErrorLog(logs, {
						title: 'Empty Button',
						msg: 'Buttons without text must have an \'aria-label\' for screen readers.'
					});
				}

        break;
			}
			case 'a': {
				let hasHref = false;
				let isTargetBlank = false;
				let hasSecureRel = false;
				let hasAriaLabel = false;

				for (const attr of currentTag.attributes) {
					if (attr.name === 'href' && attr.value.trim() !== '') hasHref = true;

					if (
						attr.name === 'target' && attr.value === '_blank'
					) isTargetBlank = true;

					if (
						attr.name === 'rel' &&
						(
							attr.value.includes('noopener') ||
							attr.value.includes('noreferrer')
						)
					) hasSecureRel = true;

					if (
						attr.name === 'aria-label' && attr.value.trim() !== ''
					) hasAriaLabel = true;
				}

				if (!hasHref) {
					points--;

					addErrorLog(logs, {
						title: 'Missing \'href\' attribute',
						msg: 'Links (<a>) must have an \'href\'.Use<button> for JS clicks.'
					});
				}
				if (isTargetBlank && !hasSecureRel) {
					points--;

					addErrorLog(logs, {
						title: 'Unsafe target="_blank"',
						msg: 'Add rel="noopener noreferrer" to prevent security vulnerabilities.'
					});
				}

				const linkText = (currentTag.content || '').toLowerCase().trim();
				const isGenericText = GENERIC_LINK_TEXTS.has(linkText);
				const isEmpty = linkText === '';

				if ((isGenericText || isEmpty) && !hasAriaLabel) {
					points--;

					addErrorLog(logs, {
						title: 'Poor Link Text',
						msg: 'Avoid generic text like \'click here\' or empty links. Use descriptive text or an \'aria-label\'.'
					});
				}

        break;
			}
		}

		if (points <= 0) return [0, logs];
  }

	return [Math.max(0, points), logs];
}

export default calcHtmlPoints;
