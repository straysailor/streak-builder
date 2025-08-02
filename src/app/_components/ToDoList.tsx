'use client'
import { useState } from "react"
import ListItem from "./ListItem";

export default function ToDoList():React.JSX.Element{
    let [items, setItems] = useState(["Bob", "Bill", "Bea"]);

    let listBody = items.map((item, index) => (
        <ListItem name={item} description="Null" priority={index}></ListItem>
    ));
    return (
    <div className="rounded">
        <h1>To Do List</h1>
        {listBody}
        <button>Add Item</button>
    </div>
    )
}