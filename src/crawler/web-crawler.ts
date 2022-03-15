import { WebDriver } from "selenium-webdriver";
import { WebElementController } from "./web-element-controller";
import { WebScriptExecutor } from "./web-script-executor";

export class WebCrawler {
  private _elementController: WebElementController;
  private _scriptExecutor: WebScriptExecutor;

  public constructor(private driver: WebDriver) {
    this._elementController = new WebElementController(this.driver);
    this._scriptExecutor = new WebScriptExecutor(this.driver);
  }

  public get scriptExecutor(): WebScriptExecutor {
    return this._scriptExecutor;
  }
  
  public get elementController(): WebElementController {
    return this._elementController;
  }

  public navigateTo(url: string): Promise<void> {
    return this.driver.get(url)
  }

  public async closeAndQuit(): Promise<void> {
    await this.driver.close();
    await this.driver.quit();
  }
}


