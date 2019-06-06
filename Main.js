(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ProgramUtils", "./TimeUtils", "./UserUtils", "./NameUtils", "./FileUtils", "./ConfigurationUtils", "./StringBuilder"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ProgramUtils_1 = require("./ProgramUtils");
    const TimeUtils_1 = require("./TimeUtils");
    const UserUtils_1 = require("./UserUtils");
    const NameUtils_1 = require("./NameUtils");
    const FileUtils_1 = require("./FileUtils");
    const ConfigurationUtils_1 = require("./ConfigurationUtils");
    const StringBuilder_1 = require("./StringBuilder");
    let args = process.argv;
    let mode = null;
    let path = null;
    if (args.length == 3)
        path = args[2];
    else {
        mode = args[2];
        path = args[3];
    }
    let options = ProgramUtils_1.ProgramUtils.createOptions(mode);
    let user = UserUtils_1.UserUtils.getName();
    let date = TimeUtils_1.TimeUtils.getDate();
    ConfigurationUtils_1.ConfigurationUtils.detectConfiguration(path, (declaration, namespace, organizer) => {
        function createComponent() {
            FileUtils_1.FileUtils.createDirectory(path, () => {
                let object = NameUtils_1.NameUtils.createObject(organizer);
                let variable = NameUtils_1.NameUtils.createVariable(organizer);
                let style = NameUtils_1.NameUtils.createStyle(organizer);
                if (options['o']) {
                    let file = path + '/' + organizer + 'Organizer.ts';
                    function createOrganizer() {
                        let builder = new StringBuilder_1.StringBuilder();
                        builder.appendLine('/// <reference path="' + declaration + '" />');
                        builder.appendLine('/// <reference path="' + object + 'Template.ts" />');
                        builder.appendLine();
                        builder.appendLine();
                        builder.appendLine('/**');
                        builder.appendLine(' * Created by ' + user + ' on ' + date + '.');
                        builder.appendLine(' */');
                        builder.appendLine('namespace ' + namespace);
                        builder.appendLine('{');
                        builder.appendLine('    import organizer = Core.Organizer.organizer;');
                        builder.appendLine('    import Organizer = Core.Organizer.Organizer;');
                        builder.appendLine();
                        builder.appendLine('    @organizer( \'' + object + '\', ' + object + 'Template.TEMPLATE )');
                        builder.appendLine('    export class ' + object + 'Organizer');
                        builder.appendLine('    {');
                        builder.appendLine('        protected complement( organizer : Organizer ) : void // This method is optional.');
                        builder.appendLine('        {');
                        builder.appendLine('            //TODO: custom configuration (services, controllers, templates, etc.)');
                        builder.appendLine('        }');
                        builder.appendLine('    }');
                        builder.appendLine('}');
                        FileUtils_1.FileUtils.createFile(file, builder.toString());
                    }
                    if (options['f'])
                        createOrganizer();
                    else
                        FileUtils_1.FileUtils.checkFile(file, createOrganizer);
                }
                if (options['s']) {
                    let baseFile = path + '/' + object + 'Base.ts';
                    let bodyFile = path + '/' + object + 'Service.ts';
                    function createServiceBase() {
                        let builder = new StringBuilder_1.StringBuilder();
                        builder.appendLine('/// <reference path="' + declaration + '" />');
                        builder.appendLine();
                        builder.appendLine();
                        builder.appendLine('/**');
                        builder.appendLine(' * Created by ' + user + ' on ' + date + '.');
                        builder.appendLine(' */');
                        builder.appendLine('namespace ' + namespace);
                        builder.appendLine('{');
                        builder.appendLine('    export enum ' + object + 'Event');
                        builder.appendLine('    {');
                        builder.appendLine('        CustomObject_onMake = \'CustomObject.onMake\' // ex. User_onLogin = \'User.onLogin\'');
                        builder.appendLine('        //TODO: more events');
                        builder.appendLine('    }');
                        builder.appendLine('}');
                        FileUtils_1.FileUtils.createFile(baseFile, builder.toString());
                    }
                    function createServiceBody() {
                        let builder = new StringBuilder_1.StringBuilder();
                        builder.appendLine('/// <reference path="' + declaration + '" />');
                        builder.appendLine('/// <reference path="' + object + 'Base.ts" />');
                        builder.appendLine();
                        builder.appendLine();
                        builder.appendLine('/**');
                        builder.appendLine(' * Created by ' + user + ' on ' + date + '.');
                        builder.appendLine(' */');
                        builder.appendLine('namespace ' + namespace);
                        builder.appendLine('{');
                        builder.appendLine('    import IAction = Core.IAction;');
                        builder.appendLine('    import Listener = Core.Listener;');
                        builder.appendLine('    import service = Core.Organizer.service;');
                        builder.appendLine('    import injection = Core.Organizer.injection;');
                        builder.appendLine('    import subscription = Core.Organizer.subscription;');
                        builder.appendLine('    import Service = Core.Organizer.Service;');
                        builder.appendLine();
                        builder.appendLine('    @service( \'' + object + '\' )');
                        builder.appendLine('    export class ' + object + 'Service extends Service<' + object + 'Event>');
                        builder.appendLine('    {');
                        builder.appendLine('        // injections');
                        builder.appendLine();
                        builder.appendLine('        // constants');
                        builder.appendLine();
                        builder.appendLine('        // variables');
                        builder.appendLine();
                        builder.appendLine('        private listener : Listener = new Listener();');
                        builder.appendLine();
                        builder.appendLine('        // event methods');
                        builder.appendLine();
                        builder.appendLine('        protected onCreate() : void // This method is optional.');
                        builder.appendLine('        {');
                        builder.appendLine('            //TODO: creating of service objects if it is necessary');
                        builder.appendLine();
                        builder.appendLine('            //this.listener.fire( TestEvent.Custom_onMake );');
                        builder.appendLine('        }');
                        builder.appendLine();
                        builder.appendLine('        protected onDestroy() : void // This method is optional.');
                        builder.appendLine('        {');
                        builder.appendLine('            //TODO: destroying of service objects if it is necessary');
                        builder.appendLine('        }');
                        builder.appendLine();
                        builder.appendLine('        protected onStart() : void // This method is optional.');
                        builder.appendLine('        {');
                        builder.appendLine('            //TODO: staring of service objects if it is necessary');
                        builder.appendLine('        }');
                        builder.appendLine();
                        builder.appendLine('        protected onStop() : void // This method is optional.');
                        builder.appendLine('        {');
                        builder.appendLine('            //TODO: stopping of service objects if it is necessary');
                        builder.appendLine('        }');
                        builder.appendLine();
                        builder.appendLine('        /*');
                        builder.appendLine('        @subscription( \'SomeService\', SomeServiceEvent.Custom_onMake )');
                        builder.appendLine('        private onSomeService_Custom_onMake() : void');
                        builder.appendLine('        {');
                        builder.appendLine('            //TODO: event logic');
                        builder.appendLine('        }');
                        builder.appendLine('        */');
                        builder.appendLine();
                        builder.appendLine('        // helper methods');
                        builder.appendLine();
                        builder.appendLine('        // public methods');
                        builder.appendLine();
                        builder.appendLine('        public addListener( name : ' + object + 'Event, action : Function ) : IAction');
                        builder.appendLine('        {');
                        builder.appendLine('            return this.listener.add( name, action );');
                        builder.appendLine('        }');
                        builder.appendLine();
                        builder.appendLine('        public removeListener( name : ' + object + 'Event, action : Function ) : void');
                        builder.appendLine('        {');
                        builder.appendLine('            this.listener.remove( name, action );');
                        builder.appendLine('        }');
                        builder.appendLine('    }');
                        builder.appendLine('}');
                        FileUtils_1.FileUtils.createFile(bodyFile, builder.toString());
                    }
                    if (options['f']) {
                        createServiceBase();
                        createServiceBody();
                    }
                    else {
                        FileUtils_1.FileUtils.checkFile(baseFile, createServiceBase);
                        FileUtils_1.FileUtils.checkFile(bodyFile, createServiceBody);
                    }
                }
                if (options['c']) {
                    let file = path + '/' + object + 'Controller.ts';
                    function createController() {
                        let builder = new StringBuilder_1.StringBuilder();
                        builder.appendLine('/// <reference path="' + declaration + '" />');
                        builder.appendLine('/// <reference path="' + object + 'Template.ts" />');
                        if (options['s'])
                            builder.appendLine('/// <reference path="' + object + 'Service.ts" />');
                        builder.appendLine();
                        builder.appendLine();
                        builder.appendLine('/**');
                        builder.appendLine(' * Created by ' + user + ' on ' + date + '.');
                        builder.appendLine(' */');
                        builder.appendLine('namespace ' + namespace);
                        builder.appendLine('{');
                        builder.appendLine('    import controller = Core.Organizer.controller;');
                        builder.appendLine('    import injection = Core.Organizer.injection;');
                        builder.appendLine('    import subscription = Core.Organizer.subscription;');
                        builder.appendLine('    import InjectionName = Core.Organizer.InjectionName;');
                        builder.appendLine();
                        builder.appendLine('    @controller( \'' + object + '\' )');
                        builder.appendLine('    export class ' + object + 'Controller extends Super' + object + 'Controller<any>');
                        builder.appendLine('    {');
                        builder.appendLine('        // injections');
                        builder.appendLine();
                        if (options['s']) {
                            builder.appendLine('        @injection( \'' + object + '\' )');
                            builder.appendLine('        private readonly ' + variable + ' : ' + object + 'Service;');
                            builder.appendLine();
                        }
                        builder.appendLine('        // constants');
                        builder.appendLine();
                        builder.appendLine('        // variables');
                        builder.appendLine();
                        builder.appendLine('        // event methods');
                        builder.appendLine();
                        builder.appendLine('        protected onCreate() : void // or \'protected onCreate( index ? : number, data ? : any ) : void\' for loop controllers // This method is optional.');
                        builder.appendLine('        {');
                        builder.appendLine('            //TODO: creating of controller objects if it is necessary');
                        builder.appendLine('        }');
                        builder.appendLine();
                        builder.appendLine('        protected onDestroy() : void // This method is optional.');
                        builder.appendLine('        {');
                        builder.appendLine('            //TODO: destroying of controller objects if it is necessary');
                        builder.appendLine('        }');
                        builder.appendLine();
                        builder.appendLine('        protected onStart() : void // This method is optional.');
                        builder.appendLine('        {');
                        builder.appendLine('            //TODO: staring of controller objects if it is necessary');
                        builder.appendLine('        }');
                        builder.appendLine();
                        builder.appendLine('        protected onStop() : void // This method is optional.');
                        builder.appendLine('        {');
                        builder.appendLine('            //TODO: stopping of controller objects if it is necessary');
                        builder.appendLine('        }');
                        builder.appendLine();
                        builder.appendLine('        /*');
                        builder.appendLine('        @subscription( \'SomeService\', SomeServiceEvent.Custom_onMake )');
                        builder.appendLine('        private onSomeService_Custom_onMake() : void');
                        builder.appendLine('        {');
                        builder.appendLine('            //TODO: event logic');
                        builder.appendLine('        }');
                        builder.appendLine('        */');
                        builder.appendLine();
                        if (options['s']) {
                            builder.appendLine('        @subscription( \'' + object + '\', ' + object + 'Event.CustomObject_onMake )');
                            builder.appendLine('        private on' + object + '_CustomObject_onMake() : void');
                            builder.appendLine('        {');
                            builder.appendLine('            //TODO: event logic');
                            builder.appendLine('        }');
                            builder.appendLine();
                        }
                        builder.appendLine('        // command methods');
                        builder.appendLine();
                        builder.appendLine('        // helper methods');
                        builder.appendLine();
                        builder.appendLine('        // public methods');
                        builder.appendLine('    }');
                        builder.appendLine('}');
                        FileUtils_1.FileUtils.createFile(file, builder.toString());
                    }
                    if (options['f'])
                        createController();
                    else
                        FileUtils_1.FileUtils.checkFile(file, createController);
                }
                if (options['t']) {
                    let file = path + '/' + object + '.template.htm';
                    function createTemplate() {
                        let time = TimeUtils_1.TimeUtils.getMilliseconds();
                        let builder = new StringBuilder_1.StringBuilder();
                        builder.appendLine('namespace ' + namespace);
                        builder.appendLine('reference ' + declaration);
                        builder.appendLine();
                        builder.appendLine();
                        builder.appendLine('<!-- Created by ' + user + ' on ' + date + '. -->');
                        builder.appendLine('<div var-controller="' + object + ' as ' + variable + '" class-id="' + time + '" class="' + style + '-' + time + '">');
                        builder.appendLine('    <!-- TODO: template content -->');
                        builder.appendLine('</div>');
                        FileUtils_1.FileUtils.createFile(file, builder.toString());
                    }
                    if (options['f'])
                        createTemplate();
                    else
                        FileUtils_1.FileUtils.checkFile(file, createTemplate);
                }
            });
        }
        if (options['r'])
            FileUtils_1.FileUtils.removeDirectory(path, createComponent);
        else
            createComponent();
    });
});
//# sourceMappingURL=Main.js.map