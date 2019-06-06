(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NameUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Path = require('path');
    let Storage = require('fs');
    const NameUtils_1 = require("./NameUtils");
    class ConfigurationUtils {
        static resolveNamespace(directory, root) {
            let path = Path.relative(directory, root);
            return NameUtils_1.NameUtils.createNamespace(path);
        }
        static concatNamespaces(prefix, postfix) {
            if (prefix) {
                if (postfix)
                    return prefix + '.' + postfix;
                return prefix;
            }
            else {
                if (postfix)
                    return postfix;
                return '';
            }
        }
        static dedicateDeclaration(root, directory, config) {
            if (config) {
                let path = Path.relative(root, directory + '/' + config);
                return path.replace(/\\/g, '/');
            }
            throw new Error('Organizer declaration is not defined.');
        }
        static dedicateNamespace(root, directory, config) {
            let namespace = this.resolveNamespace(directory, root);
            if (config) {
                let mask = config.mask;
                let prefix = config.prefix;
                if (mask) {
                    let expression = new RegExp(mask, 'g');
                    let matches = expression.exec(namespace);
                    if (matches) {
                        let postfix = '';
                        for (let i = 1; i < matches.length; ++i)
                            postfix += matches[i];
                        return this.concatNamespaces(prefix, postfix);
                    }
                }
                return this.concatNamespaces(prefix, namespace);
            }
            return namespace;
        }
        static dedicateOrganizer(path) {
            return Path.basename(path);
        }
        static parseConfiguration(data) {
            let text = data.toString();
            try {
                return JSON.parse(text);
            }
            catch (e) {
                throw new Error('"organizer.config.json" parsing error.');
            }
        }
        static readConfiguration(path, callback) {
            function checkFile(directory) {
                Storage.readFile(directory + '/organizer.config.json', (error, data) => {
                    try {
                        if (error) {
                            let parent = Path.resolve(directory, '..');
                            if (parent == directory)
                                throw new Error('"organizer.config.json" does not exist.');
                            checkFile(parent);
                        }
                        else {
                            let config = ConfigurationUtils.parseConfiguration(data);
                            callback(directory, config);
                        }
                    }
                    catch (e) {
                        console.error(e.message);
                    }
                });
            }
            checkFile(Path.dirname(path));
        }
        static detectConfiguration(path, callback) {
            let root = Path.resolve(path);
            this.readConfiguration(root, (directory, config) => {
                let declaration = this.dedicateDeclaration(root, directory, config.declaration);
                let namespace = this.dedicateNamespace(root, directory, config.namespace);
                let organizer = this.dedicateOrganizer(path);
                if (!NameUtils_1.NameUtils.validateNamespace(namespace))
                    throw new Error('Namespace "' + namespace + '" is incorrect.');
                if (!NameUtils_1.NameUtils.validateOrganizer(organizer))
                    throw new Error('Organizer "' + organizer + '" is incorrect.');
                callback(declaration, namespace, organizer);
            });
        }
    }
    exports.ConfigurationUtils = ConfigurationUtils;
});
//# sourceMappingURL=ConfigurationUtils.js.map