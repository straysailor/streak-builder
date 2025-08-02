'use client'

import { useState } from "react";

interface ListProps {
    name:string,
    description: string,
    priority:number,

}
export default function ListItem({name, description, priority}:ListProps):React.JSX.Element{
    let [expanded, setExpanded] = useState<boolean>(false)
    const revealDecription = () => {
        setExpanded(!expanded);
    };
    return (
        <div>
            <div onClick={revealDecription} className={`flex justify-between w-100 bg-teal-400 p-4 ${expanded ? 'rounded-top' : 'rounded-xl'}`}>
                <h1>{name}</h1>
                <p className={`duration-300 ease-in-out ${expanded ? 'twist':'untwist'}`}>⛛</p>
            </div>
                {expanded  && <div className="grid grid-cols-2 p-4 bg-teal-900 rounded-bottom">
                    <div>
                        <p>{description}</p>
                    </div>
                    <div>
                        <p>Date</p>
                    </div>
                </div> }
        </div>
        
    )
}