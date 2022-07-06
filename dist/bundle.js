/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
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

        if (projectsD) {
            _projectId = projectsD.at(-1)._id + 1;
            projectsD.forEach(project => {
                projectsDb[project._id] = (0,_projectsFactory__WEBPACK_IMPORTED_MODULE_1__["default"])(project._id, project._name, project._category)
            })
        }

        if (todosD.length != 0) {
            for (let i = todosD.length; i > 0; i--) {
                if (todosD[i]) {
                    _todoId = todosD.at(i)._id
                    break
                }
            }
            todosD.forEach(todo => {
                console.log(todo)
                if (todo) {
                    todosDb[todo._id] = (0,_todosFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(todo._id, todo._projectId, todo._title, todo._description, todo._dueDate, todo._priority, todo._state)
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
    const updateTodoState = (index) => {
        todosDb[index].toggleState()
        _saveOnStorage()
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
        allCounter.textContent = todosDb.length
        if (allCounter.textContent == 0) {
            allCounter.textContent = ''
        }
    }
    const updateTodos = (todosDb, projectsDb, isCondition) => {

        clearTodos()
        todosDb.forEach(todo => {
            document.querySelector('main').classList.add('show')
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

            let favoriteButton = document.createElement('img')
            favoriteButton.classList.add('delete-button')
            favoriteButton.src = 'deleteIcon.svg'

            let deleteButton = document.createElement('img')
            deleteButton.src = 'favoriteIcon.svg'
            
            

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
            todoOptions.appendChild(favoriteButton)
            todoOptions.appendChild(deleteButton)
            listElement.appendChild(subContainer)
            listElement.appendChild(todoOptions)
            updateCounters(projectsDb, todosDb)

            document.querySelector('.todos-container').appendChild(listElement)
        })
    }
    const startEdit = (todo) =>{
        todo = todo.read()
        document.querySelector('.button-text').textContent = 'Edit'
        document.querySelector('#title-form').focus()
        document.querySelector('#title-form').value = todo._title
        document.querySelector('#priority-form').value = todo._priority
        document.querySelector('#date-form').value = todo._dueDate
        document.querySelector('#description-form').value = todo._description
    }


    return { updateProjects, updateTodos, updateCounters, startEdit}
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((id, projectId,title, description, dueDate, priority, state)=>{
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
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");

let index;
const projectForm = document.querySelector('#projectForm')
projectForm.addEventListener('submit', addProject)

const todoForm = document.querySelector('#todos-form')
todoForm.addEventListener('submit', addTodo)

const allButton = document.querySelector('.all-button')
allButton.addEventListener('click', showAllTodos)
let currentSelected;

_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.retrieveData()
showAllTodos()
renewListeners()

function showAllTodos(event) {
    if (event) {
        document.querySelector('main').classList.add('show')
    }
    let mainHeader = document.querySelector('.main-header')
    mainHeader.textContent = 'Full to-do list'

    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb, _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, true)
    renewListeners()
    todoForm.classList.remove('show')
    todoForm.classList.add('hide')
}

function addProject(event) {
    event.preventDefault()
    let data = Object.fromEntries(new FormData(event.target).entries())
    document.querySelector('.closeModal').click()
    currentSelected = _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.getProjectId()
    _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.createProject(data.projectName, data.category)
    document.querySelector(`#${data.category}-input`).checked = true

    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb, _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb)
    renewListeners()

    document.querySelector(`[data-id='${currentSelected}']`).click()
    document.querySelector('main').classList.add('show')


    event.target.reset()
}
function addTodo(event) {
    event.preventDefault()
    let data = Object.fromEntries(new FormData(event.target).entries())
    _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.createTodo(currentSelected, data.title, data.description, data.dueDate, data.priority)

    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb, _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb)
    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    renewListeners()

    event.target.reset()
}

function showSelected(event) {
    currentSelected = event.currentTarget.dataset.id
    document.querySelector('main').classList.add('show')
    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb.filter(todo => {
        return todo.read()._projectId == currentSelected
    }), _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb)
    let mainHeader = document.querySelector('.main-header')
    mainHeader.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb[currentSelected].read()._name
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
    _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.removeTodo(index.id)
    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb.filter(todo => {
        return todo.read()._projectId = index.projectId
    }))
    renewListeners()
}
function editTodo(event) {
    index = event.currentTarget.parentElement.parentElement.dataset

    todoForm.removeEventListener('submit', addTodo)
    todoForm.addEventListener('submit', manageEdit)

    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.startEdit(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb[index.id])
}
function manageEdit(event) {
    event.preventDefault()

    let data = Object.fromEntries(new FormData(event.target).entries())
    _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.updateFTodo(data, index.id)

    todoForm.removeEventListener('submit', manageEdit)
    todoForm.addEventListener('submit', addTodo)
    document.querySelector('.button-text').textContent = 'Done'

    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateProjects(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb, _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb)
    _projects__WEBPACK_IMPORTED_MODULE_0__.domModule.updateTodos(_projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().todosDb.filter(todo => {
        return todo.read()._projectId = index.projectId
    }), _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.read().projectsDb)
    renewListeners()
    event.target.reset()
}
function toggleState(event) {
    let index = event.currentTarget.parentElement.dataset.id
    _projects__WEBPACK_IMPORTED_MODULE_0__.projectModule.updateTodoState(index)
}


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUksK0RBQXdCO0FBQzVCLElBQUksK0RBQXdCLENBQUMseURBQWtCLGVBQWUseURBQWtCO0FBQ2hGLElBQUksNERBQXFCLENBQUMseURBQWtCO0FBQzVDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSwwREFBbUIsQ0FBQyx5REFBa0I7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxnRUFBeUI7O0FBRTdCO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLCtEQUF3QixDQUFDLHlEQUFrQixlQUFlLHlEQUFrQjtBQUNoRixJQUFJLDREQUFxQixDQUFDLHlEQUFrQjtBQUM1QztBQUNBLEtBQUssR0FBRyx5REFBa0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0VBQTZCO0FBQ2pDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0LXByb2plY3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LXByb2plY3QvLi9zcmMvcHJvamVjdHNGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3RvZG9zRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0b2Rvc0YgZnJvbSBcIi4vdG9kb3NGYWN0b3J5XCI7XG5pbXBvcnQgcHJvamVjdHNGIGZyb20gXCIuL3Byb2plY3RzRmFjdG9yeVwiXG4vL01hbmFnZXIgbW9kdWxlIGZvciBhbGwgcHJvamVjdHNcbmV4cG9ydCBjb25zdCBwcm9qZWN0TW9kdWxlID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGxldCBfcHJvamVjdElkID0gMDtcbiAgICBsZXQgX3RvZG9JZCA9IDA7XG5cbiAgICBsZXQgcHJvamVjdHNEYiA9IFtdO1xuICAgIGxldCB0b2Rvc0RiID0gW107XG5cbiAgICBjb25zdCByZXRyaWV2ZURhdGEgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzdG9yZWRWYWx1ZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYicpKVxuICAgICAgICBpZiAoIXN0b3JlZFZhbHVlcykgcmV0dXJuXG4gICAgICAgIGxldCBwcm9qZWN0c0QgPSBzdG9yZWRWYWx1ZXMucHJvamVjdHNEIHx8IFtdXG4gICAgICAgIGxldCB0b2Rvc0QgPSBzdG9yZWRWYWx1ZXMudG9kb3NEIHx8IFtdXG5cbiAgICAgICAgaWYgKHByb2plY3RzRCkge1xuICAgICAgICAgICAgX3Byb2plY3RJZCA9IHByb2plY3RzRC5hdCgtMSkuX2lkICsgMTtcbiAgICAgICAgICAgIHByb2plY3RzRC5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgICAgIHByb2plY3RzRGJbcHJvamVjdC5faWRdID0gcHJvamVjdHNGKHByb2plY3QuX2lkLCBwcm9qZWN0Ll9uYW1lLCBwcm9qZWN0Ll9jYXRlZ29yeSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9kb3NELmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdG9kb3NELmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGlmICh0b2Rvc0RbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgX3RvZG9JZCA9IHRvZG9zRC5hdChpKS5faWRcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2Rvc0QuZm9yRWFjaCh0b2RvID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b2RvKVxuICAgICAgICAgICAgICAgIGlmICh0b2RvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZG9zRGJbdG9kby5faWRdID0gdG9kb3NGKHRvZG8uX2lkLCB0b2RvLl9wcm9qZWN0SWQsIHRvZG8uX3RpdGxlLCB0b2RvLl9kZXNjcmlwdGlvbiwgdG9kby5fZHVlRGF0ZSwgdG9kby5fcHJpb3JpdHksIHRvZG8uX3N0YXRlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuXG4gICAgfVxuICAgIGNvbnN0IF9zYXZlT25TdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICBsZXQgcHJvamVjdHNEID0gcHJvamVjdHNEYi5tYXAocHJvamVjdCA9PiBwcm9qZWN0LnJlYWQoKSlcbiAgICAgICAgbGV0IHRvZG9zRCA9IHRvZG9zRGIubWFwKHRvZG8gPT4gdG9kby5yZWFkKCkpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYicsIEpTT04uc3RyaW5naWZ5KHsgcHJvamVjdHNELCB0b2Rvc0QgfSkpXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0UHJvamVjdElkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gX3Byb2plY3RJZFxuICAgIH1cbiAgICBjb25zdCBfdXBkYXRlUHJvamVjdElkID0gKCkgPT4geyBfcHJvamVjdElkKysgfVxuXG4gICAgY29uc3QgX2dldFRvZG9JZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIF90b2RvSWRcbiAgICB9XG4gICAgY29uc3QgX3VwZGF0ZVRvZG9JZCA9ICgpID0+IHsgX3RvZG9JZCsrIH1cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAocHJvamVjdE5hbWUsIGNhdGVnb3J5KSA9PiB7XG4gICAgICAgIHByb2plY3RzRGJbZ2V0UHJvamVjdElkKCldID0gcHJvamVjdHNGKGdldFByb2plY3RJZCgpLCBwcm9qZWN0TmFtZSwgY2F0ZWdvcnkpO1xuICAgICAgICBfdXBkYXRlUHJvamVjdElkKCk7XG4gICAgICAgIF9zYXZlT25TdG9yYWdlKClcbiAgICB9XG4gICAgY29uc3QgY3JlYXRlVG9kbyA9IChwcm9qZWN0SWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICAgICAgdG9kb3NEYltfZ2V0VG9kb0lkKCldID0gdG9kb3NGKF9nZXRUb2RvSWQoKSwgcHJvamVjdElkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgX3VwZGF0ZVRvZG9JZCgpO1xuICAgICAgICBfc2F2ZU9uU3RvcmFnZSgpXG4gICAgfVxuXG5cbiAgICBjb25zdCByZW1vdmVQcm9qZWN0ID0gKGlkKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBwcm9qZWN0c0RiW2lkXVxuICAgICAgICBfc2F2ZU9uU3RvcmFnZSgpXG4gICAgfVxuICAgIGNvbnN0IHJlbW92ZVRvZG8gPSAoaWQpID0+IHtcbiAgICAgICAgZGVsZXRlIHRvZG9zRGJbaWRdXG4gICAgICAgIF9zYXZlT25TdG9yYWdlKClcbiAgICB9XG5cblxuICAgIGNvbnN0IHJlYWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7IHByb2plY3RzRGIsIHRvZG9zRGIgfVxuICAgIH1cblxuICAgIGNvbnN0IHVwZGF0ZVByb2plY3QgPSAoKSA9PiB7XG5cbiAgICB9XG4gICAgY29uc3QgdXBkYXRlRlRvZG8gPSAoZGF0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgdG9kb3NEYltpbmRleF0udXBkYXRlKGRhdGEudGl0bGUsIGRhdGEuZGVzY3JpcHRpb24sIGRhdGEuZHVlRGF0ZSwgZGF0YS5wcmlvcml0eSlcbiAgICAgICAgX3NhdmVPblN0b3JhZ2UoKVxuICAgIH1cbiAgICBjb25zdCB1cGRhdGVUb2RvU3RhdGUgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgdG9kb3NEYltpbmRleF0udG9nZ2xlU3RhdGUoKVxuICAgICAgICBfc2F2ZU9uU3RvcmFnZSgpXG4gICAgfVxuXG5cblxuICAgIHJldHVybiB7IGNyZWF0ZVByb2plY3QsIGNyZWF0ZVRvZG8sIHJlbW92ZVByb2plY3QsIHJlbW92ZVRvZG8sIHJlYWQsIHVwZGF0ZVByb2plY3QsIHVwZGF0ZVRvZG9TdGF0ZSwgcmV0cmlldmVEYXRhLCBnZXRQcm9qZWN0SWQsIHVwZGF0ZUZUb2RvIH1cbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBkb21Nb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgY2xlYXJQcm9qZWN0cyA9ICgpID0+IHtcbiAgICAgICAgbGV0IHVsRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xlYW51cCcpXG4gICAgICAgIHVsRWxlbWVudHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHdoaWxlIChpdGVtLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNoaWxkKGl0ZW0uZmlyc3RDaGlsZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cbiAgICBjb25zdCBjbGVhclRvZG9zID0gKCkgPT4ge1xuICAgICAgICBsZXQgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xlYW4nKVxuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgd2hpbGUgKGl0ZW0uZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2hpbGQoaXRlbS5maXJzdENoaWxkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHVwZGF0ZVByb2plY3RzID0gKHByb2plY3RzRGIsIHRvZG9zRGIpID0+IHtcbiAgICAgICAgY2xlYXJQcm9qZWN0cygpXG4gICAgICAgIHByb2plY3RzRGIuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICAgICAgbGV0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1saXN0ZW5lcicpXG5cbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdCA9IGVsZW1lbnQucmVhZCgpXG5cbiAgICAgICAgICAgIGxpc3RFbGVtZW50LmRhdGFzZXQuaWQgPSBjdXJyZW50UHJvamVjdC5faWRcblxuICAgICAgICAgICAgbGV0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gICAgICAgICAgICBsZXQgbmFtZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBuYW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtbmFtZScpXG4gICAgICAgICAgICBuYW1lQ29udGFpbmVyLnRleHRDb250ZW50ID0gY3VycmVudFByb2plY3QuX25hbWVcblxuICAgICAgICAgICAgbGV0IGNvdW50ZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY291bnRlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWNvdW50ZXInKVxuICAgICAgICAgICAgY291bnRlckNvbnRhaW5lci50ZXh0Q29udGVudCA9IHRvZG9zRGIuZmlsdGVyKHRvZG8gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2RvLnJlYWQoKS5fcHJvamVjdElkID09IGN1cnJlbnRQcm9qZWN0Ll9pZFxuICAgICAgICAgICAgfSkubGVuZ3RoXG5cbiAgICAgICAgICAgIGxpc3RFbGVtZW50LmFwcGVuZENoaWxkKGljb25Db250YWluZXIpXG4gICAgICAgICAgICBsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChuYW1lQ29udGFpbmVyKVxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY291bnRlckNvbnRhaW5lcilcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnByb2plY3RzLWxpc3QtJHtjdXJyZW50UHJvamVjdC5fY2F0ZWdvcnl9YCkuYXBwZW5kQ2hpbGQobGlzdEVsZW1lbnQpXG4gICAgICAgIH0pXG4gICAgICAgIHVwZGF0ZUNvdW50ZXJzKHByb2plY3RzRGIsIHRvZG9zRGIpXG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlQ291bnRlcnMgPSAocHJvamVjdHNEYiwgdG9kb3NEYikgPT4ge1xuICAgICAgICBsZXQgd29ya0NvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRlci1Xb3JrJylcbiAgICAgICAgd29ya0NvdW50ZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0c0RiLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnJlYWQoKS5fY2F0ZWdvcnkgPT0gJ1dvcmsnXG4gICAgICAgIH0pLmxlbmd0aFxuICAgICAgICBpZiAod29ya0NvdW50ZXIudGV4dENvbnRlbnQgPT0gMCkge1xuICAgICAgICAgICAgd29ya0NvdW50ZXIudGV4dENvbnRlbnQgPSAnJ1xuXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGVyc29uYWxDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50ZXItUGVyc29uYWwnKVxuICAgICAgICBwZXJzb25hbENvdW50ZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0c0RiLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnJlYWQoKS5fY2F0ZWdvcnkgPT0gJ1BlcnNvbmFsJ1xuICAgICAgICB9KS5sZW5ndGhcbiAgICAgICAgaWYgKHBlcnNvbmFsQ291bnRlci50ZXh0Q29udGVudCA9PSAwKSB7XG4gICAgICAgICAgICBwZXJzb25hbENvdW50ZXIudGV4dENvbnRlbnQgPSAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGhvbWVDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50ZXItSG9tZScpXG4gICAgICAgIGhvbWVDb3VudGVyLnRleHRDb250ZW50ID0gcHJvamVjdHNEYi5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5yZWFkKCkuX2NhdGVnb3J5ID09ICdIb21lJ1xuICAgICAgICB9KS5sZW5ndGhcbiAgICAgICAgaWYgKGhvbWVDb3VudGVyLnRleHRDb250ZW50ID09IDApIHtcbiAgICAgICAgICAgIGhvbWVDb3VudGVyLnRleHRDb250ZW50ID0gJydcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhbGxDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbC1jb3VudGVyJylcbiAgICAgICAgYWxsQ291bnRlci50ZXh0Q29udGVudCA9IHRvZG9zRGIubGVuZ3RoXG4gICAgICAgIGlmIChhbGxDb3VudGVyLnRleHRDb250ZW50ID09IDApIHtcbiAgICAgICAgICAgIGFsbENvdW50ZXIudGV4dENvbnRlbnQgPSAnJ1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZVRvZG9zID0gKHRvZG9zRGIsIHByb2plY3RzRGIsIGlzQ29uZGl0aW9uKSA9PiB7XG5cbiAgICAgICAgY2xlYXJUb2RvcygpXG4gICAgICAgIHRvZG9zRGIuZm9yRWFjaCh0b2RvID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICAgICAgICAgIGxldCBsaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGxldCBjdXJyZW50VG9kbyA9IHRvZG8ucmVhZCgpO1xuICAgICAgICAgICAgbGlzdEVsZW1lbnQuZGF0YXNldC5pZCA9IGN1cnJlbnRUb2RvLl9pZFxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuZGF0YXNldC5wcm9qZWN0SWQgPSBjdXJyZW50VG9kby5fcHJvamVjdElkXG4gICAgICAgICAgICBcblxuXG4gICAgICAgICAgICBsZXQgY2hlY2tCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgICAgICBjaGVja0JveC5jbGFzc0xpc3QuYWRkKCd0b2dnbGVTdGF0ZScpXG4gICAgICAgICAgICBjaGVja0JveC50eXBlID0gJ2NoZWNrYm94J1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudFRvZG8uX3N0YXRlKVxuICAgICAgICAgICAgY2hlY2tCb3guY2hlY2tlZCA9IGN1cnJlbnRUb2RvLl9zdGF0ZVxuXG4gICAgICAgICAgICBsZXQgc3ViQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIHN1YkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzdWItY29udGFpbmVyJylcblxuICAgICAgICAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcbiAgICAgICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGN1cnJlbnRUb2RvLl90aXRsZVxuXG4gICAgICAgICAgICBsZXQgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0JylcbiAgICAgICAgICAgIGRhdGUudGV4dENvbnRlbnQgPSBjdXJyZW50VG9kby5fZHVlRGF0ZVxuXG4gICAgICAgICAgICBsZXQgdG9kb09wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgdG9kb09wdGlvbnMuY2xhc3NMaXN0LmFkZCgndG9kby1vcHRpb25zLWNvbnRhaW5lcicpXG5cbiAgICAgICAgICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICAgICAgICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZWRpdC1idXR0b24nKVxuICAgICAgICAgICAgZWRpdEJ1dHRvbi5zcmMgPSAnZWRpdEljb24uc3ZnJ1xuXG4gICAgICAgICAgICBsZXQgZmF2b3JpdGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgICAgICAgICAgZmF2b3JpdGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLWJ1dHRvbicpXG4gICAgICAgICAgICBmYXZvcml0ZUJ1dHRvbi5zcmMgPSAnZGVsZXRlSWNvbi5zdmcnXG5cbiAgICAgICAgICAgIGxldCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgICAgICAgICAgZGVsZXRlQnV0dG9uLnNyYyA9ICdmYXZvcml0ZUljb24uc3ZnJ1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hlY2tCb3gpXG4gICAgICAgICAgICBzdWJDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKVxuICAgICAgICAgICAgc3ViQ29udGFpbmVyLmFwcGVuZENoaWxkKGRhdGUpXG5cbiAgICAgICAgICAgIGlmIChpc0NvbmRpdGlvbikge1xuICAgICAgICAgICAgICAgIGxldCBwcmlvcml0eUMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNScpXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDLnRleHRDb250ZW50ID0gY3VycmVudFRvZG8uX3ByaW9yaXR5XG4gICAgICAgICAgICAgICAgcHJpb3JpdHlDLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgJHtjdXJyZW50VG9kby5fcHJpb3JpdHl9YCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJvamVjdElkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKVxuICAgICAgICAgICAgICAgIHByb2plY3RJZC50ZXh0Q29udGVudCA9IHByb2plY3RzRGJbY3VycmVudFRvZG8uX3Byb2plY3RJZF0ucmVhZCgpLl9jYXRlZ29yeVxuXG4gICAgICAgICAgICAgICAgbGV0IHRhZ3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIHRhZ3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFncy1jb250YWluZXInKVxuXG4gICAgICAgICAgICAgICAgdGFnc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcmlvcml0eUMpXG4gICAgICAgICAgICAgICAgdGFnc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SWQpXG4gICAgICAgICAgICAgICAgc3ViQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhZ3NDb250YWluZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJpb3JpdHlDID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDUnKVxuICAgICAgICAgICAgICAgIHByaW9yaXR5Qy50ZXh0Q29udGVudCA9IGN1cnJlbnRUb2RvLl9wcmlvcml0eVxuICAgICAgICAgICAgICAgIHByaW9yaXR5Qy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYCR7Y3VycmVudFRvZG8uX3ByaW9yaXR5fWApO1xuICAgICAgICAgICAgICAgIHN1YkNvbnRhaW5lci5hcHBlbmRDaGlsZChwcmlvcml0eUMpXG4gICAgICAgICAgICAgICAgdG9kb09wdGlvbnMuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvZG9PcHRpb25zLmFwcGVuZENoaWxkKGZhdm9yaXRlQnV0dG9uKVxuICAgICAgICAgICAgdG9kb09wdGlvbnMuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKVxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoc3ViQ29udGFpbmVyKVxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQodG9kb09wdGlvbnMpXG4gICAgICAgICAgICB1cGRhdGVDb3VudGVycyhwcm9qZWN0c0RiLCB0b2Rvc0RiKVxuXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3MtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQobGlzdEVsZW1lbnQpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGNvbnN0IHN0YXJ0RWRpdCA9ICh0b2RvKSA9PntcbiAgICAgICAgdG9kbyA9IHRvZG8ucmVhZCgpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tdGV4dCcpLnRleHRDb250ZW50ID0gJ0VkaXQnXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZS1mb3JtJykuZm9jdXMoKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUtZm9ybScpLnZhbHVlID0gdG9kby5fdGl0bGVcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5LWZvcm0nKS52YWx1ZSA9IHRvZG8uX3ByaW9yaXR5XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlLWZvcm0nKS52YWx1ZSA9IHRvZG8uX2R1ZURhdGVcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uLWZvcm0nKS52YWx1ZSA9IHRvZG8uX2Rlc2NyaXB0aW9uXG4gICAgfVxuXG5cbiAgICByZXR1cm4geyB1cGRhdGVQcm9qZWN0cywgdXBkYXRlVG9kb3MsIHVwZGF0ZUNvdW50ZXJzLCBzdGFydEVkaXR9XG59KSgpXG5cbiIsIi8vQ3JlYXRpb24sIHJlYWRpbmcgYW5kIHVwZGF0aW5nIG9mIHRoZSBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IChpZCxuYW1lLCBjYXRlZ29yeSkgPT4ge1xuICAgIGxldCBfaWQgPSBpZFxuICAgIGxldCBfbmFtZSA9IG5hbWU7XG4gICAgbGV0IF9kYXRlID0gbmV3IERhdGUoKVxuICAgIGxldCBfY2F0ZWdvcnkgPSBjYXRlZ29yeTtcblxuICAgIGNvbnN0IHJlYWQgPSAoKT0+e1xuICAgICAgICByZXR1cm4ge19pZCxfbmFtZSwgX2RhdGUsIF9jYXRlZ29yeX1cbiAgICB9XG5cblxuICAgIGNvbnN0IHVwZGF0ZSA9IChuZXdOYW1lLCBuZXdDYXRlZ29yeSk9PntcbiAgICAgICAgX25hbWUgPSBuZXdOYW1lXG4gICAgICAgIF9jYXRlZ29yeSA9IG5ld0NhdGVnb3J5XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7cmVhZCwgdXBkYXRlfVxufSIsIi8vdG9kb3MgZmFjdG9yeSBmdW5jdGlvblxuZXhwb3J0IGRlZmF1bHQgKGlkLCBwcm9qZWN0SWQsdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgc3RhdGUpPT57XG4gICAgLy9PYmplY3QgdmFsdWVzXG4gICAgbGV0IF9wcm9qZWN0SWQgPSBwcm9qZWN0SWRcbiAgICBsZXQgX2lkID0gaWRcbiAgICBsZXQgX3RpdGxlID0gdGl0bGU7XG4gICAgbGV0IF9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIGxldCBfZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgbGV0IF9wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIGxldCBfc3RhdGUgPSBzdGF0ZTtcbiAgICBsZXQgX2lzRmF2b3JpdGUgPSBmYWxzZTtcblxuICAgIGNvbnN0IHRvZ2dsZUZhdm9yaXRlID0gKCkgPT57XG4gICAgICAgIF9pc0Zhdm9yaXRlID0gX2lzRmF2b3JpdGUgPyBmYWxzZSA6IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IHJlYWQgPSAoKSA9PntcbiAgICAgICAgcmV0dXJue190aXRsZSwgX2Rlc2NyaXB0aW9uLCBfZHVlRGF0ZSwgX3ByaW9yaXR5LCBfaWQsIF9wcm9qZWN0SWQsIF9zdGF0ZX1cbiAgICB9XG4gICAgXG5cbiAgICBjb25zdCB1cGRhdGUgPSAobmV3TmFtZSwgbmV3RGVzY3JpcHRpb24sIG5ld0R1ZURhdGUsIG5ld1ByaW9yaXR5KSA9PntcbiAgICAgICAgX3RpdGxlID0gbmV3TmFtZTtcbiAgICAgICAgX2Rlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gICAgICAgIF9kdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICAgICAgX3ByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4gICAgfVxuICAgIGNvbnN0IHRvZ2dsZVN0YXRlID0gKCkgPT57XG4gICAgICAgIF9zdGF0ZSA9IF9zdGF0ZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHtyZWFkLCB1cGRhdGUsIHRvZ2dsZVN0YXRlLCB0b2dnbGVGYXZvcml0ZX1cbn1cblxuXG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcHJvamVjdE1vZHVsZSwgZG9tTW9kdWxlIH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcbmxldCBpbmRleDtcbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3RGb3JtJylcbnByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFkZFByb2plY3QpXG5cbmNvbnN0IHRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG9zLWZvcm0nKVxudG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYWRkVG9kbylcblxuY29uc3QgYWxsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsbC1idXR0b24nKVxuYWxsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0FsbFRvZG9zKVxubGV0IGN1cnJlbnRTZWxlY3RlZDtcblxucHJvamVjdE1vZHVsZS5yZXRyaWV2ZURhdGEoKVxuc2hvd0FsbFRvZG9zKClcbnJlbmV3TGlzdGVuZXJzKClcblxuZnVuY3Rpb24gc2hvd0FsbFRvZG9zKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICB9XG4gICAgbGV0IG1haW5IZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1oZWFkZXInKVxuICAgIG1haW5IZWFkZXIudGV4dENvbnRlbnQgPSAnRnVsbCB0by1kbyBsaXN0J1xuXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVByb2plY3RzKHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIpXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVRvZG9zKHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIsIHRydWUpXG4gICAgcmVuZXdMaXN0ZW5lcnMoKVxuICAgIHRvZG9Gb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxuICAgIHRvZG9Gb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGxldCBkYXRhID0gT2JqZWN0LmZyb21FbnRyaWVzKG5ldyBGb3JtRGF0YShldmVudC50YXJnZXQpLmVudHJpZXMoKSlcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2VNb2RhbCcpLmNsaWNrKClcbiAgICBjdXJyZW50U2VsZWN0ZWQgPSBwcm9qZWN0TW9kdWxlLmdldFByb2plY3RJZCgpXG4gICAgcHJvamVjdE1vZHVsZS5jcmVhdGVQcm9qZWN0KGRhdGEucHJvamVjdE5hbWUsIGRhdGEuY2F0ZWdvcnkpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZGF0YS5jYXRlZ29yeX0taW5wdXRgKS5jaGVja2VkID0gdHJ1ZVxuXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVByb2plY3RzKHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIpXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVRvZG9zKHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIpXG4gICAgcmVuZXdMaXN0ZW5lcnMoKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9JyR7Y3VycmVudFNlbGVjdGVkfSddYCkuY2xpY2soKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5jbGFzc0xpc3QuYWRkKCdzaG93JylcblxuXG4gICAgZXZlbnQudGFyZ2V0LnJlc2V0KClcbn1cbmZ1bmN0aW9uIGFkZFRvZG8oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbGV0IGRhdGEgPSBPYmplY3QuZnJvbUVudHJpZXMobmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCkuZW50cmllcygpKVxuICAgIHByb2plY3RNb2R1bGUuY3JlYXRlVG9kbyhjdXJyZW50U2VsZWN0ZWQsIGRhdGEudGl0bGUsIGRhdGEuZGVzY3JpcHRpb24sIGRhdGEuZHVlRGF0ZSwgZGF0YS5wcmlvcml0eSlcblxuICAgIGRvbU1vZHVsZS51cGRhdGVUb2Rvcyhwcm9qZWN0TW9kdWxlLnJlYWQoKS50b2Rvc0RiLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiKVxuICAgIGRvbU1vZHVsZS51cGRhdGVQcm9qZWN0cyhwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS50b2Rvc0RiKVxuICAgIHJlbmV3TGlzdGVuZXJzKClcblxuICAgIGV2ZW50LnRhcmdldC5yZXNldCgpXG59XG5cbmZ1bmN0aW9uIHNob3dTZWxlY3RlZChldmVudCkge1xuICAgIGN1cnJlbnRTZWxlY3RlZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICBkb21Nb2R1bGUudXBkYXRlUHJvamVjdHMocHJvamVjdE1vZHVsZS5yZWFkKCkucHJvamVjdHNEYiwgcHJvamVjdE1vZHVsZS5yZWFkKCkudG9kb3NEYilcbiAgICBkb21Nb2R1bGUudXBkYXRlVG9kb3MocHJvamVjdE1vZHVsZS5yZWFkKCkudG9kb3NEYi5maWx0ZXIodG9kbyA9PiB7XG4gICAgICAgIHJldHVybiB0b2RvLnJlYWQoKS5fcHJvamVjdElkID09IGN1cnJlbnRTZWxlY3RlZFxuICAgIH0pLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiKVxuICAgIGxldCBtYWluSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4taGVhZGVyJylcbiAgICBtYWluSGVhZGVyLnRleHRDb250ZW50ID0gcHJvamVjdE1vZHVsZS5yZWFkKCkucHJvamVjdHNEYltjdXJyZW50U2VsZWN0ZWRdLnJlYWQoKS5fbmFtZVxuICAgIHJlbmV3TGlzdGVuZXJzKClcbiAgICB0b2RvRm9ybS5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICB0b2RvRm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcbn1cbmZ1bmN0aW9uIHJlbmV3TGlzdGVuZXJzKCkge1xuICAgIGxldCBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtbGlzdGVuZXInKVxuICAgIGVsZW0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dTZWxlY3RlZClcbiAgICB9KVxuICAgIGxldCBzdGF0ZUlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2dnbGVTdGF0ZScpXG4gICAgc3RhdGVJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRvZ2dsZVN0YXRlKVxuICAgIH0pXG4gICAgbGV0IGRlbGV0ZUIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsZXRlLWJ1dHRvbicpXG4gICAgZGVsZXRlQi5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbGV0ZVRvZG8pXG4gICAgfSlcbiAgICBsZXQgZWRpdEIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdC1idXR0b24nKVxuICAgIGVkaXRCLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWRpdFRvZG8pXG4gICAgfSlcbn1cbmZ1bmN0aW9uIGRlbGV0ZVRvZG8oZXZlbnQpIHtcbiAgICBsZXQgaW5kZXggPSBldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0XG4gICAgcHJvamVjdE1vZHVsZS5yZW1vdmVUb2RvKGluZGV4LmlkKVxuICAgIGRvbU1vZHVsZS51cGRhdGVQcm9qZWN0cyhwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS50b2Rvc0RiKVxuICAgIGRvbU1vZHVsZS51cGRhdGVUb2Rvcyhwcm9qZWN0TW9kdWxlLnJlYWQoKS50b2Rvc0RiLmZpbHRlcih0b2RvID0+IHtcbiAgICAgICAgcmV0dXJuIHRvZG8ucmVhZCgpLl9wcm9qZWN0SWQgPSBpbmRleC5wcm9qZWN0SWRcbiAgICB9KSlcbiAgICByZW5ld0xpc3RlbmVycygpXG59XG5mdW5jdGlvbiBlZGl0VG9kbyhldmVudCkge1xuICAgIGluZGV4ID0gZXZlbnQuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldFxuXG4gICAgdG9kb0Zvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYWRkVG9kbylcbiAgICB0b2RvRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBtYW5hZ2VFZGl0KVxuXG4gICAgZG9tTW9kdWxlLnN0YXJ0RWRpdChwcm9qZWN0TW9kdWxlLnJlYWQoKS50b2Rvc0RiW2luZGV4LmlkXSlcbn1cbmZ1bmN0aW9uIG1hbmFnZUVkaXQoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBsZXQgZGF0YSA9IE9iamVjdC5mcm9tRW50cmllcyhuZXcgRm9ybURhdGEoZXZlbnQudGFyZ2V0KS5lbnRyaWVzKCkpXG4gICAgcHJvamVjdE1vZHVsZS51cGRhdGVGVG9kbyhkYXRhLCBpbmRleC5pZClcblxuICAgIHRvZG9Gb3JtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG1hbmFnZUVkaXQpXG4gICAgdG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYWRkVG9kbylcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXRleHQnKS50ZXh0Q29udGVudCA9ICdEb25lJ1xuXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVByb2plY3RzKHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIsIHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIpXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVRvZG9zKHByb2plY3RNb2R1bGUucmVhZCgpLnRvZG9zRGIuZmlsdGVyKHRvZG8gPT4ge1xuICAgICAgICByZXR1cm4gdG9kby5yZWFkKCkuX3Byb2plY3RJZCA9IGluZGV4LnByb2plY3RJZFxuICAgIH0pLCBwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiKVxuICAgIHJlbmV3TGlzdGVuZXJzKClcbiAgICBldmVudC50YXJnZXQucmVzZXQoKVxufVxuZnVuY3Rpb24gdG9nZ2xlU3RhdGUoZXZlbnQpIHtcbiAgICBsZXQgaW5kZXggPSBldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZFxuICAgIHByb2plY3RNb2R1bGUudXBkYXRlVG9kb1N0YXRlKGluZGV4KVxufVxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=