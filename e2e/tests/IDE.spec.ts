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

const driverHelper: DriverHelper = e2eContainer.get(CLASSES.DriverHelper);
const ide: Ide = e2eContainer.get(CLASSES.Ide);
const projectTree: ProjectTree = e2eContainer.get(CLASSES.ProjectTree);
const topMenu: TopMenu = e2eContainer.get(CLASSES.TopMenu);
const quickOpenContainer: QuickOpenContainer = e2eContainer.get(CLASSES.QuickOpenContainer);
const editor: Editor = e2eContainer.get(CLASSES.Editor);

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

        // await projectTree.expandPathAndOpenFile("spring-petclinic", "build-output.txt");
        // await editor.waitEditorAvailable("build-output.txt");
        // await editor.clickOnTab("build-output.txt");
        // await editor.waitTabFocused("build-output.txt");

        await projectTree.expandPathAndOpenFile("spring-petclinic/src/main/java/org/springframework/samples/petclinic/system", "CacheConfiguration.java");
        await editor.waitEditorAvailable("CacheConfiguration.java");
        await editor.clickOnTab("CacheConfiguration.java");
        await editor.waitTabFocused("CacheConfiguration.java");

        await driverHelper.wait(15000);

        await editor.waitText("hjdgfhjsgfhjsk", 30000, 5000);
        

        // await driverHelper.wait(120000);
    })
})
