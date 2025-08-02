'use client'
import { projectUpdate } from "next/dist/build/swc/generated-native";
import { useState } from "react";
 interface ItemEditorProps{
    name: string,
    description: string,
    updateList: (name:string, description:string) => void
}

export default function ItemEditor({name, description, updateList}:ItemEditorProps):React.JSX.Element{
    let [taskName, setName] = useState<string>(name);
    let [taskDesc, setTaskDesc] = useState<string>(description)
    return (
        <div className="grid grid-rows-5 gap-y-8 w-lg bg-teal-900 p-4 rounded-xl">
            <h1>{name === "" ? "Add" : "Edit"} a Task</h1>
            <input type="text" required={true} value={taskName} contentEditable="true" placeholder="To Do Item" className="bg-gray-900 rounded-xl"
             onChange={(e)=>{setName(e.target.value)}}></input>
            <textarea placeholder="Description" value={taskDesc} contentEditable="true" className="field-sizing-fixed bg-gray-900 rounded-xl row-span-2"
            onChange={(e)=>{(taskDesc.length < 255 ? setTaskDesc(e.target.value) : e.target.value.length < 255 ? setTaskDesc(e.target.value):setTaskDesc(taskDesc))}}></textarea>
            <button onClick={()=>{updateList(taskName, taskDesc)}}>{name === "" ? "Add" : "Update"}</button>
        </div>
    );
}