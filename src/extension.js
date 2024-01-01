import { registerHoverProvider } from './hover-provider.js';

let activated = false;

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
	if (activated) return;

	activated = true;

	registerHoverProvider(context);
}

export function deactivate() { }
