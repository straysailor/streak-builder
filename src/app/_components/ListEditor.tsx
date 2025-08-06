
interface listEditorProps {
    sortList: (sortBy:string) => void,
    filterGoals: (goal:string) => void,
    // enableColors: (enable:boolean) => void,
    hideComplete: (hide:boolean) => void
}

export default function ListEditor({sortList, filterGoals, hideComplete}:listEditorProps):React.JSX.Element{
    const changeSort = (option:string) => {
        const selection = option.toLowerCase();
        sortList(selection);
    }
    return(
    <div className="flex flex-col w-lg bg-teal-900 p-1 rounded-xl place-items-center content-center p-6">
        <p className="text-xl">List Editor</p>
        <div className="grid grid-rows-2 w-full">
            <div>
                <p className="text-lg font-bold">Sorting Options</p>
                 <div className="grid grid-cols-1">
                    <div className="flex flex-row justify-between">
                        <label htmlFor="sortOptions">Sort by:</label>
                        <select name="sortOptions" className="bg-gray-900 m-2 rounded-sm" onChange={(e)=>{changeSort(e.target.value)}}>
                            <option value="ALL_ITEMS">None</option>
                            <option>Priority</option>
                            <option>Date Added</option>
                            <option>Completion</option>
                            <option>Due Date</option>
                            <option>Title</option>
                        </select>
                    </div>
                    <div className="flex flex-row justify-between">
                        <label htmlFor="goalSelect">Sort by Goal:</label>
                        <select name="goalSelect" className="bg-gray-900 m-2 rounded-sm" onChange={(e)=>{filterGoals(e.target.value)}}>
                            <option>None</option>
                            <option>Getting Buff</option>
                            <option>Coding Practice</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <p className="text-lg font-bold">Display Settings</p>
                <div className="grid grid-cols-1">
                    <div className="flex flex-row justify-between">
                        <label htmlFor="hideChecked">Hide Checked Items:</label>
                        <input type="checkbox" name="hideChecked" onChange={(e)=>{hideComplete(e.target.checked)}}></input>
                    </div>
                    {/* <div className="flex flex-row justify-between">
                        <label htmlFor="colorOnSort">Recolor Based on Sort Options:</label>
                        <input type="checkbox" name="colorOnSort"></input>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
    );
}