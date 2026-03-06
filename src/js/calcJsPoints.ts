import getChildren from "./getChildren";
import { type DiagnosticLog, addErrorLog } from "../logs";

function calcJsPoints(astNode: any): [number, DiagnosticLog[]] {
	let points = 10;
	const logs: DiagnosticLog[] = [];

	function walk(node: any) {
		if (!node) return;

		switch (node.type) {
		case 'AssignmentExpression':
			const hasInnerHtml = node.left?.property?.name === 'innerHTML';
			if (hasInnerHtml) {
				points--;

				addErrorLog(logs, {
					title: 'Usage of innerHTML',
					msg: `Avoid 'innerHTML' due to Cross-Site Scripting (XSS) risks. Use 'textContent' or direct DOM manipulation.`
				});
			}

			break;
		case 'VariableDeclaration':
			const hasVar = node.kind === 'var';
			if (hasVar) {
				points--;

				addErrorLog(logs, {
					title: `Usage of 'var'`,
					msg: `Avoid 'var'. Use 'const' for constants or 'let' for reassignable variables to prevent scope bugs.`
				});
			}

			break;
		case 'CallExpression':
			const funcName = node.callee?.name;
			if (funcName === 'alert' || funcName === 'eval') {
				points -= 2;

				addErrorLog(logs, {
					title: `Usage of ${funcName}()`,
					msg: funcName === 'eval'
            ? `Never use 'eval()'. It is a severe security vulnerability.`
            : `Avoid 'alert()'. It blocks the main thread and ruins the User Experience.`
				});
			}

			break;
		case 'BinaryExpression':
			const hasDoubleEqualExpression = node.operator === '==' || node.operator === '!=';
			if (hasDoubleEqualExpression) {
				points--;

				addErrorLog(logs, {
					title: 'Loose Equality Operator',
					msg: `Avoid '${node.operator}'. Always use strict equality ('===' or '!==') to prevent type coercion bugs.`
				});
			}

			break;
		case 'WithStatement':
			points--;

			addErrorLog(logs, {
				title: `Usage of 'with' Statement`,
				msg: `Never use the 'with' statement. It creates unpredictable scopes and is forbidden in Strict Mode.`
			});

			break;
		case 'BlockStatement':
			const hasNoCodeInBlock = node.body.length === 0
			if (hasNoCodeInBlock) {
				points--;

				addErrorLog(logs, {
					title: 'Empty Block Statement',
					msg: `Remove empty blocks (e.g., empty 'if' or 'function') to keep the code clean and maintainable.`
				});
			}

			break;
		}

		const children = getChildren(node);
		for (let child of children) walk(child);
	}

	walk(astNode);

	return [Math.max(0, points), logs];
}

export default calcJsPoints;
