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
    let Storage = require('fs');
    let DirectoryCreator = require('mkdirp');
    let DirectoryRemover = require('rimraf');
    class FileUtils {
        static checkFile(file, callback) {
            Storage.exists(file, (exists) => {
                try {
                    if (exists)
                        throw new Error('"' + file + '" exists.');
                    callback();
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        }
        static createDirectory(directory, callback) {
            DirectoryCreator(directory, (error) => {
                try {
                    if (error)
                        throw new Error(error.message);
                    callback();
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        }
        static createFile(file, text, callback) {
            let options = {
                encoding: 'utf8'
            };
            Storage.writeFile(file, text, options, (error) => {
                try {
                    if (error)
                        throw new Error(error.message);
                    if (callback)
                        callback();
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        }
        static removeDirectory(directory, callback) {
            DirectoryRemover(directory, () => {
                try {
                    if (callback)
                        callback();
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        }
    }
    exports.FileUtils = FileUtils;
});
//# sourceMappingURL=FileUtils.js.map