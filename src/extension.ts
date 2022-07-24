import * as vscode from 'vscode';

import { Config, Runner } from './runner';

export function activate(context: vscode.ExtensionContext) {

	const config = new Config();
	const runner = new Runner(config);

	const runCurrentFile = vscode.commands.registerCommand('extension.runCurrentFile', async () => runner.runCurrentFile());

	context.subscriptions.push(runCurrentFile);
}

export function deactivate() {}
