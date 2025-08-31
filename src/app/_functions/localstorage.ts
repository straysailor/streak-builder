import { ListItemStruct } from "../_types/listItemType";

/**
 * @function saveTask
 * @param {ListItemStruct} task a task object to be added to local storage
 * @description updates the array of tasks in local storage to contain the new task.
 */
export function saveTask(task: ListItemStruct):void{
    saveTasks([task, ...loadTasks().filter((t)=>(t.id !== task.id))]);
}
/**
 * @function saveTasks
 * @param {ListItemStruct[]} tasks an array of task objects to save to local storage
 * @description overwrites content of the "tasks" key in local storage with the provided list of tasks.
 */
export function saveTasks(tasks: ListItemStruct[]):void{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * @function loadTasks
 * @description gets a list of tasks, if any, from local storage.
 * @returns {ListItemStruct} an array of task objects or an empty array.
 */
export function loadTasks(): ListItemStruct [] {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

/**
 * @function removeTask
 * @param taskID a string containing the ID of a task to be removed from the task list
 * @description removes a target task from the tasks in local storage
 */
export function removeTask(taskID: string) {
    saveTasks([...loadTasks().filter((t) =>(t.id !== taskID))]);
}