import { Alert, By, until, WebDriver, WebElement } from "selenium-webdriver";

export class WebElementController { 
  constructor(private driver: WebDriver) {}

  public async getAcceptMessageIfExistAndAcceptIt(): Promise<string | null> {
    let alert: Alert;
    try {
        alert = await this.driver.switchTo().alert();
    } catch (err) {
        return null;
    }
    
    const alertMessage = await alert.getText();
    alert.accept();
    return alertMessage;
}

public getElementById(id: string, timeOutInSeconds?: number): Promise<WebElement> {
    if (timeOutInSeconds && timeOutInSeconds > 0) {
        return this.waitElementPresence(id, timeOutInSeconds);
    }

    return this.driver.findElement(By.id(id));
}

private async waitElementPresence(id: string, timeOutInSeconds: number): Promise<WebElement> {
    const desiredElement = await this.driver.findElement(By.id(id));
    return await this.driver.wait(until.elementIsVisible(desiredElement), timeOutInSeconds);
}

public async checkIfElementNotExists(id: string): Promise<boolean> {
    return (await this.driver.findElements(By.id(id))).length === 0;
}
}