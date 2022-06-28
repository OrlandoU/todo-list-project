import projectModule from "./projects";
import domModule from "./dom";

const projectForm = document.querySelector('#projectForm')
projectForm.addEventListener('submit', addProject)

const todoForm = document.querySelector('#todos-form')
todoForm.addEventListener('submit', addTodo)

function addProject(event){
    event.preventDefault()
    let data = Object.fromEntries(new FormData(event.target).entries())
    document.querySelector('.closeModal').click()

    projectModule.createProject(data.projectName, data.category)
    document.querySelector(`#${data.category}-input`).checked = true
    domModule.updateProjects(projectModule.read().projectsDb)

    event.target.reset()
}
function addTodo(event){
    event.preventDefault()
    let data = Object.fromEntries(new FormData(event.target).entries())

    projectModule.createTodo(domModule.getCurrentSelected(), data.title, data.description, data.dueDate, data.priority)

    domModule.updateTodos(projectModule.read().todosDb.filter(crr=>{
        return domModule.getCurrentSelected() == crr.read()._projectId
    }))
    domModule.updateProjects(projectModule.read().projectsDb)

    event.target.reset()
}
