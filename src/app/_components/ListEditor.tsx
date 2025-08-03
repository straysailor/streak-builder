
export default function ListEditor():React.JSX.Element{
    return(
    <div>
        <div>
            <label htmlFor="sortOptions">Sort List by:</label>
            <select name="sortOptions">
                <option>Unsorted</option>
                <option>Highest Priority First</option>
                <option>Lowest Priority First</option>
                <option>Newest Items First</option>
                <option>Oldest Items First</option>
                <option>Due Soon</option>
            </select>
        </div>
        <div>
            <p>List Settings:</p>
            <label htmlFor="hideChecked">Hide Checked Items</label>
            <input type="chechbox" name="hideChecked"></input>
            <label htmlFor="colorOnSort">Recolor Based on Sort Options:</label>
            <input type="checkbox" name="colorOnSort"></input>
        </div>
    </div>
    );
}