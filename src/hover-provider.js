import vscode from 'vscode';

import { formatNumber } from './formatter.js';

class HoverProvider {
    provideHover(document, position) {
        const range = document.getWordRangeAtPosition(position, /(0x)?\d+(\.\d+)?/),
            word = range && document.getText(range);

        if (!word) return;

        const isFloat = word.includes('.'),
            number = isFloat ? parseFloat(word) : parseInt(word);

        return new vscode.Hover(formatNumber(number));
    }
}

export function registerHoverProvider(context) {
    const provider = new HoverProvider();

    context.subscriptions.push(vscode.languages.registerHoverProvider('*', provider));
}