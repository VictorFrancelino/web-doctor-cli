export type AstItem = {
	selector: string;
	properties: PropertiesItem[];
}

export type PropertiesItem = {
	property: string;
	value: string;
	isImportant: boolean;
}
