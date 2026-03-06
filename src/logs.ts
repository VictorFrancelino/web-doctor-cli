export type DiagnosticLog = {
	title: string;
	msg: string;
}

export function addErrorLog(
	logList: DiagnosticLog[],
	{ title, msg }: DiagnosticLog
): void {
	const logExists = logList.some(log => log.title === title);
	if (!logExists) logList.push({ title, msg });
}
