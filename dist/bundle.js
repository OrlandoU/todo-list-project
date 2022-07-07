/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules.js":
/*!************************!*\
  !*** ./src/modules.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domModule": () => (/* binding */ domModule),
/* harmony export */   "projectModule": () => (/* binding */ projectModule)
/* harmony export */ });
/* harmony import */ var _todosFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todosFactory */ "./src/todosFactory.js");
/* harmony import */ var _projectsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectsFactory */ "./src/projectsFactory.js");



//Manager module for all projects
const projectModule = (function () {

    let _projectId = 0;
    let _todoId = 0;

    let projectsDb = [];
    let todosDb = [];

    const retrieveData = () => {
        let storedValues = JSON.parse(localStorage.getItem('db'))
        if (!storedValues) return
        let projectsD = storedValues.projectsD || []
        let todosD = storedValues.todosD || []

        if (projectsD.length !=0) {
            for (let i = projectsD.length; i > 0; i--) {
                if (projectsD[i]) {
                    _projectId = projectsD.at(i)._id + 1
                    break
                }
            }
            projectsD.forEach(project => {
                if(project){
                    projectsDb[project._id] = (0,_projectsFactory__WEBPACK_IMPORTED_MODULE_1__["default"])(project._id, project._name, project._category)
                }
            })
        }

        if (todosD.length != 0) {
            for (let i = todosD.length; i > 0; i--) {
                if (todosD[i]) {
                    _todoId = todosD.at(i)._id + 1
                    break
                }
            }
            todosD.forEach(todo => {
                if (todo) {
                    todosDb[todo._id] = (0,_todosFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(todo._id, todo._projectId, todo._title, todo._description, todo._dueDate, todo._priority, todo._state, todo._isFavorite)
                }
            })
        }


    }
    const _saveOnStorage = () => {
        let projectsD = projectsDb.map(project => project.read())
        let todosD = todosDb.map(todo => todo.read())
        localStorage.setItem('db', JSON.stringify({ projectsD, todosD }))
    }

    const getProjectId = () => {
        return _projectId
    }
    const _updateProjectId = () => { _projectId++ }

    const _getTodoId = () => {
        return _todoId
    }
    const _updateTodoId = () => { _todoId++ }

    const createProject = (projectName, category) => {
        projectsDb[getProjectId()] = (0,_projectsFactory__WEBPACK_IMPORTED_MODULE_1__["default"])(getProjectId(), projectName, category);
        _updateProjectId();
        _saveOnStorage()
    }
    const createTodo = (projectId, title, description, dueDate, priority) => {
        todosDb[_getTodoId()] = (0,_todosFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(_getTodoId(), projectId, title, description, dueDate, priority);
        _updateTodoId();
        _saveOnStorage()
    }


    const removeProject = (id) => {
        delete projectsDb[id]
        todosDb.forEach(crr=>{
            if(crr.read()._projectId == id){
                delete todosDb[crr.read()._id]
            }
        })
        _saveOnStorage()
    }
    const removeTodo = (id) => {
        delete todosDb[id]
        _saveOnStorage()
    }


    const read = () => {
        return { projectsDb, todosDb }
    }

    const updateProject = () => {

    }
    const updateFTodo = (data, index) => {
        todosDb[index].update(data.title, data.description, data.dueDate, data.priority)
        _saveOnStorage()
    }
    const updateTodoState = (index, type) => {
        if (type == 'state') {
            todosDb[index].toggleState()
            _saveOnStorage()
        }
        else{
            todosDb[index].toggleFavorite()
            _saveOnStorage()
        }
    }



    return { createProject, createTodo, removeProject, removeTodo, read, updateProject, updateTodoState, retrieveData, getProjectId, updateFTodo }
})();

const domModule = (function () {

    const clearProjects = () => {
        let ulElements = document.querySelectorAll('.cleanup')
        ulElements.forEach(item => {
            while (item.firstChild) {
                item.removeChild(item.firstChild)
            }
        })

    }
    const clearTodos = () => {
        let elements = document.querySelectorAll('.clean')
        elements.forEach(item => {
            while (item.firstChild) {
                item.removeChild(item.firstChild)
            }
        })
    }

    const updateProjects = (projectsDb, todosDb) => {
        clearProjects()
        projectsDb.forEach(element => {

            let listElement = document.createElement('li')
            listElement.classList.add('project-listener')

            let currentProject = element.read()

            listElement.dataset.id = currentProject._id

            let iconContainer = document.createElement('div')

            let nameContainer = document.createElement('div')
            nameContainer.classList.add('project-name')
            nameContainer.textContent = currentProject._name

            let counterContainer = document.createElement('div')
            counterContainer.classList.add('project-counter')
            counterContainer.textContent = todosDb.filter(todo => {
                return todo.read()._projectId == currentProject._id
            }).length

            listElement.appendChild(iconContainer)
            listElement.appendChild(nameContainer)
            listElement.appendChild(counterContainer)

            document.querySelector(`.projects-list-${currentProject._category}`).appendChild(listElement)
        })
        updateCounters(projectsDb, todosDb)
    }

    const updateCounters = (projectsDb, todosDb) => {
        let workCounter = document.querySelector('.counter-Work')
        workCounter.textContent = projectsDb.filter(item => {
            return item.read()._category == 'Work'
        }).length
        if (workCounter.textContent == 0) {
            workCounter.textContent = ''

        }

        let personalCounter = document.querySelector('.counter-Personal')
        personalCounter.textContent = projectsDb.filter(item => {
            return item.read()._category == 'Personal'
        }).length
        if (personalCounter.textContent == 0) {
            personalCounter.textContent = ''
        }

        let homeCounter = document.querySelector('.counter-Home')
        homeCounter.textContent = projectsDb.filter(item => {
            return item.read()._category == 'Home'
        }).length
        if (homeCounter.textContent == 0) {
            homeCounter.textContent = ''
        }

        let allCounter = document.querySelector('.all-counter')
        allCounter.textContent = todosDb.filter(crr => {
            return crr != null
        }).length
        if (allCounter.textContent == 0) {
            allCounter.textContent = ''
        }

        let importantCounter = document.querySelector('.important-counter')
        importantCounter.textContent = todosDb.filter(crr=>{
            return crr.read()._isFavorite == true
        }).length
        if(importantCounter.textContent == 0){
            importantCounter.textContent = ''
        }
    }
    const updateTodos = (todosDb, projectsDb, isCondition) => {

        clearTodos()
        todosDb.forEach(todo => {
            document.querySelector('main').classList.remove('hide')
            let listElement = document.createElement('li')
            let currentTodo = todo.read();
            listElement.dataset.id = currentTodo._id
            listElement.dataset.projectId = currentTodo._projectId



            let checkBox = document.createElement('input')
            checkBox.classList.add('toggleState')
            checkBox.type = 'checkbox'
            console.log(currentTodo._state)
            checkBox.checked = currentTodo._state

            let subContainer = document.createElement('div')
            subContainer.classList.add('sub-container')

            let header = document.createElement('h2')
            header.textContent = currentTodo._title

            let date = document.createElement('h4')
            date.textContent = currentTodo._dueDate

            let todoOptions = document.createElement('div')
            todoOptions.classList.add('todo-options-container')

            let editButton = document.createElement('img')
            editButton.classList.add('edit-button')
            editButton.src = 'editIcon.svg'

            let deleteButton = document.createElement('img')
            deleteButton.classList.add('delete-button')
            deleteButton.src = 'deleteIcon.svg'

            let favoriteButton = document.createElement('img')
            favoriteButton.classList.add('favorite-button')
            if (currentTodo._isFavorite) {
                favoriteButton.classList.add('favorite')
            }
            favoriteButton.src = 'favoriteIcon.svg'



            listElement.appendChild(checkBox)
            subContainer.appendChild(header)
            subContainer.appendChild(date)

            if (isCondition) {
                let priorityC = document.createElement('h5')
                priorityC.textContent = currentTodo._priority
                priorityC.setAttribute('class', `${currentTodo._priority}`);

                let projectId = document.createElement('h5')
                projectId.textContent = projectsDb[currentTodo._projectId].read()._category

                let tagsContainer = document.createElement('div')
                tagsContainer.classList.add('tags-container')

                tagsContainer.appendChild(priorityC)
                tagsContainer.appendChild(projectId)
                subContainer.appendChild(tagsContainer)
            }
            else {
                let priorityC = document.createElement('h5')
                priorityC.textContent = currentTodo._priority
                priorityC.setAttribute('class', `${currentTodo._priority}`);
                subContainer.appendChild(priorityC)
                todoOptions.appendChild(editButton)
            }
            todoOptions.appendChild(deleteButton)
            todoOptions.appendChild(favoriteButton)
            listElement.appendChild(subContainer)
            listElement.appendChild(todoOptions)
            updateCounters(projectsDb, todosDb)

            document.querySelector('.todos-container').appendChild(listElement)
        })
    }
    const startEdit = (todo) => {
        todo = todo.read()
        document.querySelector('.button-text').textContent = 'Edit'
        document.querySelector('#title-form').focus()
        document.querySelector('#title-form').value = todo._title
        document.querySelector('#priority-form').value = todo._priority
        document.querySelector('#date-form').value = todo._dueDate
        document.querySelector('#description-form').value = todo._description
    }


    return { updateProjects, updateTodos, updateCounters, startEdit }
})()



/***/ }),

/***/ "./src/projectsFactory.js":
/*!********************************!*\
  !*** ./src/projectsFactory.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//Creation, reading and updating of the object
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((id,name, category) => {
    let _id = id
    let _name = name;
    let _date = new Date()
    let _category = category;

    const read = ()=>{
        return {_id,_name, _date, _category}
    }


    const update = (newName, newCategory)=>{
        _name = newName
        _category = newCategory
    }
    
    return {read, update}
});

/***/ }),

/***/ "./src/todosFactory.js":
/*!*****************************!*\
  !*** ./src/todosFactory.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//todos factory function
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((id, projectId,title, description, dueDate, priority, state, favorite)=>{
    //Object values
    let _projectId = projectId
    let _id = id
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _state = state;
    let _isFavorite = favorite;

    const toggleFavorite = () =>{
        _isFavorite = _isFavorite ? false : true;
    }
    const read = () =>{
        return{_title, _description, _dueDate, _priority, _id, _projectId, _state, _isFavorite}
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
});





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules */ "./src/modules.js");

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

_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.retrieveData()
showAllTodos()
renewListeners()

function deleteCurrentProject(){
    _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.removeProject(currentSelected)
    document.querySelector('main').classList.add('hide')
    showAllTodos()
    renewListeners()
}
function showImportant() {
    let mainHeader = document.querySelector('.main-header')
    mainHeader.textContent = "Important To-Dos"
    pageStateFav = true;

    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb.filter(crr => {
        return crr.read()._isFavorite == true
    }), _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, true)
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

    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, true)
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
    currentSelected = _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.getProjectId()
    _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.createProject(data.projectName, data.category)
    document.querySelector(`#${data.category}-input`).checked = true

    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb)
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
    _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.createTodo(currentSelected, data.title, data.description, data.dueDate, data.priority)

    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb)
    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
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
    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb.filter(todo => {
        return todo.read()._projectId == currentSelected
    }), _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb)
    let mainHeader = document.querySelector('.main-header')
    mainHeader.textContent = _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb[currentSelected].read()._name
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
    _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.updateTodoState(index.id, 'favorite')

    if (altState) {
        _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
        _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb.filter(crr => {
            return crr.read()._isFavorite == true
        }), _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, state)
        todoForm.classList.remove('show')
        todoForm.classList.add('hide')
    }
    else if(state){
        showAllTodos() 
        return
    }
    else {
        console.log('s')
        _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
        _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb.filter(todo => {
            return todo.read()._projectId = index.projectId
        }), _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, state)
        todoForm.classList.add('show')
        todoForm.classList.remove('hide')
    }


    renewListeners()
}
function deleteTodo(event) {
    let index = event.currentTarget.parentElement.parentElement.dataset
    if(true){
        let state = true
    }
    else{}
    _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.removeTodo(index.id)
    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb.filter(todo => {
        return todo.read()._projectId = index.projectId
    }), _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, state )
    renewListeners()
}
function editTodo(event) {
    index = event.currentTarget.parentElement.parentElement.dataset

    todoForm.removeEventListener('submit', addTodo)
    todoForm.addEventListener('submit', manageEdit)

    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.startEdit(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb[index.id])
}
function manageEdit(event) {
    event.preventDefault()

    let data = Object.fromEntries(new FormData(event.target).entries())
    _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.updateFTodo(data, index.id)

    todoForm.removeEventListener('submit', manageEdit)
    todoForm.addEventListener('submit', addTodo)
    document.querySelector('.button-text').textContent = 'Done'

    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    _modules__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb.filter(todo => {
        return todo.read()._projectId = index.projectId
    }), _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb)
    renewListeners()
    event.target.reset()
}
function toggleState(event) {
    let index = event.currentTarget.parentElement.dataset.id
    _modules__WEBPACK_IMPORTED_MODULE_0__.projectModule.updateTodoState(index, 'state')
}


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBLE9BQU8sSUFBdUM7QUFDOUM7QUFDQTtBQUNBLFFBQVEsRUFFSDtBQUNMLElBQUksOERBQXdCO0FBQzVCLElBQUksOERBQXdCLENBQUMsd0RBQWtCLGVBQWUsd0RBQWtCO0FBQ2hGLElBQUksMkRBQXFCLENBQUMsd0RBQWtCO0FBQzVDO0FBQ0EsS0FBSyxHQUFHLHdEQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLElBQUkseURBQW1CLENBQUMsd0RBQWtCO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksK0RBQXlCOztBQUU3QjtBQUNBO0FBQ0E7O0FBRUEsSUFBSSw4REFBd0IsQ0FBQyx3REFBa0IsZUFBZSx3REFBa0I7QUFDaEYsSUFBSSwyREFBcUIsQ0FBQyx3REFBa0I7QUFDNUM7QUFDQSxLQUFLLEdBQUcsd0RBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1FQUE2QjtBQUNqQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL21vZHVsZXMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LXByb2plY3QvLi9zcmMvcHJvamVjdHNGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3RvZG9zRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0b2Rvc0YgZnJvbSBcIi4vdG9kb3NGYWN0b3J5XCI7XG5pbXBvcnQgcHJvamVjdHNGIGZyb20gXCIuL3Byb2plY3RzRmFjdG9yeVwiXG5pbXBvcnQge2Zvcm1hdH0gZnJvbSBcImRhdGUtZm5zXCI7XG4vL01hbmFnZXIgbW9kdWxlIGZvciBhbGwgcHJvamVjdHNcbmV4cG9ydCBjb25zdCBwcm9qZWN0TW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGxldCBfcHJvamVjdElkID0gMDtcbiAgICBsZXQgX3RvZG9JZCA9IDA7XG5cbiAgICBsZXQgcHJvamVjdHNEYiA9IFtdO1xuICAgIGxldCB0b2Rvc0RiID0gW107XG5cbiAgICBjb25zdCByZXRyaWV2ZURhdGEgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzdG9yZWRWYWx1ZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYicpKVxuICAgICAgICBpZiAoIXN0b3JlZFZhbHVlcykgcmV0dXJuXG4gICAgICAgIGxldCBwcm9qZWN0c0QgPSBzdG9yZWRWYWx1ZXMucHJvamVjdHNEIHx8IFtdXG4gICAgICAgIGxldCB0b2Rvc0QgPSBzdG9yZWRWYWx1ZXMudG9kb3NEIHx8IFtdXG5cbiAgICAgICAgaWYgKHByb2plY3RzRC5sZW5ndGggIT0wKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gcHJvamVjdHNELmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0c0RbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgX3Byb2plY3RJZCA9IHByb2plY3RzRC5hdChpKS5faWQgKyAxXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvamVjdHNELmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYocHJvamVjdCl7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RzRGJbcHJvamVjdC5faWRdID0gcHJvamVjdHNGKHByb2plY3QuX2lkLCBwcm9qZWN0Ll9uYW1lLCBwcm9qZWN0Ll9jYXRlZ29yeSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvZG9zRC5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRvZG9zRC5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAodG9kb3NEW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIF90b2RvSWQgPSB0b2Rvc0QuYXQoaSkuX2lkICsgMVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvZG9zRC5mb3JFYWNoKHRvZG8gPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0b2RvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZG9zRGJbdG9kby5faWRdID0gdG9kb3NGKHRvZG8uX2lkLCB0b2RvLl9wcm9qZWN0SWQsIHRvZG8uX3RpdGxlLCB0b2RvLl9kZXNjcmlwdGlvbiwgdG9kby5fZHVlRGF0ZSwgdG9kby5fcHJpb3JpdHksIHRvZG8uX3N0YXRlLCB0b2RvLl9pc0Zhdm9yaXRlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuXG4gICAgfVxuICAgIGNvbnN0IF9zYXZlT25TdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICBsZXQgcHJvamVjdHNEID0gcHJvamVjdHNEYi5tYXAocHJvamVjdCA9PiBwcm9qZWN0LnJlYWQoKSlcbiAgICAgICAgbGV0IHRvZG9zRCA9IHRvZG9zRGIubWFwKHRvZG8gPT4gdG9kby5yZWFkKCkpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYicsIEpTT04uc3RyaW5naWZ5KHsgcHJvamVjdHNELCB0b2Rvc0QgfSkpXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0UHJvamVjdElkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gX3Byb2plY3RJZFxuICAgIH1cbiAgICBjb25zdCBfdXBkYXRlUHJvamVjdElkID0gKCkgPT4geyBfcHJvamVjdElkKysgfVxuXG4gICAgY29uc3QgX2dldFRvZG9JZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIF90b2RvSWRcbiAgICB9XG4gICAgY29uc3QgX3VwZGF0ZVRvZG9JZCA9ICgpID0+IHsgX3RvZG9JZCsrIH1cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAocHJvamVjdE5hbWUsIGNhdGVnb3J5KSA9PiB7XG4gICAgICAgIHByb2plY3RzRGJbZ2V0UHJvamVjdElkKCldID0gcHJvamVjdHNGKGdldFByb2plY3RJZCgpLCBwcm9qZWN0TmFtZSwgY2F0ZWdvcnkpO1xuICAgICAgICBfdXBkYXRlUHJvamVjdElkKCk7XG4gICAgICAgIF9zYXZlT25TdG9yYWdlKClcbiAgICB9XG4gICAgY29uc3QgY3JlYXRlVG9kbyA9IChwcm9qZWN0SWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICAgICAgdG9kb3NEYltfZ2V0VG9kb0lkKCldID0gdG9kb3NGKF9nZXRUb2RvSWQoKSwgcHJvamVjdElkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgX3VwZGF0ZVRvZG9JZCgpO1xuICAgICAgICBfc2F2ZU9uU3RvcmFnZSgpXG4gICAgfVxuXG5cbiAgICBjb25zdCByZW1vdmVQcm9qZWN0ID0gKGlkKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBwcm9qZWN0c0RiW2lkXVxuICAgICAgICB0b2Rvc0RiLmZvckVhY2goY3JyPT57XG4gICAgICAgICAgICBpZihjcnIucmVhZCgpLl9wcm9qZWN0SWQgPT0gaWQpe1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0b2Rvc0RiW2Nyci5yZWFkKCkuX2lkXVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBfc2F2ZU9uU3RvcmFnZSgpXG4gICAgfVxuICAgIGNvbnN0IHJlbW92ZVRvZG8gPSAoaWQpID0+IHtcbiAgICAgICAgZGVsZXRlIHRvZG9zRGJbaWRdXG4gICAgICAgIF9zYXZlT25TdG9yYWdlKClcbiAgICB9XG5cblxuICAgIGNvbnN0IHJlYWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7IHByb2plY3RzRGIsIHRvZG9zRGIgfVxuICAgIH1cblxuICAgIGNvbnN0IHVwZGF0ZVByb2plY3QgPSAoKSA9PiB7XG5cbiAgICB9XG4gICAgY29uc3QgdXBkYXRlRlRvZG8gPSAoZGF0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgdG9kb3NEYltpbmRleF0udXBkYXRlKGRhdGEudGl0bGUsIGRhdGEuZGVzY3JpcHRpb24sIGRhdGEuZHVlRGF0ZSwgZGF0YS5wcmlvcml0eSlcbiAgICAgICAgX3NhdmVPblN0b3JhZ2UoKVxuICAgIH1cbiAgICBjb25zdCB1cGRhdGVUb2RvU3RhdGUgPSAoaW5kZXgsIHR5cGUpID0+IHtcbiAgICAgICAgaWYgKHR5cGUgPT0gJ3N0YXRlJykge1xuICAgICAgICAgICAgdG9kb3NEYltpbmRleF0udG9nZ2xlU3RhdGUoKVxuICAgICAgICAgICAgX3NhdmVPblN0b3JhZ2UoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0b2Rvc0RiW2luZGV4XS50b2dnbGVGYXZvcml0ZSgpXG4gICAgICAgICAgICBfc2F2ZU9uU3RvcmFnZSgpXG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgcmV0dXJuIHsgY3JlYXRlUHJvamVjdCwgY3JlYXRlVG9kbywgcmVtb3ZlUHJvamVjdCwgcmVtb3ZlVG9kbywgcmVhZCwgdXBkYXRlUHJvamVjdCwgdXBkYXRlVG9kb1N0YXRlLCByZXRyaWV2ZURhdGEsIGdldFByb2plY3RJZCwgdXBkYXRlRlRvZG8gfVxufSkoKTtcblxuZXhwb3J0IGNvbnN0IGRvbU1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBjbGVhclByb2plY3RzID0gKCkgPT4ge1xuICAgICAgICBsZXQgdWxFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbGVhbnVwJylcbiAgICAgICAgdWxFbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgd2hpbGUgKGl0ZW0uZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2hpbGQoaXRlbS5maXJzdENoaWxkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuICAgIGNvbnN0IGNsZWFyVG9kb3MgPSAoKSA9PiB7XG4gICAgICAgIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbGVhbicpXG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB3aGlsZSAoaXRlbS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVDaGlsZChpdGVtLmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlUHJvamVjdHMgPSAocHJvamVjdHNEYiwgdG9kb3NEYikgPT4ge1xuICAgICAgICBjbGVhclByb2plY3RzKClcbiAgICAgICAgcHJvamVjdHNEYi5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgICAgICBsZXQgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICBsaXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWxpc3RlbmVyJylcblxuICAgICAgICAgICAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gZWxlbWVudC5yZWFkKClcblxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuZGF0YXNldC5pZCA9IGN1cnJlbnRQcm9qZWN0Ll9pZFxuXG4gICAgICAgICAgICBsZXQgaWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICAgICAgICAgIGxldCBuYW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIG5hbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1uYW1lJylcbiAgICAgICAgICAgIG5hbWVDb250YWluZXIudGV4dENvbnRlbnQgPSBjdXJyZW50UHJvamVjdC5fbmFtZVxuXG4gICAgICAgICAgICBsZXQgY291bnRlckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb3VudGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtY291bnRlcicpXG4gICAgICAgICAgICBjb3VudGVyQ29udGFpbmVyLnRleHRDb250ZW50ID0gdG9kb3NEYi5maWx0ZXIodG9kbyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvZG8ucmVhZCgpLl9wcm9qZWN0SWQgPT0gY3VycmVudFByb2plY3QuX2lkXG4gICAgICAgICAgICB9KS5sZW5ndGhcblxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvbkNvbnRhaW5lcilcbiAgICAgICAgICAgIGxpc3RFbGVtZW50LmFwcGVuZENoaWxkKG5hbWVDb250YWluZXIpXG4gICAgICAgICAgICBsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChjb3VudGVyQ29udGFpbmVyKVxuXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucHJvamVjdHMtbGlzdC0ke2N1cnJlbnRQcm9qZWN0Ll9jYXRlZ29yeX1gKS5hcHBlbmRDaGlsZChsaXN0RWxlbWVudClcbiAgICAgICAgfSlcbiAgICAgICAgdXBkYXRlQ291bnRlcnMocHJvamVjdHNEYiwgdG9kb3NEYilcbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVDb3VudGVycyA9IChwcm9qZWN0c0RiLCB0b2Rvc0RiKSA9PiB7XG4gICAgICAgIGxldCB3b3JrQ291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3VudGVyLVdvcmsnKVxuICAgICAgICB3b3JrQ291bnRlci50ZXh0Q29udGVudCA9IHByb2plY3RzRGIuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucmVhZCgpLl9jYXRlZ29yeSA9PSAnV29yaydcbiAgICAgICAgfSkubGVuZ3RoXG4gICAgICAgIGlmICh3b3JrQ291bnRlci50ZXh0Q29udGVudCA9PSAwKSB7XG4gICAgICAgICAgICB3b3JrQ291bnRlci50ZXh0Q29udGVudCA9ICcnXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwZXJzb25hbENvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRlci1QZXJzb25hbCcpXG4gICAgICAgIHBlcnNvbmFsQ291bnRlci50ZXh0Q29udGVudCA9IHByb2plY3RzRGIuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucmVhZCgpLl9jYXRlZ29yeSA9PSAnUGVyc29uYWwnXG4gICAgICAgIH0pLmxlbmd0aFxuICAgICAgICBpZiAocGVyc29uYWxDb3VudGVyLnRleHRDb250ZW50ID09IDApIHtcbiAgICAgICAgICAgIHBlcnNvbmFsQ291bnRlci50ZXh0Q29udGVudCA9ICcnXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaG9tZUNvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRlci1Ib21lJylcbiAgICAgICAgaG9tZUNvdW50ZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0c0RiLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnJlYWQoKS5fY2F0ZWdvcnkgPT0gJ0hvbWUnXG4gICAgICAgIH0pLmxlbmd0aFxuICAgICAgICBpZiAoaG9tZUNvdW50ZXIudGV4dENvbnRlbnQgPT0gMCkge1xuICAgICAgICAgICAgaG9tZUNvdW50ZXIudGV4dENvbnRlbnQgPSAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFsbENvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsLWNvdW50ZXInKVxuICAgICAgICBhbGxDb3VudGVyLnRleHRDb250ZW50ID0gdG9kb3NEYi5maWx0ZXIoY3JyID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjcnIgIT0gbnVsbFxuICAgICAgICB9KS5sZW5ndGhcbiAgICAgICAgaWYgKGFsbENvdW50ZXIudGV4dENvbnRlbnQgPT0gMCkge1xuICAgICAgICAgICAgYWxsQ291bnRlci50ZXh0Q29udGVudCA9ICcnXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW1wb3J0YW50Q291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbXBvcnRhbnQtY291bnRlcicpXG4gICAgICAgIGltcG9ydGFudENvdW50ZXIudGV4dENvbnRlbnQgPSB0b2Rvc0RiLmZpbHRlcihjcnI9PntcbiAgICAgICAgICAgIHJldHVybiBjcnIucmVhZCgpLl9pc0Zhdm9yaXRlID09IHRydWVcbiAgICAgICAgfSkubGVuZ3RoXG4gICAgICAgIGlmKGltcG9ydGFudENvdW50ZXIudGV4dENvbnRlbnQgPT0gMCl7XG4gICAgICAgICAgICBpbXBvcnRhbnRDb3VudGVyLnRleHRDb250ZW50ID0gJydcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB1cGRhdGVUb2RvcyA9ICh0b2Rvc0RiLCBwcm9qZWN0c0RiLCBpc0NvbmRpdGlvbikgPT4ge1xuXG4gICAgICAgIGNsZWFyVG9kb3MoKVxuICAgICAgICB0b2Rvc0RiLmZvckVhY2godG9kbyA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXG4gICAgICAgICAgICBsZXQgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICBsZXQgY3VycmVudFRvZG8gPSB0b2RvLnJlYWQoKTtcbiAgICAgICAgICAgIGxpc3RFbGVtZW50LmRhdGFzZXQuaWQgPSBjdXJyZW50VG9kby5faWRcbiAgICAgICAgICAgIGxpc3RFbGVtZW50LmRhdGFzZXQucHJvamVjdElkID0gY3VycmVudFRvZG8uX3Byb2plY3RJZFxuXG5cblxuICAgICAgICAgICAgbGV0IGNoZWNrQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgICAgICAgICAgY2hlY2tCb3guY2xhc3NMaXN0LmFkZCgndG9nZ2xlU3RhdGUnKVxuICAgICAgICAgICAgY2hlY2tCb3gudHlwZSA9ICdjaGVja2JveCdcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRUb2RvLl9zdGF0ZSlcbiAgICAgICAgICAgIGNoZWNrQm94LmNoZWNrZWQgPSBjdXJyZW50VG9kby5fc3RhdGVcblxuICAgICAgICAgICAgbGV0IHN1YkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBzdWJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3ViLWNvbnRhaW5lcicpXG5cbiAgICAgICAgICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXG4gICAgICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBjdXJyZW50VG9kby5fdGl0bGVcblxuICAgICAgICAgICAgbGV0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpXG4gICAgICAgICAgICBkYXRlLnRleHRDb250ZW50ID0gY3VycmVudFRvZG8uX2R1ZURhdGVcblxuICAgICAgICAgICAgbGV0IHRvZG9PcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIHRvZG9PcHRpb25zLmNsYXNzTGlzdC5hZGQoJ3RvZG8tb3B0aW9ucy1jb250YWluZXInKVxuXG4gICAgICAgICAgICBsZXQgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgICAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXQtYnV0dG9uJylcbiAgICAgICAgICAgIGVkaXRCdXR0b24uc3JjID0gJ2VkaXRJY29uLnN2ZydcblxuICAgICAgICAgICAgbGV0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWJ1dHRvbicpXG4gICAgICAgICAgICBkZWxldGVCdXR0b24uc3JjID0gJ2RlbGV0ZUljb24uc3ZnJ1xuXG4gICAgICAgICAgICBsZXQgZmF2b3JpdGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgICAgICAgICAgZmF2b3JpdGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmF2b3JpdGUtYnV0dG9uJylcbiAgICAgICAgICAgIGlmIChjdXJyZW50VG9kby5faXNGYXZvcml0ZSkge1xuICAgICAgICAgICAgICAgIGZhdm9yaXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2Zhdm9yaXRlJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZhdm9yaXRlQnV0dG9uLnNyYyA9ICdmYXZvcml0ZUljb24uc3ZnJ1xuXG5cblxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hlY2tCb3gpXG4gICAgICAgICAgICBzdWJDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKVxuICAgICAgICAgICAgc3ViQ29udGFpbmVyLmFwcGVuZENoaWxkKGRhdGUpXG5cbiAgICAgICAgICAgIGlmIChpc0NvbmRpdGlvbikge1xuICAgICAgICAgICAgICAgIGxldCBwcmlvcml0eUMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNScpXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDLnRleHRDb250ZW50ID0gY3VycmVudFRvZG8uX3ByaW9yaXR5XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgJHtjdXJyZW50VG9kby5fcHJpb3JpdHl9YCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJvamVjdElkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKVxuICAgICAgICAgICAgICAgIHByb2plY3RJZC50ZXh0Q29udGVudCA9IHByb2plY3RzRGJbY3VycmVudFRvZG8uX3Byb2plY3RJZF0ucmVhZCgpLl9jYXRlZ29yeVxuXG4gICAgICAgICAgICAgICAgbGV0IHRhZ3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIHRhZ3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFncy1jb250YWluZXInKVxuXG4gICAgICAgICAgICAgICAgdGFnc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcmlvcml0eUMpXG4gICAgICAgICAgICAgICAgdGFnc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SWQpXG4gICAgICAgICAgICAgICAgc3ViQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhZ3NDb250YWluZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJpb3JpdHlDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKVxuICAgICAgICAgICAgICAgIHByaW9yaXR5Qy50ZXh0Q29udGVudCA9IGN1cnJlbnRUb2RvLl9wcmlvcml0eVxuICAgICAgICAgICAgICAgIHByaW9yaXR5Qy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYCR7Y3VycmVudFRvZG8uX3ByaW9yaXR5fWApO1xuICAgICAgICAgICAgICAgIHN1YkNvbnRhaW5lci5hcHBlbmRDaGlsZChwcmlvcml0eUMpXG4gICAgICAgICAgICAgICAgdG9kb09wdGlvbnMuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvZG9PcHRpb25zLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbilcbiAgICAgICAgICAgIHRvZG9PcHRpb25zLmFwcGVuZENoaWxkKGZhdm9yaXRlQnV0dG9uKVxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoc3ViQ29udGFpbmVyKVxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQodG9kb09wdGlvbnMpXG4gICAgICAgICAgICB1cGRhdGVDb3VudGVycyhwcm9qZWN0c0RiLCB0b2Rvc0RiKVxuXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQobGlzdEVsZW1lbnQpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGNvbnN0IHN0YXJ0RWRpdCA9ICh0b2RvKSA9PiB7XG4gICAgICAgIHRvZG8gPSB0b2RvLnJlYWQoKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXRleHQnKS50ZXh0Q29udGVudCA9ICdFZGl0J1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUtZm9ybScpLmZvY3VzKClcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlLWZvcm0nKS52YWx1ZSA9IHRvZG8uX3RpdGxlXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eS1mb3JtJykudmFsdWUgPSB0b2RvLl9wcmlvcml0eVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZS1mb3JtJykudmFsdWUgPSB0b2RvLl9kdWVEYXRlXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbi1mb3JtJykudmFsdWUgPSB0b2RvLl9kZXNjcmlwdGlvblxuICAgIH1cblxuXG4gICAgcmV0dXJuIHsgdXBkYXRlUHJvamVjdHMsIHVwZGF0ZVRvZG9zLCB1cGRhdGVDb3VudGVycywgc3RhcnRFZGl0IH1cbn0pKClcblxuIiwiLy9DcmVhdGlvbiwgcmVhZGluZyBhbmQgdXBkYXRpbmcgb2YgdGhlIG9iamVjdFxuZXhwb3J0IGRlZmF1bHQgKGlkLG5hbWUsIGNhdGVnb3J5KSA9PiB7XG4gICAgbGV0IF9pZCA9IGlkXG4gICAgbGV0IF9uYW1lID0gbmFtZTtcbiAgICBsZXQgX2RhdGUgPSBuZXcgRGF0ZSgpXG4gICAgbGV0IF9jYXRlZ29yeSA9IGNhdGVnb3J5O1xuXG4gICAgY29uc3QgcmVhZCA9ICgpPT57XG4gICAgICAgIHJldHVybiB7X2lkLF9uYW1lLCBfZGF0ZSwgX2NhdGVnb3J5fVxuICAgIH1cblxuXG4gICAgY29uc3QgdXBkYXRlID0gKG5ld05hbWUsIG5ld0NhdGVnb3J5KT0+e1xuICAgICAgICBfbmFtZSA9IG5ld05hbWVcbiAgICAgICAgX2NhdGVnb3J5ID0gbmV3Q2F0ZWdvcnlcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtyZWFkLCB1cGRhdGV9XG59IiwiLy90b2RvcyBmYWN0b3J5IGZ1bmN0aW9uXG5leHBvcnQgZGVmYXVsdCAoaWQsIHByb2plY3RJZCx0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBzdGF0ZSwgZmF2b3JpdGUpPT57XG4gICAgLy9PYmplY3QgdmFsdWVzXG4gICAgbGV0IF9wcm9qZWN0SWQgPSBwcm9qZWN0SWRcbiAgICBsZXQgX2lkID0gaWRcbiAgICBsZXQgX3RpdGxlID0gdGl0bGU7XG4gICAgbGV0IF9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIGxldCBfZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgbGV0IF9wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIGxldCBfc3RhdGUgPSBzdGF0ZTtcbiAgICBsZXQgX2lzRmF2b3JpdGUgPSBmYXZvcml0ZTtcblxuICAgIGNvbnN0IHRvZ2dsZUZhdm9yaXRlID0gKCkgPT57XG4gICAgICAgIF9pc0Zhdm9yaXRlID0gX2lzRmF2b3JpdGUgPyBmYWxzZSA6IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IHJlYWQgPSAoKSA9PntcbiAgICAgICAgcmV0dXJue190aXRsZSwgX2Rlc2NyaXB0aW9uLCBfZHVlRGF0ZSwgX3ByaW9yaXR5LCBfaWQsIF9wcm9qZWN0SWQsIF9zdGF0ZSwgX2lzRmF2b3JpdGV9XG4gICAgfVxuICAgIFxuXG4gICAgY29uc3QgdXBkYXRlID0gKG5ld05hbWUsIG5ld0Rlc2NyaXB0aW9uLCBuZXdEdWVEYXRlLCBuZXdQcmlvcml0eSkgPT57XG4gICAgICAgIF90aXRsZSA9IG5ld05hbWU7XG4gICAgICAgIF9kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgICAgICBfZHVlRGF0ZSA9IG5ld0R1ZURhdGU7XG4gICAgICAgIF9wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICAgIH1cbiAgICBjb25zdCB0b2dnbGVTdGF0ZSA9ICgpID0+e1xuICAgICAgICBfc3RhdGUgPSBfc3RhdGUgPyBmYWxzZSA6IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB7cmVhZCwgdXBkYXRlLCB0b2dnbGVTdGF0ZSwgdG9nZ2xlRmF2b3JpdGV9XG59XG5cblxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHByb2plY3RNb2R1bGUsIGRvbU1vZHVsZSB9IGZyb20gXCIuL21vZHVsZXNcIjtcbmxldCBpbmRleDtcbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RGb3JtJylcbnByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFkZFByb2plY3QpXG5cbmNvbnN0IHRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG9zLWZvcm0nKVxudG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYWRkVG9kbylcblxuY29uc3QgYWxsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbC1idXR0b24nKVxuYWxsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0FsbFRvZG9zKVxubGV0IGN1cnJlbnRTZWxlY3RlZDtcbmxldCBwYWdlU3RhdGVGYXY7XG5cbmNvbnN0IGltcG9ydGFudEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbXBvcnRhbnQtYnV0dG9uJylcbmltcG9ydGFudEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dJbXBvcnRhbnQpXG5cbmNvbnN0IGRlbGV0ZVdob2xlUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtcHJvamVjdCcpXG5kZWxldGVXaG9sZVByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVDdXJyZW50UHJvamVjdClcblxucHJvamVjdE1vZHVsZS5yZXRyaWV2ZURhdGEoKVxuc2hvd0FsbFRvZG9zKClcbnJlbmV3TGlzdGVuZXJzKClcblxuZnVuY3Rpb24gZGVsZXRlQ3VycmVudFByb2plY3QoKXtcbiAgICBwcm9qZWN0TW9kdWxlLnJlbW92ZVByb2plY3QoY3VycmVudFNlbGVjdGVkKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbiAgICBzaG93QWxsVG9kb3MoKVxuICAgIHJlbmV3TGlzdGVuZXJzKClcbn1cbmZ1bmN0aW9uIHNob3dJbXBvcnRhbnQoKSB7XG4gICAgbGV0IG1haW5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1oZWFkZXInKVxuICAgIG1haW5IZWFkZXIudGV4dENvbnRlbnQgPSBcIkltcG9ydGFudCBUby1Eb3NcIlxuICAgIHBhZ2VTdGF0ZUZhdiA9IHRydWU7XG5cbiAgICBkb21Nb2R1bGUudXBkYXRlUHJvamVjdHMocHJvamVjdE1vZHVsZS5yZWFkKCkucHJvamVjdHNEYiwgcHJvamVjdE1vZHVsZS5yZWFkKCkudG9kb3NEYilcbiAgICBkb21Nb2R1bGUudXBkYXRlVG9kb3MocHJvamVjdE1vZHVsZS5yZWFkKCkudG9kb3NEYi5maWx0ZXIoY3JyID0+IHtcbiAgICAgICAgcmV0dXJuIGNyci5yZWFkKCkuX2lzRmF2b3JpdGUgPT0gdHJ1ZVxuICAgIH0pLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiLCB0cnVlKVxuICAgIHJlbmV3TGlzdGVuZXJzKClcbiAgICB0b2RvRm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JylcbiAgICB0b2RvRm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbn1cblxuZnVuY3Rpb24gc2hvd0FsbFRvZG9zKGV2ZW50KSB7XG4gICAgcGFnZVN0YXRlRmF2ID0gZmFsc2U7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICB9XG4gICAgbGV0IG1haW5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1oZWFkZXInKVxuICAgIG1haW5IZWFkZXIudGV4dENvbnRlbnQgPSAnRnVsbCB0by1kbyBsaXN0J1xuXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVByb2plY3RzKHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIpXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVRvZG9zKHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIsIHRydWUpXG4gICAgcmVuZXdMaXN0ZW5lcnMoKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtcHJvamVjdCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxuICAgIHRvZG9Gb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxuICAgIHRvZG9Gb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0KGV2ZW50KSB7XG4gICAgcGFnZVN0YXRlRmF2ID0gZmFsc2U7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGxldCBkYXRhID0gT2JqZWN0LmZyb21FbnRyaWVzKG5ldyBGb3JtRGF0YShldmVudC50YXJnZXQpLmVudHJpZXMoKSlcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2VNb2RhbCcpLmNsaWNrKClcbiAgICBjdXJyZW50U2VsZWN0ZWQgPSBwcm9qZWN0TW9kdWxlLmdldFByb2plY3RJZCgpXG4gICAgcHJvamVjdE1vZHVsZS5jcmVhdGVQcm9qZWN0KGRhdGEucHJvamVjdE5hbWUsIGRhdGEuY2F0ZWdvcnkpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZGF0YS5jYXRlZ29yeX0taW5wdXRgKS5jaGVja2VkID0gdHJ1ZVxuXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVByb2plY3RzKHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIpXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVRvZG9zKHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIpXG4gICAgcmVuZXdMaXN0ZW5lcnMoKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9JyR7Y3VycmVudFNlbGVjdGVkfSddYCkuY2xpY2soKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLXByb2plY3QnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcblxuXG4gICAgZXZlbnQudGFyZ2V0LnJlc2V0KClcbn1cbmZ1bmN0aW9uIGFkZFRvZG8oZXZlbnQpIHtcbiAgICBwYWdlU3RhdGVGYXYgPSBmYWxzZTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbGV0IGRhdGEgPSBPYmplY3QuZnJvbUVudHJpZXMobmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCkuZW50cmllcygpKVxuICAgIHByb2plY3RNb2R1bGUuY3JlYXRlVG9kbyhjdXJyZW50U2VsZWN0ZWQsIGRhdGEudGl0bGUsIGRhdGEuZGVzY3JpcHRpb24sIGRhdGEuZHVlRGF0ZSwgZGF0YS5wcmlvcml0eSlcblxuICAgIGRvbU1vZHVsZS51cGRhdGVUb2Rvcyhwcm9qZWN0TW9kdWxlLnJlYWQoKS50b2Rvc0RiLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiKVxuICAgIGRvbU1vZHVsZS51cGRhdGVQcm9qZWN0cyhwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS50b2Rvc0RiKVxuICAgIHJlbmV3TGlzdGVuZXJzKClcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLXByb2plY3QnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcblxuXG4gICAgZXZlbnQudGFyZ2V0LnJlc2V0KClcbn1cblxuZnVuY3Rpb24gc2hvd1NlbGVjdGVkKGV2ZW50KSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLXByb2plY3QnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcbiAgICBwYWdlU3RhdGVGYXYgPSBmYWxzZTtcbiAgICBjdXJyZW50U2VsZWN0ZWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRcbiAgICBkb21Nb2R1bGUudXBkYXRlUHJvamVjdHMocHJvamVjdE1vZHVsZS5yZWFkKCkucHJvamVjdHNEYiwgcHJvamVjdE1vZHVsZS5yZWFkKCkudG9kb3NEYilcbiAgICBkb21Nb2R1bGUudXBkYXRlVG9kb3MocHJvamVjdE1vZHVsZS5yZWFkKCkudG9kb3NEYi5maWx0ZXIodG9kbyA9PiB7XG4gICAgICAgIHJldHVybiB0b2RvLnJlYWQoKS5fcHJvamVjdElkID09IGN1cnJlbnRTZWxlY3RlZFxuICAgIH0pLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiKVxuICAgIGxldCBtYWluSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4taGVhZGVyJylcbiAgICBtYWluSGVhZGVyLnRleHRDb250ZW50ID0gcHJvamVjdE1vZHVsZS5yZWFkKCkucHJvamVjdHNEYltjdXJyZW50U2VsZWN0ZWRdLnJlYWQoKS5fbmFtZVxuICAgIHJlbmV3TGlzdGVuZXJzKClcblxuICAgIHRvZG9Gb3JtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKVxuICAgIHRvZG9Gb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxufVxuZnVuY3Rpb24gcmVuZXdMaXN0ZW5lcnMoKSB7XG4gICAgbGV0IGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1saXN0ZW5lcicpXG4gICAgZWxlbS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1NlbGVjdGVkKVxuICAgIH0pXG4gICAgbGV0IHN0YXRlSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZ2dsZVN0YXRlJylcbiAgICBzdGF0ZUlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdG9nZ2xlU3RhdGUpXG4gICAgfSlcbiAgICBsZXQgZGVsZXRlQiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGUtYnV0dG9uJylcbiAgICBkZWxldGVCLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlVG9kbylcbiAgICB9KVxuICAgIGxldCBlZGl0QiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0LWJ1dHRvbicpXG4gICAgZWRpdEIuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlZGl0VG9kbylcbiAgICB9KVxuICAgIGxldCBpbXBvcnRhbnRCID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhdm9yaXRlLWJ1dHRvbicpXG4gICAgaW1wb3J0YW50Qi5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUZhdm9yaXRlKVxuICAgIH0pXG59XG5mdW5jdGlvbiB0b2dnbGVGYXZvcml0ZShldmVudCkge1xuICAgIGxldCBpbmRleCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXRcbiAgICBsZXQgbWFpbkhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWhlYWRlcicpXG4gICAgbGV0IHN0YXRlID0gbWFpbkhlYWRlci50ZXh0Q29udGVudCA9PSAnRnVsbCB0by1kbyBsaXN0JyA/IHRydWUgOiBmYWxzZVxuICAgIGxldCBhbHRTdGF0ZSA9IG1haW5IZWFkZXIudGV4dENvbnRlbnQgPT0gJ0ltcG9ydGFudCBUby1Eb3MnID8gdHJ1ZSA6IGZhbHNlXG4gICAgcHJvamVjdE1vZHVsZS51cGRhdGVUb2RvU3RhdGUoaW5kZXguaWQsICdmYXZvcml0ZScpXG5cbiAgICBpZiAoYWx0U3RhdGUpIHtcbiAgICAgICAgZG9tTW9kdWxlLnVwZGF0ZVByb2plY3RzKHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIpXG4gICAgICAgIGRvbU1vZHVsZS51cGRhdGVUb2Rvcyhwcm9qZWN0TW9kdWxlLnJlYWQoKS50b2Rvc0RiLmZpbHRlcihjcnIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNyci5yZWFkKCkuX2lzRmF2b3JpdGUgPT0gdHJ1ZVxuICAgICAgICB9KSwgcHJvamVjdE1vZHVsZS5yZWFkKCkucHJvamVjdHNEYiwgc3RhdGUpXG4gICAgICAgIHRvZG9Gb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxuICAgICAgICB0b2RvRm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRlJylcbiAgICB9XG4gICAgZWxzZSBpZihzdGF0ZSl7XG4gICAgICAgIHNob3dBbGxUb2RvcygpIFxuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzJylcbiAgICAgICAgZG9tTW9kdWxlLnVwZGF0ZVByb2plY3RzKHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIpXG4gICAgICAgIGRvbU1vZHVsZS51cGRhdGVUb2Rvcyhwcm9qZWN0TW9kdWxlLnJlYWQoKS50b2Rvc0RiLmZpbHRlcih0b2RvID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0b2RvLnJlYWQoKS5fcHJvamVjdElkID0gaW5kZXgucHJvamVjdElkXG4gICAgICAgIH0pLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiLCBzdGF0ZSlcbiAgICAgICAgdG9kb0Zvcm0uY2xhc3NMaXN0LmFkZCgnc2hvdycpXG4gICAgICAgIHRvZG9Gb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxuICAgIH1cblxuXG4gICAgcmVuZXdMaXN0ZW5lcnMoKVxufVxuZnVuY3Rpb24gZGVsZXRlVG9kbyhldmVudCkge1xuICAgIGxldCBpbmRleCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXRcbiAgICBpZignRnVsbCB0by1kbyBsaXN0JyB8fCAnSW1wb3J0YW50IFRvLURvcycpe1xuICAgICAgICBsZXQgc3RhdGUgPSB0cnVlXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGxldCBzdGF0ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBwcm9qZWN0TW9kdWxlLnJlbW92ZVRvZG8oaW5kZXguaWQpXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVByb2plY3RzKHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIpXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVRvZG9zKHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIuZmlsdGVyKHRvZG8gPT4ge1xuICAgICAgICByZXR1cm4gdG9kby5yZWFkKCkuX3Byb2plY3RJZCA9IGluZGV4LnByb2plY3RJZFxuICAgIH0pLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiLCBzdGF0ZSApXG4gICAgcmVuZXdMaXN0ZW5lcnMoKVxufVxuZnVuY3Rpb24gZWRpdFRvZG8oZXZlbnQpIHtcbiAgICBpbmRleCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXRcblxuICAgIHRvZG9Gb3JtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFkZFRvZG8pXG4gICAgdG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgbWFuYWdlRWRpdClcblxuICAgIGRvbU1vZHVsZS5zdGFydEVkaXQocHJvamVjdE1vZHVsZS5yZWFkKCkudG9kb3NEYltpbmRleC5pZF0pXG59XG5mdW5jdGlvbiBtYW5hZ2VFZGl0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgbGV0IGRhdGEgPSBPYmplY3QuZnJvbUVudHJpZXMobmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCkuZW50cmllcygpKVxuICAgIHByb2plY3RNb2R1bGUudXBkYXRlRlRvZG8oZGF0YSwgaW5kZXguaWQpXG5cbiAgICB0b2RvRm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBtYW5hZ2VFZGl0KVxuICAgIHRvZG9Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFkZFRvZG8pXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi10ZXh0JykudGV4dENvbnRlbnQgPSAnRG9uZSdcblxuICAgIGRvbU1vZHVsZS51cGRhdGVQcm9qZWN0cyhwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS50b2Rvc0RiKVxuICAgIGRvbU1vZHVsZS51cGRhdGVUb2Rvcyhwcm9qZWN0TW9kdWxlLnJlYWQoKS50b2Rvc0RiLmZpbHRlcih0b2RvID0+IHtcbiAgICAgICAgcmV0dXJuIHRvZG8ucmVhZCgpLl9wcm9qZWN0SWQgPSBpbmRleC5wcm9qZWN0SWRcbiAgICB9KSwgcHJvamVjdE1vZHVsZS5yZWFkKCkucHJvamVjdHNEYilcbiAgICByZW5ld0xpc3RlbmVycygpXG4gICAgZXZlbnQudGFyZ2V0LnJlc2V0KClcbn1cbmZ1bmN0aW9uIHRvZ2dsZVN0YXRlKGV2ZW50KSB7XG4gICAgbGV0IGluZGV4ID0gZXZlbnQuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWRcbiAgICBwcm9qZWN0TW9kdWxlLnVwZGF0ZVRvZG9TdGF0ZShpbmRleCwgJ3N0YXRlJylcbn1cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9