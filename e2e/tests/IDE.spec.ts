/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { e2eContainer } from "../inversify.config";
import { DriverHelper } from "../utils/DriverHelper";
import { CLASSES } from "../inversify.types";
import { Ide } from "../pageobjects/ide/Ide";
import { ProjectTree } from "../pageobjects/ide/ProjectTree";
import { TopMenu } from "../pageobjects/ide/TopMenu";
import { assert, expect } from "chai";
import { QuickOpenContainer } from "../pageobjects/ide/QuickOpenContainer";
import { Editor } from "../pageobjects/ide/Editor";
import { PreviewWidget } from "../pageobjects/ide/PreviewWidget";
import { GitHubPlugin } from "../pageobjects/ide/GitHubPlugin";

const driverHelper: DriverHelper = e2eContainer.get(CLASSES.DriverHelper);
const ide: Ide = e2eContainer.get(CLASSES.Ide);
const projectTree: ProjectTree = e2eContainer.get(CLASSES.ProjectTree);
const topMenu: TopMenu = e2eContainer.get(CLASSES.TopMenu);
const quickOpenContainer: QuickOpenContainer = e2eContainer.get(CLASSES.QuickOpenContainer);
const editor: Editor = e2eContainer.get(CLASSES.Editor);
const previewWidget: PreviewWidget = e2eContainer.get(CLASSES.PreviewWidget);
const githubPlugin: GitHubPlugin = e2eContainer.get(CLASSES.GitHubPlugin);

const pathToJavaFolder: string = "spring-petclinic/src/main/java/org/springframework/samples/petclinic/system";
const javaFileName: string = "CacheConfiguration.java";
const pathToYamlFolder: string = "spring-petclinic";
const yamlFileName: string = "devfile.yaml";
const expectedGithubChanges: string = "_remote.repositories %3F/.m2/repository/antlr/antlr/2.7.7\n" + "U";

suite("Ide checks", async () => {
    test("Build application", async () => {
        await driverHelper.navigateTo("http://che-che.10.33.177.192.nip.io/dashboard/#/ide/che/spring-petclinic");
        await ide.waitWorkspaceAndIde("che", "spring-petclinic");
        await projectTree.openProjectTreeContainer();
        await projectTree.waitProjectImported("spring-petclinic", "src");
        await projectTree.expandItem("/spring-petclinic");

        // await topMenu.waitTopMenu();
        // await topMenu.clickOnTopMenuButton("Terminal");
        // await topMenu.clickOnSubmenuItem("Run Task...");
        // await quickOpenContainer.clickOnContainerItem("che: build-file-output");

        await projectTree.expandPathAndOpenFile("spring-petclinic", "build-output.txt");
        await editor.waitEditorAvailable("build-output.txt");
        await editor.clickOnTab("build-output.txt");
        await editor.waitTabFocused("build-output.txt");
        await editor.waitSuccessBuildText(20000, 2000);

        // await topMenu.waitTopMenu();
        // await topMenu.clickOnTopMenuButton("Terminal");
        // await topMenu.clickOnSubmenuItem("Run Task...");
        // await quickOpenContainer.clickOnContainerItem("che: run");


        // await ide.waitNotification('A new process is now listening on port 8080');
        // await ide.clickOnNotificationButton('A new process is now listening on port 8080', 'yes');

        // await ide.waitNotification('Redirect is now enabled on port 8080');
        // await ide.clickOnNotificationButton('Redirect is now enabled on port 8080', 'Open Link');
        // await previewWidget.waitAndSwitchToWidgetFrame();
        // await previewWidget.waitSpringAvailable();
        // await ide.waitAndSwitchToIdeFrame();



        await projectTree.expandPathAndOpenFile(pathToYamlFolder, "devfile.yaml");
        await editor.waitEditorAvailable("devfile.yaml");
        await editor.clickOnTab("devfile.yaml");
        await editor.waitTabFocused("devfile.yaml");
        await ide.waitStatusBarContains("Starting Yaml Language Server");
        await ide.waitStatusBarContains("100% Starting Yaml Language Server");
        await ide.waitStatusBarTextAbcence("Starting Yaml Language Server");




        await projectTree.expandPathAndOpenFile(pathToJavaFolder, javaFileName);
        await editor.waitEditorAvailable(javaFileName);
        await editor.clickOnTab(javaFileName);
        await editor.waitTabFocused(javaFileName);
        await ide.waitStatusBarContains("Starting Java Language Server");
        await ide.waitStatusBarContains("100% Starting Java Language Server");
        await ide.waitStatusBarTextAbcence("Starting Java Language Server");





        
        await githubPlugin.openGitHubPluginContainer();
        await githubPlugin.waitChangesPresence(expectedGithubChanges);






        await driverHelper.wait(120000);


    })
})
