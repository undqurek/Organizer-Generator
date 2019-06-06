
let System = require( 'os' );


/**
 * Created by qurek on 26.01.2019.
 */
export class UserUtils
{
    // public methods

    public static getName() : boolean
    {
        let data = System.userInfo();

        return data.username;
    }
}