'use client'
import { useState, useMemo, useEffect } from "react"
import ListItem from "./ListItem";
import ItemEditor from "./ItemEditor";
import { ListItemStruct } from "../_types/listItemType";
import Image from 'next/image';
import ListEditor from "./ListEditor";
import { compareDates } from "../_functions/dateHandling";
import { loadTasks, removeTask, saveTask, saveTasks } from "../_functions/localstorage";
const tutorialItem:ListItemStruct = {
    id: "0001",
    name: "Add your first task",
    description: "Click the 'Add Item' button at the bottom of the page. Then, give your task a name and click 'Add'.",
    dateAdded: "2025-08-31",
    dueDate:  "none",
    trophy: false,
    goal: "",
    reoccuring: false,
    priority: 0,
    completed:false,
}
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
    let [items, setItems] = useState<ListItemStruct[]>([]);
    let [displayOrder, setDisplayOrder] = useState<string>("default");
    let [focusedGoal, setFocusedGoal] = useState<string>("None");
    let [editorOpen, setEditorOpen] = useState<boolean>(false);
    let [targetTaskID, setTargetTaskID] = useState<string>("new"); 
    let [editorValues, setEditorValues] = useState<ListItemStruct>(blankItem);
    let [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    let [hideComplete, setHideComplete] = useState<boolean>(false);

    // Load tasks from local storage, if any.
    useEffect(()=> {
        const savedTasks = loadTasks();
        if (savedTasks.length === 0){
            setItems([{...tutorialItem}]);
        } else {
            setItems(savedTasks);
        }
    },[]);

  /**
   * @function toggleEditor
   * @description Clears any previous data left in the task editor and toggles it open/closed.
   */
    const toggleEditor = () => {
        setEditorValues(blankItem);
        setEditorOpen(!editorOpen);
    }

   /**
    * @function addTask
    * @description Opens the task editor with blank values
    */
    const addTask = () => {
        setTargetTaskID("new");
        setEditorValues(blankItem);
        setEditorOpen(true)
    }
    /** 
     * @function updateList
     * @param {ListItemStruct} newItem - A new or altered item
     * @description Updates the task list by adding to new item, or replacing an existing item with its altered version.
     * @returns {void}
    */
    const updateList = (newItem:ListItemStruct) => {
        if (newItem.id === "0000"){
            let registeredItem:ListItemStruct = {...newItem, id:crypto.randomUUID()};
            setItems([...items, registeredItem]);
            saveTask(registeredItem);
        } else {
            const newItems = items.filter((item)=>item.id !== newItem.id);
            setItems([...newItems, {...newItem}]);
            saveTask(newItem);
        };
        setEditorOpen(false);
    }
    /**
     * @function editListItem
     * @param {string} itemID - ID of the item to be modified
     * @param {boolean} deleteItem - Marks item for deletion
     * @description Populates the Item Editor with the target task's data so it can be modified, unless the item is marked for deletion.
     */
    const editListItem = (itemID:string, deleteItem:boolean) => {

        let itemNumber = items.findIndex((item)=>item.id === itemID);
        if (itemNumber !== -1){
            if (deleteItem){
                setItems([...items.filter((item) => item.id !== itemID)]);
                removeTask(itemID);
            } else {
                setEditorValues(items[itemNumber]);
                setEditorOpen(true);
            }
        }
        setTargetTaskID(itemID);
    }

    /**
     * @function checkItem
     * @param {string} itemID - ID of the item to be modified
     * @param {boolean} checkValue 
     * @description Updates an item in the list if it has been marked/unmarked completed.
     */
    const checkItem = (itemID:string, checkValue:boolean) => {
        let updatedList: ListItemStruct[] = [...items.filter((item)=>item.id !== itemID),{...items.filter((item)=>item.id === itemID)[0], completed:checkValue}]
        setItems(updatedList);
        saveTasks(updatedList);
    }
 
    /**
     * @function toggleSettings
     * @description Opens or closes the list settings menu.
     */
    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen)
    }

    /**
     * @var sortedList
     * @dependencies - items, displayOrder, focusedGoal, hideComplete
     * @description Contains the last variation of a list sorted by the user, which is to be displayed in the component. Also handles the sorting
     * of the list when the user changes the sort variation and stores it in the variable. Also handles the filtering of
     * items; if focusedGoal has a value, it will only contain items linked to the target goal; if hideComplete is true, it will
     * only contain uncompleted items.
     */
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
                return [...[...newList.filter((item)=>item.dueDate !== "none")].sort((a,b) => -compareDates(a.dueDate, b.dueDate)),...notDue];
            case 'completion':
                return [...newList.filter((a)=> a.completed),...newList.filter((a)=>!a.completed)]
            default:
                return newList
        }
    }, [items, displayOrder, focusedGoal, hideComplete]);

    /**
     * @function updateOrder
     * @param sortBy - a string describing the sort method (title, priority, date added, due date, completion)
     * @description Updates the state of displayOrder with what was selected in the ListEditor.
     */
    const updateOrder = (sortBy:string) => {
        setDisplayOrder(sortBy);
    }

    /**
     * @function filterGoals
     * @param goal - a string containing the ID of a goal.
     * @description Updates the state of focusedGoal with what was selected in the ListEditor.
     */
    const filterGoals = (goal:string) => {
        setFocusedGoal(goal);
    }

    /**
     * @function hideCompleted
     * @param sortBy - a string describing the sort method (title, priority, date added, due date, completion)
     * @description Updates the state of displayOrder with what was selected in the ListEditor.
     */
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