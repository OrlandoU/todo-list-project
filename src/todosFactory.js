//todos factory function
export default (id, projectId,title, description, dueDate, priority, state)=>{
    //Object values
    let _projectId = projectId
    let _id = id
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _state = state;
    let _isFavorite = false;

    const toggleFavorite = () =>{
        _isFavorite = _isFavorite ? false : true;
    }
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
    return {read, update, toggleState, toggleFavorite}
}



