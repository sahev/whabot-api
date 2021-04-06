import { saveBrowserData } from "./sessions/saveBrowserData";

export class Utils {
  getBrowserData(data: string) {
    console.log('aqui');
    
    return new saveBrowserData(saveBrowserData.dataBrowser).getDataBrowser(saveBrowserData.dataBrowser, data)
  }
}