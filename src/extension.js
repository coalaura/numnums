import { watchConfig } from "./config.js";
import { registerHoverProvider } from "./hover-provider.js";

let activated = false;

/**
 * @param {import('vscode').ExtensionContext} context
 */
export function activate(context) {
	if (activated) {
		return;
	}
	activated = true;

	watchConfig(context);
	registerHoverProvider(context);
}

export function deactivate() {}
