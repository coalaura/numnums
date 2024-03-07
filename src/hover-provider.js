import vscode from 'vscode';

import { formatNumber } from './formatter.js';

class HoverProvider {
    provideHover(document, position) {
        // Regular numbers
        {
            const range = document.getWordRangeAtPosition(position, /-?(0x)?(\d+_?)+(\.\d+)?/),
                word = range && document.getText(range).replace(/_/g, '');

            if (word) {
                const isFloat = word.includes('.'),
                    number = isFloat ? parseFloat(word) : parseInt(word);

                return new vscode.Hover(formatNumber(number));
            }
        }

        // Expressions
        {
            const range = document.getWordRangeAtPosition(position, /[\d_ *+\-\/^().]+/),
                word = range && document.getText(range).replace(/_/g, ''),
                expression = word && findExpressionInString(word);

            // Is it a valid expression?
            if (expression) {
                let result;

                // Try to evaluate the expression
                try {
                    result = evalMath(expression);

                    result = result && formatNumber(result);
                } catch (e) { }

                return new vscode.Hover(`${expression} = ${result || 'invalid'}`);
            }
        }
    }
}

function evalMath(str) {
    return Function(`'use strict'; return (${str})`)()
}

function findExpressionInString(str) {
    let exp = '',
        started = false,
        brackets = 0;

    for (const char of str) {
        if (char.match(/[ _]/)) continue;

        if (!started) {
            // Expression must start with a number or a bracket or a minus sign
            if (!char.match(/[\d(-]/)) continue;

            started = true;
        }

        if (char.match(/[\d.\-+*\/^]/)) {
            exp += char;
        } else if (char === '(') {
            brackets++;
            exp += char;
        } else if (char === ')') {
            brackets--;

            // If we're out of brackets, return the expression
            if (brackets < 0) break;

            exp += char;
        }
    }

    // Trim any starting + signs
    exp = exp.replace(/(?<=^|\()\++/m, '');

    // Is is just a simple number wrapped in brackets?
    if (exp.match(/^(\(+)?\d+(\.\d+)?(\)+)?$/)) {
        return false;
    }

    // If the expression starts or ends with an operator or has more than 2 consecutive operators, it's invalid
    if (exp.match(/^[*\/.^_]|[*\/.^_]{2}|[*\/.^_+-]$/m)) {
        return false;
    }

    // Space out the operators for easier reading
    exp = exp.replace(/(?<=\d)[+*\/^-](?=\d)/g, ' $& ');

    return exp;
}

export function registerHoverProvider(context) {
    const provider = new HoverProvider();

    context.subscriptions.push(vscode.languages.registerHoverProvider('*', provider));
}