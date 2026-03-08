import getChildren from "./getChildren";
import type { DiagnosticLog } from "../logs";
import {
	assignmentExpressionRules,
	binaryExpressionRules,
	blockStatementRules,
	callExpressionRules,
	variableDeclarationRules,
	withStatementRules
} from './rules';

function analyzeJs(astNode: any): DiagnosticLog[] {
	const logs: DiagnosticLog[] = [];

	function walk(node: any) {
		if (!node) return;

		switch (node.type) {
			case 'AssignmentExpression': {
				assignmentExpressionRules(node, logs);
				break;
			}
			case 'BinaryExpression': {
				binaryExpressionRules(node, logs);
				break;
			}
			case 'BlockStatement': {
				blockStatementRules(node, logs);
				break;
			}
			case 'CallExpression': {
				callExpressionRules(node, logs);
				break;
			}
			case 'VariableDeclaration': {
				variableDeclarationRules(node, logs);
				break;
			}
			case 'WithStatement': {
				withStatementRules(logs);
				break;
			}
		}

		const children = getChildren(node);
		for (let child of children) walk(child);
	}

	walk(astNode);

	return logs;
}

export default analyzeJs;
