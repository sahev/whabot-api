import { BrowserData } from "../sessions/BrowserData";

export class Utils {
  getBrowserData(data: string) {    
    return new BrowserData(BrowserData.dataBrowser).getDataBrowser(BrowserData.dataBrowser, data)
  }
}