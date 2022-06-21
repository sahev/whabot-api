"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserData = void 0;
class BrowserData {
    constructor(data) {
        BrowserData.dataBrowser.push(data);
    }
    getDataBrowser(data, clientName) {
        let resp = [];
        data.map((res) => {
            if (res.session === clientName)
                resp = res;
        });
        return resp;
    }
}
exports.BrowserData = BrowserData;
BrowserData.dataBrowser = [];
//# sourceMappingURL=BrowserData.js.map