
/**
 * Created by qurek on 26.01.2019.
 */
export class StringUtils
{
    // public methods

    public static createL2String( number : number ) : string
    {
        return ( number > 9 ? number.toString() : '0' + number );
    }

    public static createL4String( number : number ) : string
    {
        if ( number > 9 )
        {
            if ( number > 99 )
            {
                if ( number > 999 )
                    return number.toString();

                return '0' + number;
            }

            return '00' + number;
        }

        return '000' + number;
    }
}
