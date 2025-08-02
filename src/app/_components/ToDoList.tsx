'use client'
import { useState } from "react"
import ListItem from "./ListItem";

let list_data = [
    {
        name: "Daily Workout",
        description: "3x10 Pushups\n4x30sec Planks\n3x10 Crunches"
    },
    {
        name: "Water plants",
        description: "Basil: Heavy Watering. Thyme & Cactus: Light watering"
    },
    {
        name: "Walk Dog",
        description: "Do it or Fido will destroy the couch again."
    },
]

export default function ToDoList():React.JSX.Element{
    let [items, setItems] = useState(list_data);

    let listBody = items.map((item, index) => (
        <ListItem name={item.name} description={item.description} priority={index}></ListItem>
    ));
    return (
    <div className="grid grid-cols-1 gap-y-8 w-lg place-items-center content-center p-6 bg-teal-700 rounded-xl">
        <h1 className="text-xl">To Do List</h1>
        <div className="grid grid-cols-1 gap-y-3 w-lg place-items-center content-center">
            {listBody}
        </div>
        <button className="bg-gray-900 rounded-md w-xs">Add Item</button>
    </div>
    )
}