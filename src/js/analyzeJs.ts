import type { DiagnosticLog } from "../logs";
import {
	assignmentExpressionRules,
	binaryExpressionRules,
	blockStatementRules,
	callExpressionRules,
	variableDeclarationRules,
	withStatementRules
} from './rules';

const childFields: Record<string, string[]> = {
	Program: ['body'],
	BlockStatement: ['body'],
	IfStatement: ['test', 'consequent', 'alternate'],
	ForStatement: ['init', 'test', 'update', 'body'],
	ForInStatement: ['left', 'right', 'body'],
	ForOfStatement: ['left', 'right', 'body'],
	WhileStatement: ['test', 'body'],
	FunctionDeclaration: ['params', 'body'],
	FunctionExpression: ['params', 'body'],
	ArrowFunctionExpression: ['params', 'body'],
	VariableDeclaration: ['declarations'],
	VariableDeclarator: ['init'],
	ExpressionStatement: ['expression'],
	AssignmentExpression: ['left', 'right'],
	BinaryExpression: ['left', 'right'],
	CallExpression: ['callee', 'arguments'],
	MemberExpression: ['object', 'property'],
	ReturnStatement: ['argument'],
	WithStatement: ['object', 'body'],
};

function analyzeJs(astNode: any): DiagnosticLog[] {
	const logs: DiagnosticLog[] = [];

	function walk(node: any) {
		if (!node) return;

		switch (node.type) {
			case 'AssignmentExpression': assignmentExpressionRules(node, logs); break;
			case 'BinaryExpression': binaryExpressionRules(node, logs); break;
			case 'BlockStatement': blockStatementRules(node, logs); break;
			case 'CallExpression': callExpressionRules(node, logs); break;
			case 'VariableDeclaration': variableDeclarationRules(node, logs); break;
			case 'WithStatement': withStatementRules(logs); break;
		}

		const fields = childFields[node.type];
		if (!fields) return;

		for (const field of fields) {
			const child = node[field];
			if (!child) continue;

			if (Array.isArray(child)) {
				for (const item of child) {
					if (item && typeof item.type === 'string') walk(item);
				}
			} else if (typeof child.type === 'string') walk(child);
		}
	}

	walk(astNode);
	return logs;
}

export default analyzeJs;
