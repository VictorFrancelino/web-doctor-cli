import type { DomItem } from "./types";

export function getAttr(tag: DomItem, attrName: string): string | null {
	const attr = tag.attributes.find(a => a.name === attrName);
	return attr ? attr.value.trim() : null;
}

export function hasValidAttr(tag: DomItem, attrName: string): boolean {
	const val = getAttr(tag, attrName);
	return val !== null && val !== '';
}
