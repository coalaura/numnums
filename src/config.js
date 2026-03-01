import vscode from "vscode";

export const config = {
	format: "default",
	locale: "en-US",
	separator: "_",
	precision: 3,
	displayMode: "short",
	durationBaseUnit: "ms",
	lengthBaseUnit: "m",
	unitLabels: "short",
	currencyCode: "USD",
	timestampBaseUnit: "ms",
};

export function updateConfig() {
	const workspaceConfig = vscode.workspace.getConfiguration("numnums");

	config.format = workspaceConfig.get("format", "default");
	config.locale = workspaceConfig.get("locale", vscode.env.language || "en-US");
	config.separator = workspaceConfig.get("separator", "_");
	config.precision = workspaceConfig.get("precision", 2);
	config.displayMode = workspaceConfig.get("displayMode", "short");
	config.durationBaseUnit = workspaceConfig.get("durationBaseUnit", "ms");
	config.lengthBaseUnit = workspaceConfig.get("lengthBaseUnit", "m");
	config.unitLabels = workspaceConfig.get("unitLabels", "short");
	config.currencyCode = workspaceConfig.get("currencyCode", "USD");
	config.timestampBaseUnit = workspaceConfig.get("timestampBaseUnit", "ms");
}

export function watchConfig(context) {
	updateConfig();

	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(e => {
			if (e.affectsConfiguration("numnums")) {
				updateConfig();
			}
		})
	);
}
