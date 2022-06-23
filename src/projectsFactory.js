//Creation, reading and updating of the object
export default (id,name, category) => {
    let _id = id
    let _name = name;
    let _date = new Date()
    let _category = category;

    const read = ()=>{{_id,_name, _date, _category}}

    const update = (newName, newCategory)=>{
        _name = newName
        _category = newCategory
    }
    
    return {read, update, addTodo}
}