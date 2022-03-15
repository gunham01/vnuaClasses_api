import webdriver, { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";


export class BrowserController {
  public static async openChrome(): Promise<WebDriver> {
    const options = this.setUpChromeDriver();
    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();

    return driver;
  }

  private static setUpChromeDriver(): chrome.Options {
    const options = new chrome.Options();
    options.addArguments("--headless", "--no-sandbox");
    
    chrome.setDefaultService(
      new chrome.ServiceBuilder(process.env.CHROME_DRIVER_PATH).build()
    );

    return options;
  }
}

// type Browser = "chrome" | "edge" | "firefox" | "ie" | "safari";