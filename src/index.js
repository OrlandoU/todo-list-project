import { projectModule, domModule } from "./modules";
let index;
const projectForm = document.querySelector('#projectForm')
projectForm.addEventListener('submit', addProject)

const todoForm = document.querySelector('#todos-form')
todoForm.addEventListener('submit', addTodo)

const allButton = document.querySelector('.all-button')
allButton.addEventListener('click', showAllTodos)
let currentSelected;
let pageStateFav;

const importantButton = document.querySelector('.important-button')
importantButton.addEventListener('click', showImportant)

const deleteWholeProject = document.querySelector('.delete-project')
deleteWholeProject.addEventListener('click', deleteCurrentProject)

projectModule.retrieveData()
showAllTodos()
renewListeners()

function deleteCurrentProject(){
    projectModule.removeProject(currentSelected)
    document.querySelector('main').classList.add('hide')
    showAllTodos()
    renewListeners()
}
function showImportant() {
    let mainHeader = document.querySelector('.main-header')
    mainHeader.textContent = "Important To-Dos"
    pageStateFav = true;

    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    domModule.updateTodos(projectModule.read().todosDb.filter(crr => {
        return crr.read()._isFavorite == true
    }), projectModule.read().projectsDb, true)
    renewListeners()
    todoForm.classList.remove('show')
    todoForm.classList.add('hide')
}

function showAllTodos(event) {
    pageStateFav = false;
    if (event) {
        document.querySelector('main').classList.add('show')
    }
    let mainHeader = document.querySelector('.main-header')
    mainHeader.textContent = 'Full to-do list'

    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    domModule.updateTodos(projectModule.read().todosDb, projectModule.read().projectsDb, true)
    renewListeners()
    document.querySelector('.delete-project').classList.add('hide')
    todoForm.classList.remove('show')
    todoForm.classList.add('hide')
}

function addProject(event) {
    pageStateFav = false;
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
    document.querySelector('.delete-project').classList.remove('hide')


    event.target.reset()
}
function addTodo(event) {
    pageStateFav = false;
    event.preventDefault()
    let data = Object.fromEntries(new FormData(event.target).entries())
    projectModule.createTodo(currentSelected, data.title, data.description, data.dueDate, data.priority)

    domModule.updateTodos(projectModule.read().todosDb, projectModule.read().projectsDb)
    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    renewListeners()
    document.querySelector('.delete-project').classList.remove('hide')


    event.target.reset()
}

function showSelected(event) {
    document.querySelector('main').classList.remove('hide')
    document.querySelector('main').classList.add('show')
    document.querySelector('.delete-project').classList.remove('hide')
    pageStateFav = false;
    currentSelected = event.currentTarget.dataset.id
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
    let importantB = document.querySelectorAll('.favorite-button')
    importantB.forEach(button => {
        button.addEventListener('click', toggleFavorite)
    })
}
function toggleFavorite(event) {
    let index = event.currentTarget.parentElement.parentElement.dataset
    let mainHeader = document.querySelector('.main-header')
    let state = mainHeader.textContent == 'Full to-do list' ? true : false
    let altState = mainHeader.textContent == 'Important To-Dos' ? true : false
    projectModule.updateTodoState(index.id, 'favorite')

    if (altState) {
        domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
        domModule.updateTodos(projectModule.read().todosDb.filter(crr => {
            return crr.read()._isFavorite == true
        }), projectModule.read().projectsDb, state)
        todoForm.classList.remove('show')
        todoForm.classList.add('hide')
    }
    else if(state){
        showAllTodos() 
        return
    }
    else {
        console.log('s')
        domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
        domModule.updateTodos(projectModule.read().todosDb.filter(todo => {
            return todo.read()._projectId = index.projectId
        }), projectModule.read().projectsDb, state)
        todoForm.classList.add('show')
        todoForm.classList.remove('hide')
    }


    renewListeners()
}
function deleteTodo(event) {
    let index = event.currentTarget.parentElement.parentElement.dataset
    let state;
    if('Full to-do list' || 'Important To-Dos'){
        state = true
    }
    else{
        state = false;
    }
    projectModule.removeTodo(index.id)
    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    domModule.updateTodos(projectModule.read().todosDb.filter(todo => {
        return todo.read()._projectId = index.projectId
    }), projectModule.read().projectsDb, state )
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
    projectModule.updateTodoState(index, 'state')
}

