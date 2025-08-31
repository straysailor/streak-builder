import { ListItemStruct } from "../_types/listItemType";

export function saveTask(task: ListItemStruct):void{
    saveTasks([task, ...loadTasks().filter((t)=>(t.id !== task.id))]);
}
export function saveTasks(tasks: ListItemStruct[]):void{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
export function loadTasks(): ListItemStruct [] {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}