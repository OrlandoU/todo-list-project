//todos factory function
export default (id, projectId,title, description, dueDate, priority)=>{
    //Object values
    let _projectId = projectId
    let _id = id
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _state = false;

    const read = () =>{
        return{_title, _description, _dueDate, _priority, _id, _projectId, _state}
    }
    

    const update = (newName, newDescription, newDueDate, newPriority) =>{
        _title = newName;
        _description = newDescription;
        _dueDate = newDueDate;
        _priority = newPriority;
    }
    const toggleState = () =>{
        _state = _state ? false : true;
    }
    return {read, update, toggleState}
}



