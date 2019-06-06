
let Path = require( 'path' );
let Storage = require( 'fs' );

import { NameUtils } from "./NameUtils";


/**
 * Created by qurek on 28.01.2019.
 */
export class ConfigurationUtils
{
    // helper methods

    private static resolveNamespace( directory : string, root : string ) : string
    {
        let path = Path.relative( directory, root );

        return NameUtils.createNamespace( path );
    }

    private static concatNamespaces( prefix ? : string, postfix ? : string ) : string
    {
        if( prefix )
        {
            if( postfix  )
                return prefix + '.' + postfix ;

            return prefix;
        }
        else
        {
            if( postfix  )
                return postfix ;

            return '';
        }
    }

    private static dedicateDeclaration( root : string, directory : string, config ? : any ) : string
    {
        if( config )
        {
            let path = Path.relative( root, directory + '/' + config );

            return path.replace( /\\/g, '/' );
        }

        throw new Error( 'Organizer declaration is not defined.' );
    }

    private static dedicateNamespace( root : string, directory : string, config ? : any ) : string
    {
        let namespace = this.resolveNamespace( directory, root );

        if( config )
        {
            let mask = config.mask;
            let prefix = config.prefix;

            if( mask )
            {
                let expression = new RegExp( mask, 'g' );

                let matches = expression.exec( namespace );

                if( matches )
                {
                    let postfix : string = '';

                    for( let i = 1; i < matches.length; ++i )
                        postfix += matches[ i ];

                    return this.concatNamespaces( prefix, postfix );
                }
            }

            return this.concatNamespaces( prefix, namespace );
        }

        return namespace;
    }

    private static dedicateOrganizer( path : string ) : string
    {
        return Path.basename( path );
    }

    private static parseConfiguration( data : Buffer ) : any
    {
        let text = data.toString();

        try
        {
            return JSON.parse( text );
        }
        catch ( e )
        {
            throw new Error( '"organizer.config.json" parsing error.' );
        }
    }

    // public methods

    public static readConfiguration( path : string, callback : ( directory : string, config : any ) => void ) : void
    {
        function checkFile( directory : string )
        {
            Storage.readFile( directory + '/organizer.config.json', ( error : NodeJS.ErrnoException, data : Buffer ) : void =>
            {
                try
                {
                    if( error )
                    {
                        let parent = Path.resolve( directory, '..' );

                        if( parent == directory )
                            throw new Error( '"organizer.config.json" does not exist.' );

                        checkFile( parent );
                    }
                    else
                    {
                        let config = ConfigurationUtils.parseConfiguration( data );

                        callback( directory, config );
                    }
                }
                catch ( e )
                {
                    console.error( e.message );
                }
            } );
        }

        checkFile( Path.dirname( path ) );
    }

    public static detectConfiguration( path : string, callback : ( declaration : string, namespace : string, organizer : string ) => void ) : void
    {
        let root = Path.resolve( path );

        this.readConfiguration( root, ( directory : string, config : any ) : void =>
        {
            let declaration = this.dedicateDeclaration( root, directory, config.declaration );
            let namespace = this.dedicateNamespace( root, directory, config.namespace );
            let organizer = this.dedicateOrganizer( path );

            if( ! NameUtils.validateNamespace( namespace ) )
                throw new Error( 'Namespace "' + namespace + '" is incorrect.' );

            if( ! NameUtils.validateOrganizer( organizer ) )
                throw new Error( 'Organizer "' + organizer + '" is incorrect.' );

            callback( declaration, namespace, organizer );
        } );
    }
}