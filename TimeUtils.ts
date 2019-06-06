
import { StringUtils } from "./StringUtils";


/**
 * Created by qurek on 25.01.2019.
 */
export class TimeUtils
{
    // helper methods

    private static getDay( date : Date ) : string
    {
        let day = date.getDate();

        return StringUtils.createL2String( day );
    }

    private static getMonth( date : Date ) : string
    {
        let month = date.getMonth() + 1;

        return StringUtils.createL2String( month );
    }

    private static getYear( date : Date ) : string
    {
        let year = date.getFullYear();

        return StringUtils.createL4String( year );
    }

    // public methods

    public static getMilliseconds() : number
    {
        let date = new Date();

        return date.getTime();
    }

    public static getDate() : string
    {
        let date = new Date();

        return this.getDay( date ) + '.' + this.getMonth( date ) + '.' + this.getYear( date );
    }
}
