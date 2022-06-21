export class BrowserData {
  static dataBrowser: any = [];

  constructor(data: object) {
    BrowserData.dataBrowser.push(data);
  }

  getDataBrowser(data: any, clientName: any) {
    let resp = [];
    data.map((res) => {      
      if (res.session === clientName) resp = res;
    });
    return resp;
  }
}

