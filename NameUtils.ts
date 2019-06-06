
/**
 * Created by qurek on 25.01.2019.
 */
export class NameUtils
{
    // constants

    private static readonly NAMESPACE_REGEX : RegExp = /^(?:[_A-Z][_0-9a-z]*)+(?:\.(?:[_A-Z][_0-9a-z]*)+)*$/g;
    private static readonly ORGANIZER_REGEX : RegExp = /^(?:[A-Z][0-9a-z]*)+$/g;

    private static readonly HEAD_REGEX : RegExp = /[A-Z]/g;

    // public methods

    public static validateNamespace( namespace : string ) : boolean
    {
        return this.NAMESPACE_REGEX.test( namespace );
    }

    public static validateOrganizer( organizer : string ) : boolean
    {
        return this.ORGANIZER_REGEX.test( organizer );
    }

    public static createNamespace( directory : string ) : string
    {
        let parts = directory.split( '\\' );

        let names = parts.map( ( text : string ) : string =>
        {
            return NameUtils.createObject( text );
        } );

        return names.join( '.' );
    }

    public static createObject( organizer : string ) : string
    {
        if( organizer.length > 0 )
        {
            let head = organizer.substring( 0, 1 );
            let body = organizer.substring( 1, organizer.length );

            return head.toUpperCase() + body;
        }

        return '';
    }

    public static createVariable( organizer : string ) : string
    {
        if( organizer.length > 0 )
        {
            let head = organizer.substring( 0, 1 );
            let body = organizer.substring( 1, organizer.length );

            return head.toLowerCase() + body;
        }

        return '';
    }

    public static createStyle( organizer : string ) : string
    {
        let dash : boolean = false;
        let text : string = '';

        for( let i = 0; i < organizer.length; ++i )
        {
            let value =  organizer[ i ];

            if( this.HEAD_REGEX.test( value ) )
            {
                if( dash )
                    text += '-';

                text += value.toLowerCase();

                dash = false;
            }
            else
            {
                text += value;

                dash = true;
            }
        }

        return text;
    }
}