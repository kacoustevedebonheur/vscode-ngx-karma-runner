import * as vscode from 'vscode';

import { Config } from './runner-config';
import { quote } from './runner-utils';

export class Runner {

   private terminal: vscode.Terminal | null ;
   private previousCommand: string ;

   constructor(private readonly config: Config) {
     vscode.window.onDidCloseTerminal(() => {
        this.terminal = null;
      });
   }

   async runCurrentFile(options?: string[]) {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return;
        }
    
        await editor.document.save();
    
        const filePath = editor.document.fileName;
        const command = this.buildCommand(filePath.replace(`${this.config.currentWorkspaceFolderPath}/`, ''), options);

         this.previousCommand = command;
         await this.goToCwd();
         await this.runTerminalCommand(command);
   }

   private async goToCwd() {
    if (this.config.changeDirectoryToWorkspaceRoot) {
      await this.runTerminalCommand(`cd ${quote(this.config.cwd)}`);
    }
   }

   private buildCommand(filePath: string,  options?: string[]): string {
        return `${this.config.command} test --include  ${quote(filePath)}`;
   }

   private async runTerminalCommand(command: string) {
    if (!this.terminal) {
      this.terminal = vscode.window.createTerminal('ngxKarmaRunner');
    }
    this.terminal.show(this.config.preserveEditorFocus);
    await vscode.commands.executeCommand('workbench.action.terminal.clear');
    this.terminal.sendText(command);
  }

}