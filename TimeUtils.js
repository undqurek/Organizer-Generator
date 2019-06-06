(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StringUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const StringUtils_1 = require("./StringUtils");
    class TimeUtils {
        static getDay(date) {
            let day = date.getDate();
            return StringUtils_1.StringUtils.createL2String(day);
        }
        static getMonth(date) {
            let month = date.getMonth() + 1;
            return StringUtils_1.StringUtils.createL2String(month);
        }
        static getYear(date) {
            let year = date.getFullYear();
            return StringUtils_1.StringUtils.createL4String(year);
        }
        static getMilliseconds() {
            let date = new Date();
            return date.getTime();
        }
        static getDate() {
            let date = new Date();
            return this.getDay(date) + '.' + this.getMonth(date) + '.' + this.getYear(date);
        }
    }
    exports.TimeUtils = TimeUtils;
});
//# sourceMappingURL=TimeUtils.js.map