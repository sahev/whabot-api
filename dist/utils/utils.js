"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const BrowserData_1 = require("../sessions/BrowserData");
class Utils {
    getBrowserData(data) {
        return new BrowserData_1.BrowserData(BrowserData_1.BrowserData.dataBrowser).getDataBrowser(BrowserData_1.BrowserData.dataBrowser, data);
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map