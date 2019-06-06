(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let System = require('os');
    class UserUtils {
        static getName() {
            let data = System.userInfo();
            return data.username;
        }
    }
    exports.UserUtils = UserUtils;
});
//# sourceMappingURL=UserUtils.js.map