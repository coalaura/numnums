import vscode from 'vscode';

import { formatNumber } from './formatter.js';

class HoverProvider {
    provideHover(document, position) {
        // Regular numbers
        {
            const range = document.getWordRangeAtPosition(position, /-?(0x)?\d+(\.\d+)?/),
                word = range && document.getText(range);

            if (word) {
                const isFloat = word.includes('.'),
                    number = isFloat ? parseFloat(word) : parseInt(word);

                return new vscode.Hover(formatNumber(number));
            }
        }

        // Expressions
        {
            const range = document.getWordRangeAtPosition(position, /[\d *+\-\/^().]+/),
                word = range && document.getText(range);

            // Is it a somewhat valid expression?
            if (word && !word.match(/^[^\d]+$|[-+*\/().]{2,}/m)) {
                let result;

                // Try to evaluate the expression
                try {
                    result = evalMath(word);

                    result = result && ('= ' + formatNumber(result));
                } catch (e) { }

                return new vscode.Hover(result || 'Invalid expression');
            }
        }
    }
}

function evalMath(str) {
    return Function(`'use strict'; return (${str})`)()
}

export function registerHoverProvider(context) {
    const provider = new HoverProvider();

    context.subscriptions.push(vscode.languages.registerHoverProvider('*', provider));
}