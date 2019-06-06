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
    class NameUtils {
        static validateNamespace(namespace) {
            return this.NAMESPACE_REGEX.test(namespace);
        }
        static validateOrganizer(organizer) {
            return this.ORGANIZER_REGEX.test(organizer);
        }
        static createNamespace(directory) {
            let parts = directory.split('\\');
            let names = parts.map((text) => {
                return NameUtils.createObject(text);
            });
            return names.join('.');
        }
        static createObject(organizer) {
            if (organizer.length > 0) {
                let head = organizer.substring(0, 1);
                let body = organizer.substring(1, organizer.length);
                return head.toUpperCase() + body;
            }
            return '';
        }
        static createVariable(organizer) {
            if (organizer.length > 0) {
                let head = organizer.substring(0, 1);
                let body = organizer.substring(1, organizer.length);
                return head.toLowerCase() + body;
            }
            return '';
        }
        static createStyle(organizer) {
            let dash = false;
            let text = '';
            for (let i = 0; i < organizer.length; ++i) {
                let value = organizer[i];
                if (this.HEAD_REGEX.test(value)) {
                    if (dash)
                        text += '-';
                    text += value.toLowerCase();
                    dash = false;
                }
                else {
                    text += value;
                    dash = true;
                }
            }
            return text;
        }
    }
    NameUtils.NAMESPACE_REGEX = /^(?:[_A-Z][_0-9a-z]*)+(?:\.(?:[_A-Z][_0-9a-z]*)+)*$/g;
    NameUtils.ORGANIZER_REGEX = /^(?:[A-Z][0-9a-z]*)+$/g;
    NameUtils.HEAD_REGEX = /[A-Z]/g;
    exports.NameUtils = NameUtils;
});
//# sourceMappingURL=NameUtils.js.map