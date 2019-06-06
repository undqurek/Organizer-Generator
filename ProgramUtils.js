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
    class ProgramUtils {
        static createOptions(mode) {
            if (mode) {
                let options = {};
                for (let entry of mode) {
                    if (this.OPTIONS[entry])
                        options[entry] = true;
                }
                return options;
            }
            else {
                let options = {
                    'o': true,
                    's': true,
                    'c': true,
                    't': true,
                    'r': true,
                    'f': true
                };
                return options;
            }
        }
    }
    ProgramUtils.OPTIONS = {
        'o': true,
        's': true,
        'c': true,
        't': true,
        'r': true,
        'f': true
    };
    exports.ProgramUtils = ProgramUtils;
});
//# sourceMappingURL=ProgramUtils.js.map