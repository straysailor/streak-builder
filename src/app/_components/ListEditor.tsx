
export default function ListEditor():React.JSX.Element{
    return(
    <div className="flex flex-col w-lg bg-teal-900 p-1 rounded-xl place-items-center content-center p-6">
        <p className="text-xl">List Editor</p>
        <div className="grid grid-rows-2 w-full">
            <div>
                <p className="text-lg font-bold">Sorting Options</p>
                <label htmlFor="sortOptions">Sort List by:</label>
                <select name="sortOptions" className="bg-gray-900 m-2 rounded-sm">
                    <option>Unsorted</option>
                    <option>Highest Priority First</option>
                    <option>Lowest Priority First</option>
                    <option>Newest Items First</option>
                    <option>Oldest Items First</option>
                    <option>Due Soon</option>
                </select>
            </div>
            <div className="w-full">
                <p className="text-lg font-bold">Display Settings</p>
                <div className="grid grid-cols-1">
                    <div className="flex flex-row justify-between">
                        <label htmlFor="hideChecked">Hide Checked Items:</label>
                        <input type="checkbox" name="hideChecked"></input>
                    </div>
                    <div className="flex flex-row justify-between">
                        <label htmlFor="colorOnSort">Recolor Based on Sort Options:</label>
                        <input type="checkbox" name="colorOnSort"></input>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}