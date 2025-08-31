/**
 * @function getToday
 * @returns {string} a string containing today's date formatted as 'YYYY-MM-DD'
 */
export function getToday():string{
    const today:Date = new Date();
    const year:number = today.getFullYear();
    const month:string = String(today.getMonth() + 1).padStart(2, '0'); 
    const day:string = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * @function reformatDate
 * @param date a string containing a date formatted as 'YYYY-MM-DD'
 * @returns a string containing a date formatted as 'MM-DD-YYYY'
 */
export function reformatDate(date:string):string{
    const dateParts:string[] = date.split("-");
    return `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
}

/**
 * 
 * @param date1 a string containing a date, formatted 'YYYY-MM-DD'
 * @param date2 a string containing a date, formatted 'YYYY-MM-DD'
 * @returns {number} -1 if date1 is later than date2 |
 * 1 if date1 is sooner than date2 |
 * 0 if the dates are the same
 */
export function compareDates(date1:string, date2:string):number{
    if (new Date(date1) > new Date(date2)){
        return -1
    } else if (new Date(date1) < new Date(date2)){
        return 1
    }
    return 0;
}
