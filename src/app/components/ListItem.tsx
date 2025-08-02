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
        console.log("I was clicked!")
        setExpanded(!expanded);
    };
    return (
        <div onClick={revealDecription}>
            <h1>{name}</h1>
            {expanded &&
                <div>
                    <p>{description}</p>
                    <p>Date</p>
                </div>
            }
            <p>{priority}</p>
        </div>
    )
}