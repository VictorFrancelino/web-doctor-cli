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

export default colorValueHasLiteralName;
