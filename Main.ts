/// <reference path="node.d.ts" />


import { ProgramUtils } from "./ProgramUtils";
import { TimeUtils } from './TimeUtils';
import { UserUtils } from "./UserUtils";
import { NameUtils } from './NameUtils';
import { FileUtils } from "./FileUtils";
import { ConfigurationUtils } from "./ConfigurationUtils";
import { StringBuilder } from './StringBuilder';


let args = process.argv;

let mode = null;
let path = null;

if( args.length == 3 )
    path = args[ 2 ];

else
{
    mode = args[ 2 ];
    path = args[ 3 ];
}


let options = ProgramUtils.createOptions( mode );

let user = UserUtils.getName();
let date = TimeUtils.getDate();


ConfigurationUtils.detectConfiguration( path, ( declaration : string, namespace : string, organizer : string ) : void =>
{
    function createComponent() : void
    {
        FileUtils.createDirectory( path, () : void =>
        {
            let object = NameUtils.createObject( organizer );
            let variable = NameUtils.createVariable( organizer );
            let style = NameUtils.createStyle( organizer );

            // --- organizer

            if( options[ 'o' ] )
            {
                let file = path + '/' + organizer + 'Organizer.ts';

                function createOrganizer() : void
                {
                    let builder = new StringBuilder();

                    builder.appendLine( '/// <reference path="' + declaration + '" />' );
                    builder.appendLine( '/// <reference path="' + object + 'Template.ts" />' );
                    builder.appendLine();
                    builder.appendLine();
                    builder.appendLine( '/**' );
                    builder.appendLine( ' * Created by ' + user + ' on ' + date + '.' );
                    builder.appendLine( ' */' );
                    builder.appendLine( 'namespace ' + namespace );
                    builder.appendLine( '{' );
                    builder.appendLine( '    import organizer = Core.Organizer.organizer;' );
                    builder.appendLine( '    import Organizer = Core.Organizer.Organizer;' );
                    builder.appendLine();
                    builder.appendLine( '    @organizer( \'' + object + '\', ' + object + 'Template.TEMPLATE )' );
                    builder.appendLine( '    export class ' + object + 'Organizer' );
                    builder.appendLine( '    {' );
                    builder.appendLine( '        protected complement( organizer : Organizer ) : void // This method is optional.' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            //TODO: custom configuration (services, controllers, templates, etc.)' );
                    builder.appendLine( '        }' );
                    builder.appendLine( '    }' );
                    builder.appendLine( '}' );

                    FileUtils.createFile( file, builder.toString() );
                }

                if( options[ 'f' ] )
                    createOrganizer();

                else
                    FileUtils.checkFile( file, createOrganizer );
            }

            // --- service

            if( options[ 's' ] )
            {
                let baseFile = path + '/' + object + 'Base.ts';
                let bodyFile = path + '/' + object + 'Service.ts';

                function createServiceBase() : void
                {
                    let builder = new StringBuilder();

                    builder.appendLine( '/// <reference path="' + declaration + '" />' );
                    builder.appendLine();
                    builder.appendLine();
                    builder.appendLine( '/**' );
                    builder.appendLine( ' * Created by ' + user + ' on ' + date + '.' );
                    builder.appendLine( ' */' );
                    builder.appendLine( 'namespace ' + namespace );
                    builder.appendLine( '{' );
                    builder.appendLine( '    export enum ' + object + 'Event' );
                    builder.appendLine( '    {' );
                    builder.appendLine( '        CustomObject_onMake = \'CustomObject.onMake\' // ex. User_onLogin = \'User.onLogin\'' );
                    builder.appendLine( '        //TODO: more events' );
                    builder.appendLine( '    }' );
                    builder.appendLine( '}' );

                    FileUtils.createFile( baseFile, builder.toString() );
                }

                function createServiceBody() : void
                {
                    let builder = new StringBuilder();

                    builder.appendLine( '/// <reference path="' + declaration + '" />' );
                    builder.appendLine( '/// <reference path="' + object + 'Base.ts" />' );
                    builder.appendLine();
                    builder.appendLine();
                    builder.appendLine( '/**' );
                    builder.appendLine( ' * Created by ' + user + ' on ' + date + '.' );
                    builder.appendLine( ' */' );
                    builder.appendLine( 'namespace ' + namespace );
                    builder.appendLine( '{' );
                    builder.appendLine( '    import IAction = Core.IAction;' );
                    builder.appendLine( '    import Listener = Core.Listener;' );
                    builder.appendLine( '    import service = Core.Organizer.service;' );
                    builder.appendLine( '    import injection = Core.Organizer.injection;' );
                    builder.appendLine( '    import subscription = Core.Organizer.subscription;' );
                    builder.appendLine( '    import Service = Core.Organizer.Service;' );
                    builder.appendLine();
                    builder.appendLine( '    @service( \'' + object + '\' )' );
                    builder.appendLine( '    export class ' + object + 'Service extends Service<' + object + 'Event>' );
                    builder.appendLine( '    {' );
                    builder.appendLine( '        // injections' );
                    builder.appendLine();
                    builder.appendLine( '        // constants' );
                    builder.appendLine();
                    builder.appendLine( '        // variables' );
                    builder.appendLine();
                    builder.appendLine( '        private listener : Listener = new Listener();' );
                    builder.appendLine();
                    builder.appendLine( '        // event methods' );
                    builder.appendLine();
                    builder.appendLine( '        protected onCreate() : void // This method is optional.' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            //TODO: creating of service objects if it is necessary' );
                    builder.appendLine();
                    builder.appendLine( '            //this.listener.fire( TestEvent.Custom_onMake );');
                    builder.appendLine( '        }' );
                    builder.appendLine();
                    builder.appendLine( '        protected onDestroy() : void // This method is optional.' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            //TODO: destroying of service objects if it is necessary' );
                    builder.appendLine( '        }' );
                    builder.appendLine();
                    builder.appendLine( '        protected onStart() : void // This method is optional.' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            //TODO: staring of service objects if it is necessary' );
                    builder.appendLine( '        }' );
                    builder.appendLine();
                    builder.appendLine( '        protected onStop() : void // This method is optional.' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            //TODO: stopping of service objects if it is necessary' );
                    builder.appendLine( '        }' );
                    builder.appendLine();
                    builder.appendLine( '        /*' );
                    builder.appendLine( '        @subscription( \'SomeService\', SomeServiceEvent.Custom_onMake )' );
                    builder.appendLine( '        private onSomeService_Custom_onMake() : void' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            //TODO: event logic' );
                    builder.appendLine( '        }' );
                    builder.appendLine( '        */' );
                    builder.appendLine();
                    builder.appendLine( '        // helper methods' );
                    builder.appendLine();
                    builder.appendLine( '        // public methods' );
                    builder.appendLine();
                    builder.appendLine( '        public addListener( name : ' + object + 'Event, action : Function ) : IAction' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            return this.listener.add( name, action );' );
                    builder.appendLine( '        }' );
                    builder.appendLine();
                    builder.appendLine( '        public removeListener( name : ' + object + 'Event, action : Function ) : void' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            this.listener.remove( name, action );' );
                    builder.appendLine( '        }' );
                    builder.appendLine( '    }' );
                    builder.appendLine( '}' );

                    FileUtils.createFile( bodyFile, builder.toString() );
                }

                if( options[ 'f' ] )
                {
                    createServiceBase();
                    createServiceBody();
                }

                else
                {
                    FileUtils.checkFile( baseFile, createServiceBase );
                    FileUtils.checkFile( bodyFile, createServiceBody );
                }
            }

            // --- controller

            if( options[ 'c' ] )
            {
                let file = path + '/' + object + 'Controller.ts';

                function createController() : void
                {
                    let builder = new StringBuilder();

                    builder.appendLine( '/// <reference path="' + declaration + '" />' );
                    builder.appendLine( '/// <reference path="' + object + 'Template.ts" />' );

                    if( options[ 's' ] )
                        builder.appendLine( '/// <reference path="' + object + 'Service.ts" />' );

                    builder.appendLine();
                    builder.appendLine();
                    builder.appendLine( '/**' );
                    builder.appendLine( ' * Created by ' + user + ' on ' + date + '.' );
                    builder.appendLine( ' */' );
                    builder.appendLine( 'namespace ' + namespace );
                    builder.appendLine( '{' );
                    builder.appendLine( '    import controller = Core.Organizer.controller;' );
                    builder.appendLine( '    import injection = Core.Organizer.injection;' );
                    builder.appendLine( '    import subscription = Core.Organizer.subscription;' );
                    builder.appendLine( '    import InjectionName = Core.Organizer.InjectionName;' );
                    builder.appendLine();
                    builder.appendLine( '    @controller( \'' + object + '\' )' );
                    builder.appendLine( '    export class ' + object + 'Controller extends Super' + object + 'Controller<any>' );
                    builder.appendLine( '    {' );
                    builder.appendLine( '        // injections' );
                    builder.appendLine();

                    if( options[ 's' ] )
                    {
                        builder.appendLine( '        @injection( \'' + object + '\' )' );
                        builder.appendLine( '        private readonly ' + variable + ' : ' + object + 'Service;' );
                        builder.appendLine();
                    }

                    builder.appendLine( '        // constants' );
                    builder.appendLine();
                    builder.appendLine( '        // variables' );
                    builder.appendLine();
                    builder.appendLine( '        // event methods' );
                    builder.appendLine();
                    builder.appendLine( '        protected onCreate() : void // or \'protected onCreate( index ? : number, data ? : any ) : void\' for loop controllers // This method is optional.' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            //TODO: creating of controller objects if it is necessary' );
                    builder.appendLine( '        }' );
                    builder.appendLine();
                    builder.appendLine( '        protected onDestroy() : void // This method is optional.' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            //TODO: destroying of controller objects if it is necessary' );
                    builder.appendLine( '        }' );
                    builder.appendLine();
                    builder.appendLine( '        protected onStart() : void // This method is optional.' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            //TODO: staring of controller objects if it is necessary' );
                    builder.appendLine( '        }' );
                    builder.appendLine();
                    builder.appendLine( '        protected onStop() : void // This method is optional.' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            //TODO: stopping of controller objects if it is necessary' );
                    builder.appendLine( '        }' );
                    builder.appendLine();
                    builder.appendLine( '        /*' );
                    builder.appendLine( '        @subscription( \'SomeService\', SomeServiceEvent.Custom_onMake )' );
                    builder.appendLine( '        private onSomeService_Custom_onMake() : void' );
                    builder.appendLine( '        {' );
                    builder.appendLine( '            //TODO: event logic' );
                    builder.appendLine( '        }' );
                    builder.appendLine( '        */' );
                    builder.appendLine();

                    if( options[ 's' ] )
                    {
                        builder.appendLine( '        @subscription( \'' + object + '\', ' + object + 'Event.CustomObject_onMake )' );
                        builder.appendLine( '        private on' + object + '_CustomObject_onMake() : void' );
                        builder.appendLine( '        {' );
                        builder.appendLine( '            //TODO: event logic' );
                        builder.appendLine( '        }' );
                        builder.appendLine();
                    }

                    builder.appendLine( '        // command methods' );
                    builder.appendLine();
                    builder.appendLine( '        // helper methods' );
                    builder.appendLine();
                    builder.appendLine( '        // public methods' );
                    builder.appendLine( '    }' );
                    builder.appendLine( '}' );

                    FileUtils.createFile( file, builder.toString() );
                }

                if( options[ 'f' ] )
                    createController();

                else
                    FileUtils.checkFile( file, createController );
            }

            // --- template

            if( options[ 't' ] )
            {
                let file = path + '/' + object + '.template.htm';

                function createTemplate() : void
                {
                    let time = TimeUtils.getMilliseconds();

                    let builder = new StringBuilder();

                    builder.appendLine( 'namespace ' + namespace );
                    builder.appendLine( 'reference ' + declaration );
                    builder.appendLine();
                    builder.appendLine();
                    builder.appendLine( '<!-- Created by ' + user + ' on ' + date + '. -->' );
                    builder.appendLine( '<div var-controller="' + object + ' as ' + variable + '" class-id="' + time + '" class="' + style + '-' + time + '">' );
                    builder.appendLine( '    <!-- TODO: template content -->' );
                    builder.appendLine( '</div>' );

                    FileUtils.createFile( file, builder.toString() );
                }

                if( options[ 'f' ] )
                    createTemplate();

                else
                    FileUtils.checkFile( file, createTemplate );
            }
        } );
    }

    if( options[ 'r' ] )
        FileUtils.removeDirectory( path, createComponent );

    else
        createComponent();
} );
