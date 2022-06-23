import projectModule from "./projects";
import domModule from "./dom";

const projectForm = document.querySelector('#projectForm')
projectForm.addEventListener('submit', addProject)
const todoForm = document.querySelector('#todos-form')
todoForm.addEventListener('submit', addTodo)

function addProject(e){
    e.preventDefault()
    let data = Object.fromEntries(new FormData(e.target).entries())

    document.querySelector('.closeModal').click()

    domModule.updateProjects(data)
}
function addTodo(event){
    event.preventDefault()
    let data = Object.fromEntries(new FormData(event.target).entries())

    projectModule.createTodo('1', data.title, data.description, data.dueDate, data.priority)

    domModule.updateTodos(projectModule.read().todosDb)

}
