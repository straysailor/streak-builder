'use client'

import { useState } from "react";
import { ListItemStruct } from "../../../.next/types/listItemType";

function reformatDate(date:string):string{
    const dateParts:string[] = date.split("-");
    return `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
}

interface ListProps {
    item:ListItemStruct,
    editItem: (itemName:string) => void
}
export default function ListItem({item, editItem}:ListProps):React.JSX.Element{
    let [expanded, setExpanded] = useState<boolean>(false);
    let [completed, setCompleted] = useState<boolean>(false);
    const revealDecription = () => {
        setExpanded(!expanded);
    };
    const completeTask = () => {
        setCompleted(!completed);
    }
    return (
        <div>
            <div onClick={revealDecription} className={`flex justify-between w-100 bg-teal-400 p-4 ${expanded ? 'rounded-top' : 'rounded-xl'}`}>
                <h1 className={`${completed ? "line-through" : "no-line-through"}`}>{item.name}</h1>
                <p className={`duration-300 ease-in-out ${expanded ? 'twist':'untwist'}`}>⛛</p>
            </div>
                {expanded  && 
                <div className="grid grid-rows-4 p-4  gap-y-2 bg-teal-900 w-100 rounded-bottom">
                    <div className="flex justify-between row-span-2"> 
                        <div className="max-w-85">
                            <p className="wrap-break-word">{item.description}</p>
                        </div>
                        <div>
                            <input type="checkbox" checked={completed} onChange={completeTask}></input>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p>Date Added: {reformatDate(item.dateAdded)}</p>
                        {(item.dueDate !== "none") && <p>Due Date: {reformatDate(item.dueDate)}</p>}
                        {(item.goal !== "") && <p>Contributes to {item.goal}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-x-2">
                        <button className="bg-gray-900 rounded-md h-10" onClick={()=>{editItem(item.id)}}>Edit Item</button>
                        <button className="bg-gray-900 rounded-md h-10">Remove Item</button>
                    </div>
                </div> }
        </div>
        
    )
}