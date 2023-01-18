import { projectModule, domModule } from "./modules";
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    setDoc,
    doc,
    getDoc,
} from 'firebase/firestore';

import {
    getAuth,
    browserSessionPersistence,
    setPersistence,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA-puARq1N5lRuBkE3soSjijWBdDuN4Jc0",
    authDomain: "todo-list-23575.firebaseapp.com",
    projectId: "todo-list-23575",
    storageBucket: "todo-list-23575.appspot.com",
    messagingSenderId: "940592232223",
    appId: "1:940592232223:web:25e82915781c847cf7222a"
};
const app = initializeApp(firebaseConfig)
let user = {}


async function createUser(e) {
    let errorHeader = document.getElementById('login-errors')
    e.preventDefault()
    let data = Object.fromEntries(new FormData(e.target).entries())

    try {
        if (data.password !== data.passwordRep) throw Error('Mismatching password')
        await createUserWithEmailAndPassword(getAuth(), data.email, data.password)
        await setDoc(doc(getFirestore(), 'users', getAuth().currentUser.uid), {
            username: data.username
        })
        user.username = data.username
        if (isSignedIn()) {
            loginForm.classList.remove('login-show')
            signupForm.classList.remove('login-show')
        }
        setUser()
    } catch (error) {
        setTimeout(() => { errorHeader.textContent = '' }, 3500)
        errorHeader.textContent = error.message
        console.error('Error on login up', error)
    }
}


async function signInWithGoogle() {
    let provider = new GoogleAuthProvider()
    await signInWithPopup(getAuth(), provider)
    if (isSignedIn()) {
        loginForm.classList.remove('login-show')
    }
    setUser()
}

async function signOutUser() {
    await signOut(getAuth())
    setUser()
}

function isSignedIn() {
    return !!getAuth().currentUser
}


async function loginUser(e) {
    let errorHeader = document.getElementById('login-error')
    e.preventDefault()
    let data = Object.fromEntries(new FormData(e.target).entries())
    try {
        await signInWithEmailAndPassword(getAuth(), data.email, data.password)
        user = await getDoc(doc(getFirestore(), 'users', getAuth().currentUser.uid))
        if (isSignedIn()) {
            loginForm.classList.remove('login-show')
        }
    } catch (error) {
        setTimeout(() => { errorHeader.textContent = '' }, 3500)
        errorHeader.textContent = error.message
        console.error('Error on login up', error)
    }
    setUser()
}


async function setUser() {
    await projectModule.retrieveData()

    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    domModule.updateTodos(projectModule.read().todosDb, projectModule.read().projectsDb)
    renewListeners()
    if (getAuth().currentUser) {
        loginButtonExpand.classList.add('hide')
        logoutButton.classList.remove('hide')
        userName.textContent = getAuth().currentUser.displayName || user.username
        // userPicture.src = getAuth().currentUser.photoURL || "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    } else {
        // userPicture.src = "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
        userName.textContent = 'Guest'
        loginButtonExpand.classList.remove('hide')
        logoutButton.classList.add('hide')
    }

}



const userPicture = document.querySelector('.user-pic')
const userName = document.querySelector('.user-name')





const googleButton = document.querySelector('.google-button')
googleButton.addEventListener('click', signInWithGoogle)

const signupForm = document.querySelector('.signupForm')
signupForm.addEventListener('click', () => signupForm.classList.remove('login-show'))
signupForm.addEventListener('submit', createUser)

const loginForm = document.querySelector('.loginForm')
loginForm.addEventListener('submit', loginUser)
loginForm.addEventListener('click', () => loginForm.classList.remove('login-show'))

const logoutButton = document.querySelector('.logout-button')
logoutButton.addEventListener('click', signOutUser)

const loginButtonExpand = document.querySelector('.login-open')
loginButtonExpand.addEventListener('click', () => {
    loginForm.classList.add('login-show')
})
const modalLogin = document.querySelector('.modalLogin')
modalLogin.addEventListener('click', (e) => e.stopPropagation())

const modalLogins = document.querySelector('.modalLogins')
modalLogins.addEventListener('click', (e) => e.stopPropagation())

const signupExpand = document.querySelector('.sign-up-expand')
signupExpand.addEventListener('click', () => {
    loginForm.classList.remove('login-show')
    signupForm.classList.add('login-show')
})

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


showAllTodos()
renewListeners()


function deleteCurrentProject() {
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
    else if (state) {
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
    if ('Full to-do list' || 'Important To-Dos') {
        state = true
    }
    else {
        state = false;
    }
    projectModule.removeTodo(index.id)
    domModule.updateProjects(projectModule.read().projectsDb, projectModule.read().todosDb)
    domModule.updateTodos(projectModule.read().todosDb.filter(todo => {
        return todo.read()._projectId = index.projectId
    }), projectModule.read().projectsDb, state)
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

setPersistence(getAuth(), browserSessionPersistence)
    .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        getDoc(doc(getFirestore(), 'users', getAuth().currentUser.uid)).then((userData) => {
            user = userData.data()
            setUser()
        })
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    });