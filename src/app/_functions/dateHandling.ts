export function getToday():string{
    const today:Date = new Date();
    const year:number = today.getFullYear();
    const month:string = String(today.getMonth() + 1).padStart(2, '0'); 
    const day:string = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function reformatDate(date:string):string{
    const dateParts:string[] = date.split("-");
    return `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
}

export function compareDates(date1:string, date2:string):number{
    if (new Date(date1) > new Date(date2)){
        return -1
    } else if (new Date(date1) < new Date(date2)){
        return 1
    }
    return 0;
}
