import path = require('path');
import * as vscode from 'vscode';

export class Config {

    get angularPath() {
        let ngPath: string | undefined = vscode.workspace.getConfiguration().get('ngxKarmaRunner.ngPath');
        if (ngPath) {
          return ngPath;
        }
    
        // will use the correct binary
        ngPath = "ng";
    
        return ngPath;
    }

    get command(): string {
        return this.angularPath;
    }

    get preserveEditorFocus(): boolean {
        return !!vscode.workspace.getConfiguration().get('ngxKarmaRunner.preserveEditorFocus');
    }

    get changeDirectoryToWorkspaceRoot(): boolean {
        return !!vscode.workspace.getConfiguration().get('ngxKarmaRunner.changeDirectoryToWorkspaceRoot');
    }


    get cwd(): string {
        return (
        vscode.workspace.getConfiguration().get('ngxKarmaRunner.projectPath') ||
        this.currentWorkspaceFolderPath
        );
    }


  public get currentWorkspaceFolderPath(): string  {
    const editor = vscode.window.activeTextEditor;
    return vscode.workspace.getWorkspaceFolder(editor!.document.uri)!.uri.fsPath;
  }

}
 