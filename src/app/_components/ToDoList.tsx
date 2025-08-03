'use client'
import { useState } from "react"
import ListItem from "./ListItem";
import ItemEditor from "./ItemEditor";
import { ListItemStruct } from "../../../.next/types/listItemType";

let list_data = [
    {
        id:crypto.randomUUID(),
        name: "Daily Workout",
        description: "3x10 Pushups\n4x30sec Planks\n3x10 Crunches",
        dateAdded: "2025-03-01",
        dueDate: "none",
        goal: "Getting Buff",
        reoccuring: true,
        trophy: false,
        priority: 2
    },
    {
        id:crypto.randomUUID(),
        name: "Math Homework",
        description: "Set of 30 Matrix operations",
        dateAdded: "2025-07-21",
        dueDate: "2025-07-31",
        goal: "",
        reoccuring: false,
        trophy: false,
        priority: 4
    },
    {
        id:crypto.randomUUID(),
        name: "Walk Dog",
        description: "Do it or Fido will destroy the couch again.",
        dateAdded: "2025-01-03",
        dueDate: "none",
        goal: "",
        reoccuring: true,
        trophy: false,
        priority: 3
    },
]
const blankItem:ListItemStruct = {
    id: "0000",
    name:"",
    description: "",
    dateAdded: "none",
    dueDate:  "none",
    trophy: false,
    goal: "",
    reoccuring: false,
    priority: 0,
}
export default function ToDoList():React.JSX.Element{
    let [items, setItems] = useState<ListItemStruct[]>(list_data);
    let [editorOpen, setEditorOpen] = useState<boolean>(false);
    let [editorValues, setEditorValues] = useState<ListItemStruct>(blankItem);

    const toggleEditor = () => {
        setEditorValues(blankItem);
        setEditorOpen(!editorOpen);
    }

    const updateList = (newItem:ListItemStruct) => {
        if (newItem.id === "0000"){
            setItems([...items, {...newItem, id:crypto.randomUUID()}]);
        } else {
            const newItems = items.filter((item)=>item.id !== newItem.id);
            setItems([...newItems, {...newItem}]);
        }
    }
    const editListItem = (itemID:string) => {
        let itemNumber = items.findIndex((item)=>item.id === itemID);
        if (itemNumber !== -1){
            setEditorValues(items[itemNumber]);
            setEditorOpen(true);
        }
    }

    let listBody = items.map((listItem, index) => (
        <ListItem item={listItem} editItem={editListItem}></ListItem>
    ));

    return (
    <div className={`grid ${editorOpen ? "grid-cols-2" : "grid-cols-1"}`}>
        <div className="grid grid-cols-1 gap-y-8 w-lg place-items-center content-center p-6 bg-teal-700 rounded-xl">
            <h1 className="text-xl">To Do List</h1>
            <div className="grid grid-cols-1 gap-y-3 w-lg place-items-center content-center">
                {listBody}
            </div>
            <button className="bg-gray-900 rounded-md w-xs" onClick={toggleEditor}>{editorOpen ? "Cancel" : "Add Item"}</button>
        </div>
        {editorOpen && 
        <div>
            <ItemEditor item={editorValues} updateList={updateList}></ItemEditor>
        </div>
        }
    </div>

    )
}