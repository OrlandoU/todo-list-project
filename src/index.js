import { projectModule, domModule } from "./projects";
let index;
const projectForm = document.querySelector('#projectForm')
projectForm.addEventListener('submit', addProject)

const todoForm = document.querySelector('#todos-form')
todoForm.addEventListener('submit', addTodo)

const allButton = document.querySelector('.all-button')
allButton.addEventListener('click', showAllTodos)
let currentSelected;

projectModule.retrieveData()
showAllTodos()
renewListeners()

function showAllTodos(event) {
    if (event) {
        document.querySelector('main').classList.add('show')
    }
    let mainHeader = document.querySelector('.main-header')
    mainHeader.textContent = 'Full to-do list'

    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    domModule.updateTodos(projectModule.read().todosDb, projectModule.read().projectsDb, true)
    renewListeners()
    todoForm.classList.remove('show')
    todoForm.classList.add('hide')
}

function addProject(event) {
    event.preventDefault()
    let data = Object.fromEntries(new FormData(event.target).entries())
    document.querySelector('.closeModal').click()
    currentSelected = projectModule.getProjectId()
    projectModule.createProject(data.projectName, data.category)
    document.querySelector(`#${data.category}-input`).checked = true

    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    domModule.updateTodos(projectModule.read().todosDb, projectModule.read().projectsDb)
    renewListeners()

    document.querySelector(`[data-id='${currentSelected}']`).click()
    document.querySelector('main').classList.add('show')


    event.target.reset()
}
function addTodo(event) {
    event.preventDefault()
    let data = Object.fromEntries(new FormData(event.target).entries())
    projectModule.createTodo(currentSelected, data.title, data.description, data.dueDate, data.priority)

    domModule.updateTodos(projectModule.read().todosDb, projectModule.read().projectsDb)
    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    renewListeners()

    event.target.reset()
}

function showSelected(event) {
    currentSelected = event.currentTarget.dataset.id
    document.querySelector('main').classList.add('show')
    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    domModule.updateTodos(projectModule.read().todosDb.filter(todo => {
        return todo.read()._projectId == currentSelected
    }), projectModule.read().projectsDb)
    let mainHeader = document.querySelector('.main-header')
    mainHeader.textContent = projectModule.read().projectsDb[currentSelected].read()._name
    renewListeners()
    todoForm.classList.add('show')
    todoForm.classList.remove('hide')
}
function renewListeners() {
    let elem = document.querySelectorAll('.project-listener')
    elem.forEach(item => {
        item.addEventListener('click', showSelected)
    })
    let stateInputs = document.querySelectorAll('.toggleState')
    stateInputs.forEach(input => {
        input.addEventListener('change', toggleState)
    })
    let deleteB = document.querySelectorAll('.delete-button')
    deleteB.forEach(button => {
        button.addEventListener('click', deleteTodo)
    })
    let editB = document.querySelectorAll('.edit-button')
    editB.forEach(button => {
        button.addEventListener('click', editTodo)
    })
}
function deleteTodo(event) {
    let index = event.currentTarget.parentElement.parentElement.dataset
    projectModule.removeTodo(index.id)
    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    domModule.updateTodos(projectModule.read().todosDb.filter(todo => {
        return todo.read()._projectId = index.projectId
    }))
    renewListeners()
}
function editTodo(event) {
    index = event.currentTarget.parentElement.parentElement.dataset

    todoForm.removeEventListener('submit', addTodo)
    todoForm.addEventListener('submit', manageEdit)

    domModule.startEdit(projectModule.read().todosDb[index.id])
}
function manageEdit(event) {
    event.preventDefault()

    let data = Object.fromEntries(new FormData(event.target).entries())
    projectModule.updateFTodo(data, index.id)

    todoForm.removeEventListener('submit', manageEdit)
    todoForm.addEventListener('submit', addTodo)
    document.querySelector('.button-text').textContent = 'Done'

    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    domModule.updateTodos(projectModule.read().todosDb.filter(todo => {
        return todo.read()._projectId = index.projectId
    }), projectModule.read().projectsDb)
    renewListeners()
    event.target.reset()
}
function toggleState(event) {
    let index = event.currentTarget.parentElement.dataset.id
    projectModule.updateTodoState(index)
}

