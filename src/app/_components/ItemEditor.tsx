'use client'
import { useState } from "react";
import { ListItemStruct } from "../_types/listItemType";
import { getToday } from "../_functions/dateHandling";
 interface ItemEditorProps{
    item:ListItemStruct,
    updateList: (newItem:ListItemStruct) => void,
    closeEditor: ()=>void
}


export default function ItemEditor({item, updateList, closeEditor}:ItemEditorProps):React.JSX.Element{
    let [taskName, setName] = useState<string>(item.name);
    let [taskDesc, setTaskDesc] = useState<string>(item.description);
    let [taskDueDate, setTaskDueDate] = useState<string>(item.dueDate);
    let [taskGoal, setTaskGoal] = useState<string>(item.goal);
    let [taskReoccuring, setReoccuring] = useState<boolean>(item.reoccuring);
    let [taskPriority, setPriority] = useState<number>(item.priority);
    let [taskTrophy, setTrophy] = useState<boolean>(item.trophy);
    let [warningVisible, setWarningVisible] = useState<boolean>(false);


    const addTask = () => {
        if (taskName.length < 1){
            setWarningVisible(true);
        } else {
            setWarningVisible(false);
            const newTask:ListItemStruct = {
                id: item.id,
                name:taskName,
                description: taskDesc,
                dueDate: (taskDueDate === "mm/dd/yyyy" ? "none": taskDueDate),
                dateAdded: (item.dateAdded === "none" ? getToday() : item.dateAdded),
                goal: taskGoal,
                reoccuring: taskReoccuring,
                priority: taskPriority,
                trophy:taskTrophy,
                completed: false,
            }
            updateList(newTask);
        }
    }
    return (
        <div className="flex flex-col w-lg bg-teal-900 p-4 rounded-xl">
            <div className="flex flex-row justify-between">
                <h1>{item.name === "" ? "Add" : "Edit"} a Task</h1>
                <button className="text-lg font-bold" onClick={closeEditor}>×</button>
            </div>
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
                    <input type="date" name="dueDate" id="dueDate" value={taskDueDate} onChange={(e) => {setTaskDueDate(e.target.value)}} className="bg-gray-900 m-2 rounded-sm"></input>
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority" id="priority" value={taskPriority} onChange={(e) => {setPriority(Number(e.target.value))}} className="bg-gray-900 m-2 rounded-sm">
                        <option className="bg-gray-900" id="0" value="0">None</option>
                        <option className="bg-gray-900" id="4" value="4">Top</option>
                        <option className="bg-gray-900" id="3" value="3">High</option>
                        <option className="bg-gray-900" id="2" value="2">Medium</option>
                        <option className="bg-gray-900" id="1" value="1" >Low</option>
                    </select>
                </div>
                {/* <div className="grid grid-cols-3 gap-x-2">
                    <button  className="bg-gray-900 rounded-md" onClick={()=>{setTrophy(!taskTrophy)}}>Add Trophy</button>
                    <button  className="bg-gray-900 rounded-md">Add to Goal</button>
                    <button  className="bg-gray-900 rounded-md" disabled={true} onClick={()=>{setReoccuring(!taskReoccuring)}}>Make Reoccuring</button>
                </div> */}
            </div>
            <button className="bg-gray-900 p-2 rounded-md w-1/4 place-self-center"
            onClick={addTask}>{item.name === "" ? "Add" : "Update"}</button>
        </div>
    );
}