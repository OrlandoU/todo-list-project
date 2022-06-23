import todosF from "./todosFactory";
import projectsF from "./projectsFactory"

//Manager module for all projects
export default (function(){

    let _projectId = 0;
    let _todoId = 0;

    const projectsDb = {};
    const todosDb = {};

    const _getProjectId = () => {
        return _projectId
    }
    const _updateProjectId = () =>{_projectId++}

    const _getTodoId = () => {
        return _todoId
    }
    const _updateTodoId = () => {_todoId++}


    const createProject = (projectName, category) => {
        projectsDb[_getProjectId()] = projectsF(_getProjectId(), projectName, category);
        _updateProjectId();
    }
    const createTodo = (projectId, title, description, dueDate, priority) => {
        todosDb[_getTodoId()] = todosF(_getTodoId(), projectId, title, description, dueDate, priority);
        _updateTodoId();
    }


    const removeProject = (id) => {
        delete projectsDb[id]
    }
    const removeTodo = (id) => {
        delete todosDb[id]   
    }


    const read = () => {
        return {projectsDb, todosDb}
    }
    

    const updateProject = () => {
       
    }
    const updateTodo = () => {
       
    }

    

    return{createProject, createTodo, removeProject, removeTodo, read, updateProject, updateTodo}
})()


