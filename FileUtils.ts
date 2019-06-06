
let Storage = require( 'fs' );
let DirectoryCreator = require( 'mkdirp' );
let DirectoryRemover = require( 'rimraf' );

import { Map } from "./Common";


/**
 * Created by qurek on 25.01.2019.
 */
export class FileUtils
{
    // public methods

    public static checkFile( file : string, callback : () => void ) : void
    {
        Storage.exists( file, ( exists : boolean ) : void =>
        {
            try
            {
                if( exists )
                    throw new Error( '"' + file + '" exists.' );

                callback();
            }
            catch ( e )
            {
                console.error( e.message );
            }
        } );
    }

    public static createDirectory( directory : string, callback : () => void ) : void
    {
        DirectoryCreator( directory, ( error : NodeJS.ErrnoException ) : void =>
        {
            try
            {
                if( error )
                    throw new Error( error.message );

                callback();
            }
            catch ( e )
            {
                console.error( e.message );
            }
        } );
    }

    public static createFile( file : string, text : string, callback ? : () => void ) : void
    {
        let options : Map<any> = {
            encoding : 'utf8'
        };

        Storage.writeFile( file, text, options, ( error : NodeJS.ErrnoException ) : void =>
        {
            try
            {
                if( error )
                    throw new Error( error.message );

                if( callback )
                    callback();
            }
            catch ( e )
            {
                console.error( e.message );
            }
        } );
    }

    public static removeDirectory( directory : string, callback : () => void ) : void
    {
        DirectoryRemover( directory, () : void =>
        {
            try
            {
                if( callback )
                    callback();
            }
            catch ( e )
            {
                console.error( e.message );
            }
        } );
    }
}