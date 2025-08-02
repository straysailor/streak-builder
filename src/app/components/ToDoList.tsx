'use client'
import { useState } from "react"

export default function ToDoList():React.JSX.Element{
    let [items, setItems] = useState(["Bob", "Bill", "Bea"]);

    let listBody = items.map((item, index) => (<div>
        <h1>{item}</h1>
    </div>));
    return (
    <div>
        {listBody}
    </div>
    )
}