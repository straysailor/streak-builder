'use client'
import { useState, useMemo } from "react"
import ListItem from "./ListItem";
import ItemEditor from "./ItemEditor";
import { ListItemStruct } from "../_types/listItemType";
import Image from 'next/image';
import ListEditor from "./ListEditor";
import { compareDates } from "../_functions/dateHandling";

let list_data:ListItemStruct[] = [
    {
        id:crypto.randomUUID(),
        name: "Daily Coding",
        description: "At least 3 sets of Leet Code Problems",
        dateAdded: "2025-03-01",
        dueDate: "none",
        goal: "Programming Streak",
        reoccuring: true,
        trophy: false,
        priority: 2,
        completed:false,
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
        priority: 4,
        completed:false,
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
        priority: 3,
        completed:false,
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
    completed:false,
}
export default function ToDoList():React.JSX.Element{
    let [items, setItems] = useState<ListItemStruct[]>(list_data);
    let [displayOrder, setDisplayOrder] = useState<string>("default");
    let [focusedGoal, setFocusedGoal] = useState<string>("None");
    let [editorOpen, setEditorOpen] = useState<boolean>(false);
    let [targetTaskID, setTargetTaskID] = useState<string>("new"); 
    let [editorValues, setEditorValues] = useState<ListItemStruct>(blankItem);
    let [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    let [hideComplete, setHideComplete] = useState<boolean>(false);

    // Functions Handling Task Addition / Updates
    const toggleEditor = () => {
        setEditorValues(blankItem);
        setEditorOpen(!editorOpen);
    }
    const addTask = () => {
        setTargetTaskID("new");
        setEditorValues(blankItem);
        setEditorOpen(true)
    }
    const updateList = (newItem:ListItemStruct) => {
        if (newItem.id === "0000"){
            setItems([...items, {...newItem, id:crypto.randomUUID()}]);
        } else {
            const newItems = items.filter((item)=>item.id !== newItem.id);
            setItems([...newItems, {...newItem}]);
        }
        setEditorOpen(false);
    }
    const editListItem = (itemID:string, deleteItem:boolean) => {

        let itemNumber = items.findIndex((item)=>item.id === itemID);
        if (itemNumber !== -1){
            if (deleteItem){
                setItems([...items.filter((item) => item.id !== itemID)]);
            } else {
                setEditorValues(items[itemNumber]);
                setEditorOpen(true);
            }
        }
        setTargetTaskID(itemID);
    }

    const checkItem = (itemID:string, checkValue:boolean) => {
        setItems([...items.filter((item)=>item.id !== itemID),{...items.filter((item)=>item.id === itemID)[0], completed:checkValue}])
    }
    // Functions Handling List Settings
    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen)
    }

    const sortedList = useMemo(() => {
        let newList = [...items]
        if (focusedGoal !== "None"){
            newList = [...items.filter((item) => item.goal === focusedGoal)];
        }
        if (hideComplete){
            newList = [...newList.filter((item)=>!item.completed)];
        }
        switch (displayOrder){
            case 'title':
                return [...newList].sort((a,b) => a.name.localeCompare(b.name));
            case 'priority':
                return [...newList].sort((a,b)=> b.priority - a.priority);
            case 'date added':
                return [...newList].sort((a,b) => compareDates(a.dateAdded, b.dateAdded));
            case 'due date':
                let notDue = [...newList.filter((item)=>item.dueDate === "none")];
                return [...[...newList.filter((item)=>item.dueDate !== "none")].sort((a,b) => compareDates(a.dueDate, b.dueDate)),...notDue];
            case 'completion':
                return [...newList.filter((a)=> a.completed),...newList.filter((a)=>!a.completed)]
            default:
                return newList
        }
    }, [items, displayOrder, focusedGoal, hideComplete]);


    const updateOrder = (sortBy:string) => {
        setDisplayOrder(sortBy);
    }

    const filterGoals = (goal:string) => {
        setFocusedGoal(goal);
    }

    const hideCompleted = (hide:boolean)=>{
        setHideComplete(hide);
    }

    let listBody = sortedList.map((listItem) => (
        <ListItem key={listItem.id} item={listItem} editItem={editListItem} checkItem={checkItem}></ListItem>
    ));
    return (
    <div className={`grid grid-cols-3`}>
        <div>
        {settingsOpen &&
            <ListEditor sortList={updateOrder} filterGoals={filterGoals} hideComplete={hideCompleted}></ListEditor>
        }
        </div>
        <div className="grid grid-cols-1 gap-y-8 w-lg place-items-center place-self-start content-center p-6 bg-teal-700 rounded-xl min-h-110">
            <div className="grid grid-cols-3 w-full justify-items-center">
                <button className="place-self-start" onClick={toggleSettings}>
                    <Image
                    src="/gear-thin.svg"
                    alt="Settings"
                    width={30}
                    height={30}
                    className={`duration-300 ease-in-out ${settingsOpen ? 'twist':'untwist'}`}
                    >
                    </Image>
                    </button>
                <h1 className="text-xl">To Do List</h1>
                <button></button>
            </div>
            
            <div className="grid grid-cols-1 gap-y-3 w-lg place-items-center content-center min-h-65">
                {listBody.length > 0 ? listBody : "There's nothing here!"}
            </div>
            <button className="bg-gray-900 rounded-md w-xs" onClick={addTask}>Add Item</button>
        </div>
        <div>
        {editorOpen && 
            <ItemEditor key={targetTaskID} item={editorValues} updateList={updateList} closeEditor={toggleEditor}></ItemEditor>
        }
        </div>
    </div>
    )
}