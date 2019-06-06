
import { Map } from "./Common";


/**
 * Created by qurek on 25.01.2019.
 */
export class ProgramUtils
{
    // constants

    private static readonly OPTIONS : Map<boolean> = {
        'o' : true,
        's' : true,
        'c' : true,
        't' : true,
        'r' : true,
        'f' : true
    };

    // public methods

    public static createOptions( mode ? : string ) : Map<boolean>
    {
        if( mode )
        {
            let options : Map<boolean> = { };

            for( let entry of mode )
            {
                if( this.OPTIONS[ entry ] )
                    options[ entry ] = true;
            }

            return options;
        }
        else
        {
            let options : Map<boolean> = {
                'o' : true,
                's' : true,
                'c' : true,
                't' : true,
                'r' : true,
                'f' : true
            };

            return options;
        }
    }
}
