'use client'
import { useState } from "react";
 interface ItemEditorProps{
    name: string,
    description: string,
    updateList: (name:string, description:string) => void
}

export default function ItemEditor({name, description, updateList}:ItemEditorProps):React.JSX.Element{
    let [taskName, setName] = useState<string>(name);
    let [warningVisible, setWarningVisible] = useState<boolean>(false);
    let [taskDesc, setTaskDesc] = useState<string>(description)

    const addTask = () => {
        if (taskName.length < 1){
            setWarningVisible(true);
        } else {
            setWarningVisible(false);
            updateList(taskName, taskDesc);
        }
    }
    return (
        <div className="flex flex-col w-lg bg-teal-900 p-4 rounded-xl">
            <h1>{name === "" ? "Add" : "Edit"} a Task</h1>
            <div className="grid grid-rows-6 gap-y-4 m-2">
                <input type="text" required={true} value={taskName} contentEditable="true" placeholder="To Do Item" className="bg-gray-900 rounded-md"
                onChange={(e)=>{setName(e.target.value)}}></input>
                <div className="flex flex-col row-span-3">
                    <textarea placeholder="Description" value={taskDesc} contentEditable="true" className="field-sizing-fixed max-h-50 min-h-30 bg-gray-900 rounded-md"
                    onChange={(e)=>{(taskDesc.length < 255 ? setTaskDesc(e.target.value) : e.target.value.length < 255 ? setTaskDesc(e.target.value):setTaskDesc(taskDesc))}}></textarea>
                    <span>{taskDesc.length} / 255</span>
                </div>
                <div>
                    <label htmlFor="dueDate">Due Date:</label>
                    <input type="date" name="dueDate" id="dueDate"className="bg-gray-900 m-2 rounded-sm"></input>
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority" id="priority" className="bg-gray-900 m-2 rounded-sm">
                        <option className="bg-gray-900">None</option>
                        <option className="bg-gray-900">Top</option>
                        <option className="bg-gray-900">High</option>
                        <option className="bg-gray-900">Medium</option>
                        <option className="bg-gray-900">Low</option>
                    </select>
                </div>
                <div className="grid grid-cols-3 gap-x-2">
                    <button  className="bg-gray-900 rounded-md">Add Trophy</button>
                    <button  className="bg-gray-900 rounded-md">Add to Goal</button>
                    <button  className="bg-gray-900 rounded-md">Make Reoccuring</button>
                </div>
            </div>
            <button className="bg-gray-900 p-2 rounded-md w-1/4 place-self-center"
            onClick={addTask}>{name === "" ? "Add" : "Update"}</button>
        </div>
    );
}