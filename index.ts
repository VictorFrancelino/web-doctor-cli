#!/usr/bin/env bun

import { cac } from "cac";
import pc from "picocolors";
import { scanDirectory } from "./src/scanner";
import {
	analyzeHtml, parseHtmlToDom,
	analyzeCss, parseCssToAst,
	analyzeJs, parseJsToAst
} from './src';

const cli = cac("web-doctor");

cli
	.command("[dir]", "Scan a directory for HTML, CSS, and JS files.")
	.action(async (dir) => {
		const targetDir = dir || ".";

		console.log(pc.bgGreen(pc.black("Web Doctor")));

		const dirMsg = targetDir === "."
			? "the current directory"
			: `the directory: ${targetDir}`;

		console.log(pc.cyan(`\nStarting the diagnosis in ${dirMsg}.\n`));

		try {
			const files = await scanDirectory(targetDir);
			if (files.length === 0) {
				console.log(pc.red("No HTML, CSS, or JS files were found to parse."));
				return;
			}

			console.log(
				pc.green(
					`Found ${files.length} files for analysis. Starting analysis...`,
				),
			);

			const analysisPromises = files.map(async (f) => {
				try {
					let logs, icon = "";

					if (f.endsWith(".html")) {
						const dom = await parseHtmlToDom(f);
						logs = analyzeHtml(dom);
						icon = "🧱";
					} else if (f.endsWith(".css")) {
						const ast = await parseCssToAst(f);
						logs = analyzeCss(ast);
						icon = "🎨";
					} else if (f.endsWith(".js")) {
						const ast = await parseJsToAst(f);
						logs = analyzeJs(ast);
						icon = "📄";
					}

					return { file: f, logs, icon };
				} catch (e) {
					console.log(pc.red(`❌ Failed to diagnose file: ${f}`));
					return null;
				}
			});

			const results = await Promise.all(analysisPromises);

			for (const result of results) {
				if (result) {
					console.log(pc.bold(pc.cyan(`\n${result.icon} ${result.file}`)));

					if (result.logs && result.logs.length > 0) {
						for (let log of result.logs) {
							console.log(pc.red(`- ${log.title}: ${log.msg}`));
						}
					}
				}
			}
		} catch (e) {
			console.error(pc.red("Error reading directory:"), e);
		}
	});

cli.help();
cli.version("0.5.0");
cli.parse();
