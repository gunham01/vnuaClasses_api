import { WebDriver } from 'selenium-webdriver';
import { FileIOUtils } from '../utils/file-io-utils';

export class WebScriptExecutor {
  constructor(private driver: WebDriver) {}

  public async executeScript(scriptLocation: string): Promise<string> {
    const scriptContent = await FileIOUtils.readFile(scriptLocation);
    return this.driver.executeScript(scriptContent);
  }

  public async executeScriptAsync(scriptLocation: string, timeOutInSeconds?: number): Promise<string> {
    if (timeOutInSeconds && timeOutInSeconds > 0) {
      const timeOuts = await this.driver.manage().getTimeouts();
      this.driver.manage().setTimeouts({...timeOuts, ...{script: timeOutInSeconds * 1000}})
    }

    const scriptContent = await FileIOUtils.readFile(scriptLocation);
    return this.driver.executeAsyncScript(scriptContent);
  }
}