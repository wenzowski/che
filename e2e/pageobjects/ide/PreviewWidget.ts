import { injectable, inject } from "inversify";
import { CLASSES } from "../../inversify.types";
import { DriverHelper } from "../../utils/DriverHelper";
import { By } from "selenium-webdriver";

/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

@injectable()
export class PreviewWidget{
    constructor(@inject(CLASSES.DriverHelper) private readonly driverHelper: DriverHelper){}

    async waitAndSwitchToWidgetFrame(){
        const iframeLocator: By = By.css('.theia-mini-browser iframe');

        await this.driverHelper.waitAndSwitchToFrame(iframeLocator);
    }

    async waitSpringAvailable(){
        const titleLocator: By = By.xpath('//div[@class=\'container-fluid\']//h2[text()=\'Welcome\']')

        await this.driverHelper.waitVisibility(titleLocator);
    }

}
