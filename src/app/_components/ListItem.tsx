'use client'

import { useState } from "react";

interface ListProps {
    name:string,
    description: string,
    priority:number,

}
export default function ListItem({name, description, priority}:ListProps):React.JSX.Element{
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
                <h1 className={`${completed ? "line-through" : "no-line-through"}`}>{name}</h1>
                <p className={`duration-300 ease-in-out ${expanded ? 'twist':'untwist'}`}>⛛</p>
            </div>
                {expanded  && <div className="flex justify-between p-4 bg-teal-900 w-100 rounded-bottom">
                    <div className="max-w-85">
                        <p className="wrap-break-word">{description}</p>
                    </div>
                    <div>
                        <input type="checkbox" checked={completed} onChange={completeTask}></input>
                    </div>
                </div> }
        </div>
        
    )
}