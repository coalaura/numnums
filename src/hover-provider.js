import vscode from "vscode";
import { formatNumber } from "./formatter.js";

const numberRgx = /-?(?:0x[0-9a-fA-F_]+|0o[0-7_]+|0b[01_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)/,
	expressionRgx = /[\d_ *+\-/^().]+/;

class HoverProvider {
	provideHover(document, position) {
		const expRange = document.getWordRangeAtPosition(position, expressionRgx);

		if (expRange) {
			const word = document.getText(expRange).replace(/_/g, ""),
				expression = findExpressionInString(word);

			if (expression) {
				try {
					const result = evalMath(expression);

					if (typeof result === "number" && !Number.isNaN(result)) {
						const formatted = formatNumber(result);

						return new vscode.Hover(new vscode.MarkdownString(`**${expression}** = \`${formatted}\``));
					}
				} catch {}
			}
		}

		const numRange = document.getWordRangeAtPosition(position, numberRgx);

		if (numRange) {
			const word = document.getText(numRange).replace(/_/g, "");

			let value;

			// If it's a pure integer (no decimal, no scientific 'e'), parse as exact BigInt
			if (/^-?(?:0x[0-9a-fA-F]+|0o[0-7]+|0b[01]+|\d+)$/i.test(word)) {
				value = BigInt(word);
			} else {
				value = Number(word);
			}

			if (value !== null && !Number.isNaN(value)) {
				const formatted = formatNumber(value);

				return new vscode.Hover(new vscode.MarkdownString(`\`${formatted}\``));
			}
		}

		return null;
	}
}

function evalMath(str) {
	// JS evaluates "^" as bitwise XOR, replace with "**" for exponentiation
	const sanitized = str.replace(/\^/g, "**");

	return Function(`'use strict'; return (${sanitized})`)();
}

function findExpressionInString(str) {
	let exp = "",
		started = false,
		brackets = 0;

	for (const char of str) {
		if (char === " " || char === "_") {
			continue;
		}

		if (!started) {
			if (!/[\d(-]/.test(char)) {
				continue;
			}

			started = true;
		}

		if (/[\d.\-+*/^]/.test(char)) {
			exp += char;
		} else if (char === "(") {
			brackets++;

			exp += char;
		} else if (char === ")") {
			brackets--;

			if (brackets < 0) {
				break;
			}

			exp += char;
		}
	}

	if (brackets > 0) {
		return false;
	}

	exp = exp.replace(/(?<=^|\()\++/m, "");

	// simple number wrapped in brackets?
	if (/^(\(+)?\d+(\.\d+)?(\)+)?$/.test(exp)) {
		return false;
	}

	// invalid bounds or multiple operators
	if (/^[*/.^_]|[*/.^_]{2}|[*/.^_+-]$/m.test(exp)) {
		return false;
	}

	// must contain at least one number
	if (!/\d/.test(exp)) {
		return false;
	}

	// space out operators for visually pleasing output
	exp = exp.replace(/(?<=\d)[+*/^-](?=\d)/g, " $& ");

	return exp;
}

export function registerHoverProvider(context) {
	const provider = new HoverProvider();

	context.subscriptions.push(vscode.languages.registerHoverProvider("*", provider));
}
