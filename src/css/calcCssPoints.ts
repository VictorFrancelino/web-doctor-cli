import type { AstItem } from "./types";
import { type DiagnosticLog, addErrorLog } from "../logs";

function calcCssPoints(cssAst: AstItem[]): [number, DiagnosticLog[]] {
	let points = 10;
	const logs: DiagnosticLog[] = [];

	for (let item of cssAst) {
		const selectorHasNoProperties = item.properties.length < 1;
		if (selectorHasNoProperties) {
			points -= 1;

			addErrorLog(logs, {
				title: 'Empty CSS Rule',
				msg: `Remove empty selectors like '${item.selector}' to reduce file size.`
			});
		}

		const hasIdSelector = /#\w+/.test(item.selector);
		if (hasIdSelector) {
			points -= 1;

			addErrorLog(logs, {
				title: 'ID Selector Used',
				msg: `Avoid styling with IDs (like '${item.selector}'). Use classes (.) for better reusability and lower specificity.`
			});
		}

		const selectors = item.selector.split(',');
		for (let selector of selectors) {
			const cleanSelector = selector.trim();
			const result = cleanSelector.match(/\S+/g) || [];
			if (result.length >= 5) {
				points--;

				addErrorLog(logs, {
					title: 'Deeply Nested Selector',
					msg: 'Avoid nesting selectors more than 4 levels deep. It hurts render performance and maintainability.'
				});

				break;
			}
		}

		if (item.selector === "*") {
			const hasHeavyProperty = item.properties.some(declaration => isNotLayoutProperty(declaration.property));
			if (hasHeavyProperty) {
				points -= 1;

				addErrorLog(logs, {
					title: 'Heavy Universal Selector',
					msg: `Avoid expensive properties on the '*' selector. Limit it to layout resets (margin, padding, box-sizing).`
				});
			}
		}

		if (isOverqualifiedSelector(item.selector)) {
			points--;

			addErrorLog(logs, {
				title: 'Overqualified Selector',
				msg: `Avoid attaching tags to classes (e.g., 'div.btn'). Use just the class ('.btn') to keep specificity low.`
			});
		}

		if (points <= 0) return [0, logs];

		for (let declaration of item.properties) {
			if (declaration.isImportant) {
				points -= 1;

				addErrorLog(logs, {
					title: 'Usage of !important',
					msg: `Avoid '!important' on '${declaration.property}'. It breaks the natural cascade of CSS.`
				});
			}

			switch (declaration.property) {
				case "outline":
					if (outlineValueHasNoneOrZero(declaration.value)) {
						points -= 1;

						addErrorLog(logs, {
							title: 'Outline Set to None',
							msg: `Never remove the outline without providing a custom focus state. It breaks keyboard accessibility.`
						});
					}
					break;
				case "color":
					if (colorValueHasLiteralName(declaration.value)) {
						points -= 1;

						addErrorLog(logs, {
							title: 'Literal Color Name',
							msg: `Avoid literal colors like '${declaration.value}'. Use HEX, RGB, HSL, or CSS variables for consistency.`
						});
					}
					break;
				case "z-index":
					if (hasExcessiveZIndex(declaration.value)) {
						points -= 1;

						addErrorLog(logs, {
							title: 'Excessive z-index',
							msg: `Avoid z-index values over 100. Use a structured z-index scale or CSS variables to prevent overlaps.`
						});
					}
					break;
				case "font-size":
					if (isPixelBasedFont(declaration.value)) {
						points -= 1;

						addErrorLog(logs, {
							title: 'Pixel-based Font Size',
							msg: `Use relative units (rem, em) instead of 'px' for font sizes to respect user accessibility settings.`
						});
					}
					break;
			}

			if (points <= 0) return [0, logs];
		}
	}

	return [Math.max(0, points), logs];
}

function colorValueHasLiteralName(value: string) {
	const isHex = value.startsWith("#");
	const isVar = value.startsWith("var");
	const isRgb = value.startsWith("rgb");
	const isHsl = value.startsWith("hsl");
	const isTransparent = value === "transparent";
	const isCurrentColor = value === 'currentColor';
	const isInherit = value === 'inherit';

	return !isHex && !isVar && !isRgb && !isHsl && !isTransparent && !isCurrentColor && !isInherit;
}

function isNotLayoutProperty(property: string) {
	const isMargin = property === "margin";
	const isPadding = property === "padding";
	const isBoxSizing = property === "box-sizing";

	return !isMargin && !isPadding && !isBoxSizing;
}

function outlineValueHasNoneOrZero(value: string) {
	const isNone = value === "none";
	const isZero = value === "0";

	return isNone || isZero;
}

function hasExcessiveZIndex(value: string) {
	return Number(value) > 100;
}

function isPixelBasedFont(value: string) {
	return !value.startsWith('var') && value.includes("px");
}

function isOverqualifiedSelector(value: string) {
	return /(^|\s)[a-zA-Z0-9]+[\.#]/.test(value);
}

export default calcCssPoints;
