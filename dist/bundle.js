/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
const mainHeader = document.querySelector('.main-header')
;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {
    let currentSelected;
    const getCurrentSelected = () => {
        return currentSelected
    }
    const clearProjects = () =>{
        let ulElements = document.querySelectorAll('.cleanup')
        ulElements.forEach(item =>{
            while(item.firstChild){
                item.removeChild(item.firstChild)
            }
        })

    }
    const clearTodos = () => {
        let elements = document.querySelectorAll('.clean')
        elements.forEach(item=>{
            while(item.firstChild){
                item.removeChild(item.firstChild)
            }
        })
    }
    const updateProjects = (projectsDb) =>{
        clearProjects()
        projectsDb.forEach(element => {
            
            let listElement = document.createElement('li')
            listElement.addEventListener('click', showSelectedSection)
            let currentProject = element.read()
            
            listElement.dataset.id = currentProject._id

            let iconContainer = document.createElement('div')

            let nameContainer = document.createElement('div')
            nameContainer.classList.add('project-name')
            nameContainer.textContent = currentProject._name

            let counterContainer = document.createElement('div')
            counterContainer.classList.add('project-counter')
            counterContainer.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].counter(currentProject._id)

            listElement.appendChild(iconContainer)
            listElement.appendChild(nameContainer)
            listElement.appendChild(counterContainer)

            console.log(currentProject._category)
            document.querySelector(`.projects-list-${currentProject._category}`).appendChild(listElement)
        })
        
    }
    const showSelectedSection = (event) => {
        document.querySelector('main').classList.add('show')
        currentSelected = event.currentTarget.dataset.id
        console.log(currentSelected)
        updateTodos(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].read().todosDb.filter(crr=>{
            return currentSelected == crr.read()._projectId
        }))
    }
    const updateTodos = (todosDb) => {
        clearTodos()
        for(const item in todosDb){
            let listElement = document.createElement('li')
            let currentTodo = todosDb[item].read();

            let checkBox = document.createElement('input')
            checkBox.type = 'checkbox'
            checkBox.checked = currentTodo._state 

            let subContainer = document.createElement('div')
            subContainer.classList.add('sub-container')
        
            let header = document.createElement('h2')
            header.textContent = currentTodo._title
            console.log(currentTodo)

            let date = document.createElement('h4')
            date.textContent = currentTodo._dueDate

            let priorityC = document.createElement('h5')
            priorityC.textContent = currentTodo._priority
            priorityC.setAttribute('class', `${currentTodo._priority}`);

            listElement.appendChild(checkBox)
            subContainer.appendChild(header)
            subContainer.appendChild(date)
            subContainer.appendChild(priorityC)
            listElement.appendChild(subContainer)

            document.querySelector('.todos-container').appendChild(listElement)
        }
        


    }

    return {updateProjects, updateTodos, getCurrentSelected}
})());



    

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _todosFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todosFactory */ "./src/todosFactory.js");
/* harmony import */ var _projectsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectsFactory */ "./src/projectsFactory.js");



//Manager module for all projects
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function(){

    let _projectId = 0;
    let _todoId = 0;

    const projectsDb = [];
    const todosDb = [];

    const _getProjectId = () => {
        return _projectId
    }
    const _updateProjectId = () =>{_projectId++}

    const _getTodoId = () => {
        return _todoId
    }
    const _updateTodoId = () => {_todoId++}


    const createProject = (projectName, category, todosDb) => {
        projectsDb[_getProjectId()] = (0,_projectsFactory__WEBPACK_IMPORTED_MODULE_1__["default"])(_getProjectId(), projectName, category, todosDb);
        _updateProjectId();
    }
    const createTodo = (projectId, title, description, dueDate, priority) => {
        todosDb[_getTodoId()] = (0,_todosFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(_getTodoId(), projectId, title, description, dueDate, priority);
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
    const counter = (id) => {
        return todosDb.filter(item=>{
            return item.read()._projectId == id
        }).length
    }

    const updateProject = () => {
       
    }
    const updateTodo = () => {
       
    }

    

    return{createProject, createTodo, removeProject, removeTodo, read, updateProject, updateTodo, counter}
})());




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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((id, projectId,title, description, dueDate, priority)=>{
    //Object values
    let _projectId = projectId
    let _id = id
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _state = false;

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
    return {read, update, toggleState}
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
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



const projectForm = document.querySelector('#projectForm')
projectForm.addEventListener('submit', addProject)

const todoForm = document.querySelector('#todos-form')
todoForm.addEventListener('submit', addTodo)

function addProject(event){
    event.preventDefault()
    let data = Object.fromEntries(new FormData(event.target).entries())
    document.querySelector('.closeModal').click()

    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].createProject(data.projectName, data.category)
    document.querySelector(`#${data.category}-input`).checked = true
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].updateProjects(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].read().projectsDb)

    event.target.reset()
}
function addTodo(event){
    event.preventDefault()
    let data = Object.fromEntries(new FormData(event.target).entries())

    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].createTodo(_dom__WEBPACK_IMPORTED_MODULE_1__["default"].getCurrentSelected(), data.title, data.description, data.dueDate, data.priority)

    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].updateTodos(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].read().todosDb.filter(crr=>{
        return _dom__WEBPACK_IMPORTED_MODULE_1__["default"].getCurrentSelected() == crr.read()._projectId
    }))
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].updateProjects(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].read().projectsDb)

    event.target.reset()
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsQ0FBaUM7O0FBRWpDLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDLHlEQUFnQjs7QUFFM0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EscURBQXFELHlCQUF5QjtBQUM5RSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNEQUFhO0FBQ2pDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDQUErQyxzQkFBc0I7O0FBRXJFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxZQUFZO0FBQ1osQ0FBQyxHQUFHOzs7O0FBSUo7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4R29DO0FBQ0s7O0FBRXpDO0FBQ0EsaUVBQWU7O0FBRWY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDOzs7QUFHakM7QUFDQSxzQ0FBc0MsNERBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHlEQUFNO0FBQ3RDO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFdBQVc7QUFDWCxDQUFDLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNURKO0FBQ0EsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOzs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDOzs7Ozs7Ozs7O1VDMUJEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnVDO0FBQ1Q7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLCtEQUEyQjtBQUMvQiwrQkFBK0IsY0FBYztBQUM3QyxJQUFJLDJEQUF3QixDQUFDLHNEQUFrQjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLDREQUF3QixDQUFDLCtEQUE0Qjs7QUFFekQsSUFBSSx3REFBcUIsQ0FBQyxzREFBa0I7QUFDNUMsZUFBZSwrREFBNEI7QUFDM0MsS0FBSztBQUNMLElBQUksMkRBQXdCLENBQUMsc0RBQWtCOztBQUUvQztBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0LXByb2plY3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3Byb2plY3RzRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QtcHJvamVjdC8uL3NyYy90b2Rvc0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QtcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtYWluSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4taGVhZGVyJylcbmltcG9ydCBwcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0c1wiXG5cbmV4cG9ydCBkZWZhdWx0ICgoKSA9PiB7XG4gICAgbGV0IGN1cnJlbnRTZWxlY3RlZDtcbiAgICBjb25zdCBnZXRDdXJyZW50U2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjdXJyZW50U2VsZWN0ZWRcbiAgICB9XG4gICAgY29uc3QgY2xlYXJQcm9qZWN0cyA9ICgpID0+e1xuICAgICAgICBsZXQgdWxFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbGVhbnVwJylcbiAgICAgICAgdWxFbGVtZW50cy5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICB3aGlsZShpdGVtLmZpcnN0Q2hpbGQpe1xuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2hpbGQoaXRlbS5maXJzdENoaWxkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuICAgIGNvbnN0IGNsZWFyVG9kb3MgPSAoKSA9PiB7XG4gICAgICAgIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbGVhbicpXG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgd2hpbGUoaXRlbS5maXJzdENoaWxkKXtcbiAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNoaWxkKGl0ZW0uZmlyc3RDaGlsZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgY29uc3QgdXBkYXRlUHJvamVjdHMgPSAocHJvamVjdHNEYikgPT57XG4gICAgICAgIGNsZWFyUHJvamVjdHMoKVxuICAgICAgICBwcm9qZWN0c0RiLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBsaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGxpc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1NlbGVjdGVkU2VjdGlvbilcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJvamVjdCA9IGVsZW1lbnQucmVhZCgpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxpc3RFbGVtZW50LmRhdGFzZXQuaWQgPSBjdXJyZW50UHJvamVjdC5faWRcblxuICAgICAgICAgICAgbGV0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gICAgICAgICAgICBsZXQgbmFtZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBuYW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtbmFtZScpXG4gICAgICAgICAgICBuYW1lQ29udGFpbmVyLnRleHRDb250ZW50ID0gY3VycmVudFByb2plY3QuX25hbWVcblxuICAgICAgICAgICAgbGV0IGNvdW50ZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY291bnRlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWNvdW50ZXInKVxuICAgICAgICAgICAgY291bnRlckNvbnRhaW5lci50ZXh0Q29udGVudCA9IHByb2plY3RzLmNvdW50ZXIoY3VycmVudFByb2plY3QuX2lkKVxuXG4gICAgICAgICAgICBsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChpY29uQ29udGFpbmVyKVxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQobmFtZUNvbnRhaW5lcilcbiAgICAgICAgICAgIGxpc3RFbGVtZW50LmFwcGVuZENoaWxkKGNvdW50ZXJDb250YWluZXIpXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0Ll9jYXRlZ29yeSlcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wcm9qZWN0cy1saXN0LSR7Y3VycmVudFByb2plY3QuX2NhdGVnb3J5fWApLmFwcGVuZENoaWxkKGxpc3RFbGVtZW50KVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG4gICAgY29uc3Qgc2hvd1NlbGVjdGVkU2VjdGlvbiA9IChldmVudCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJykuY2xhc3NMaXN0LmFkZCgnc2hvdycpXG4gICAgICAgIGN1cnJlbnRTZWxlY3RlZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50U2VsZWN0ZWQpXG4gICAgICAgIHVwZGF0ZVRvZG9zKHByb2plY3RzLnJlYWQoKS50b2Rvc0RiLmZpbHRlcihjcnI9PntcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50U2VsZWN0ZWQgPT0gY3JyLnJlYWQoKS5fcHJvamVjdElkXG4gICAgICAgIH0pKVxuICAgIH1cbiAgICBjb25zdCB1cGRhdGVUb2RvcyA9ICh0b2Rvc0RiKSA9PiB7XG4gICAgICAgIGNsZWFyVG9kb3MoKVxuICAgICAgICBmb3IoY29uc3QgaXRlbSBpbiB0b2Rvc0RiKXtcbiAgICAgICAgICAgIGxldCBsaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGxldCBjdXJyZW50VG9kbyA9IHRvZG9zRGJbaXRlbV0ucmVhZCgpO1xuXG4gICAgICAgICAgICBsZXQgY2hlY2tCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgICAgICBjaGVja0JveC50eXBlID0gJ2NoZWNrYm94J1xuICAgICAgICAgICAgY2hlY2tCb3guY2hlY2tlZCA9IGN1cnJlbnRUb2RvLl9zdGF0ZSBcblxuICAgICAgICAgICAgbGV0IHN1YkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBzdWJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc3ViLWNvbnRhaW5lcicpXG4gICAgICAgIFxuICAgICAgICAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcbiAgICAgICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGN1cnJlbnRUb2RvLl90aXRsZVxuICAgICAgICAgICAgY29uc29sZS5sb2coY3VycmVudFRvZG8pXG5cbiAgICAgICAgICAgIGxldCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKVxuICAgICAgICAgICAgZGF0ZS50ZXh0Q29udGVudCA9IGN1cnJlbnRUb2RvLl9kdWVEYXRlXG5cbiAgICAgICAgICAgIGxldCBwcmlvcml0eUMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNScpXG4gICAgICAgICAgICBwcmlvcml0eUMudGV4dENvbnRlbnQgPSBjdXJyZW50VG9kby5fcHJpb3JpdHlcbiAgICAgICAgICAgIHByaW9yaXR5Qy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYCR7Y3VycmVudFRvZG8uX3ByaW9yaXR5fWApO1xuXG4gICAgICAgICAgICBsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChjaGVja0JveClcbiAgICAgICAgICAgIHN1YkNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpXG4gICAgICAgICAgICBzdWJDb250YWluZXIuYXBwZW5kQ2hpbGQoZGF0ZSlcbiAgICAgICAgICAgIHN1YkNvbnRhaW5lci5hcHBlbmRDaGlsZChwcmlvcml0eUMpXG4gICAgICAgICAgICBsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChzdWJDb250YWluZXIpXG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2Rvcy1jb250YWluZXInKS5hcHBlbmRDaGlsZChsaXN0RWxlbWVudClcbiAgICAgICAgfVxuICAgICAgICBcblxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHt1cGRhdGVQcm9qZWN0cywgdXBkYXRlVG9kb3MsIGdldEN1cnJlbnRTZWxlY3RlZH1cbn0pKClcblxuXG5cbiAgICAiLCJpbXBvcnQgdG9kb3NGIGZyb20gXCIuL3RvZG9zRmFjdG9yeVwiO1xuaW1wb3J0IHByb2plY3RzRiBmcm9tIFwiLi9wcm9qZWN0c0ZhY3RvcnlcIlxuXG4vL01hbmFnZXIgbW9kdWxlIGZvciBhbGwgcHJvamVjdHNcbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbigpe1xuXG4gICAgbGV0IF9wcm9qZWN0SWQgPSAwO1xuICAgIGxldCBfdG9kb0lkID0gMDtcblxuICAgIGNvbnN0IHByb2plY3RzRGIgPSBbXTtcbiAgICBjb25zdCB0b2Rvc0RiID0gW107XG5cbiAgICBjb25zdCBfZ2V0UHJvamVjdElkID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gX3Byb2plY3RJZFxuICAgIH1cbiAgICBjb25zdCBfdXBkYXRlUHJvamVjdElkID0gKCkgPT57X3Byb2plY3RJZCsrfVxuXG4gICAgY29uc3QgX2dldFRvZG9JZCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIF90b2RvSWRcbiAgICB9XG4gICAgY29uc3QgX3VwZGF0ZVRvZG9JZCA9ICgpID0+IHtfdG9kb0lkKyt9XG5cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3QgPSAocHJvamVjdE5hbWUsIGNhdGVnb3J5LCB0b2Rvc0RiKSA9PiB7XG4gICAgICAgIHByb2plY3RzRGJbX2dldFByb2plY3RJZCgpXSA9IHByb2plY3RzRihfZ2V0UHJvamVjdElkKCksIHByb2plY3ROYW1lLCBjYXRlZ29yeSwgdG9kb3NEYik7XG4gICAgICAgIF91cGRhdGVQcm9qZWN0SWQoKTtcbiAgICB9XG4gICAgY29uc3QgY3JlYXRlVG9kbyA9IChwcm9qZWN0SWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcbiAgICAgICAgdG9kb3NEYltfZ2V0VG9kb0lkKCldID0gdG9kb3NGKF9nZXRUb2RvSWQoKSwgcHJvamVjdElkLCB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgX3VwZGF0ZVRvZG9JZCgpO1xuICAgIH1cblxuXG4gICAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IChpZCkgPT4ge1xuICAgICAgICBkZWxldGUgcHJvamVjdHNEYltpZF1cbiAgICB9XG4gICAgY29uc3QgcmVtb3ZlVG9kbyA9IChpZCkgPT4ge1xuICAgICAgICBkZWxldGUgdG9kb3NEYltpZF0gICBcbiAgICB9XG5cblxuICAgIGNvbnN0IHJlYWQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7cHJvamVjdHNEYiwgdG9kb3NEYn1cbiAgICB9XG4gICAgY29uc3QgY291bnRlciA9IChpZCkgPT4ge1xuICAgICAgICByZXR1cm4gdG9kb3NEYi5maWx0ZXIoaXRlbT0+e1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucmVhZCgpLl9wcm9qZWN0SWQgPT0gaWRcbiAgICAgICAgfSkubGVuZ3RoXG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlUHJvamVjdCA9ICgpID0+IHtcbiAgICAgICBcbiAgICB9XG4gICAgY29uc3QgdXBkYXRlVG9kbyA9ICgpID0+IHtcbiAgICAgICBcbiAgICB9XG5cbiAgICBcblxuICAgIHJldHVybntjcmVhdGVQcm9qZWN0LCBjcmVhdGVUb2RvLCByZW1vdmVQcm9qZWN0LCByZW1vdmVUb2RvLCByZWFkLCB1cGRhdGVQcm9qZWN0LCB1cGRhdGVUb2RvLCBjb3VudGVyfVxufSkoKVxuXG5cbiIsIi8vQ3JlYXRpb24sIHJlYWRpbmcgYW5kIHVwZGF0aW5nIG9mIHRoZSBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IChpZCxuYW1lLCBjYXRlZ29yeSkgPT4ge1xuICAgIGxldCBfaWQgPSBpZFxuICAgIGxldCBfbmFtZSA9IG5hbWU7XG4gICAgbGV0IF9kYXRlID0gbmV3IERhdGUoKVxuICAgIGxldCBfY2F0ZWdvcnkgPSBjYXRlZ29yeTtcblxuICAgIGNvbnN0IHJlYWQgPSAoKT0+e1xuICAgICAgICByZXR1cm4ge19pZCxfbmFtZSwgX2RhdGUsIF9jYXRlZ29yeX1cbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGUgPSAobmV3TmFtZSwgbmV3Q2F0ZWdvcnkpPT57XG4gICAgICAgIF9uYW1lID0gbmV3TmFtZVxuICAgICAgICBfY2F0ZWdvcnkgPSBuZXdDYXRlZ29yeVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge3JlYWQsIHVwZGF0ZX1cbn0iLCIvL3RvZG9zIGZhY3RvcnkgZnVuY3Rpb25cbmV4cG9ydCBkZWZhdWx0IChpZCwgcHJvamVjdElkLHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpPT57XG4gICAgLy9PYmplY3QgdmFsdWVzXG4gICAgbGV0IF9wcm9qZWN0SWQgPSBwcm9qZWN0SWRcbiAgICBsZXQgX2lkID0gaWRcbiAgICBsZXQgX3RpdGxlID0gdGl0bGU7XG4gICAgbGV0IF9kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIGxldCBfZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgbGV0IF9wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIGxldCBfc3RhdGUgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJlYWQgPSAoKSA9PntcbiAgICAgICAgcmV0dXJue190aXRsZSwgX2Rlc2NyaXB0aW9uLCBfZHVlRGF0ZSwgX3ByaW9yaXR5LCBfaWQsIF9wcm9qZWN0SWQsIF9zdGF0ZX1cbiAgICB9XG4gICAgXG5cbiAgICBjb25zdCB1cGRhdGUgPSAobmV3TmFtZSwgbmV3RGVzY3JpcHRpb24sIG5ld0R1ZURhdGUsIG5ld1ByaW9yaXR5KSA9PntcbiAgICAgICAgX3RpdGxlID0gbmV3TmFtZTtcbiAgICAgICAgX2Rlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gICAgICAgIF9kdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICAgICAgX3ByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4gICAgfVxuICAgIGNvbnN0IHRvZ2dsZVN0YXRlID0gKCkgPT57XG4gICAgICAgIF9zdGF0ZSA9IF9zdGF0ZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHtyZWFkLCB1cGRhdGUsIHRvZ2dsZVN0YXRlfVxufVxuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgcHJvamVjdE1vZHVsZSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IGRvbU1vZHVsZSBmcm9tIFwiLi9kb21cIjtcblxuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdEZvcm0nKVxucHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYWRkUHJvamVjdClcblxuY29uc3QgdG9kb0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kb3MtZm9ybScpXG50b2RvRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhZGRUb2RvKVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0KGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbGV0IGRhdGEgPSBPYmplY3QuZnJvbUVudHJpZXMobmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCkuZW50cmllcygpKVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZU1vZGFsJykuY2xpY2soKVxuXG4gICAgcHJvamVjdE1vZHVsZS5jcmVhdGVQcm9qZWN0KGRhdGEucHJvamVjdE5hbWUsIGRhdGEuY2F0ZWdvcnkpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7ZGF0YS5jYXRlZ29yeX0taW5wdXRgKS5jaGVja2VkID0gdHJ1ZVxuICAgIGRvbU1vZHVsZS51cGRhdGVQcm9qZWN0cyhwcm9qZWN0TW9kdWxlLnJlYWQoKS5wcm9qZWN0c0RiKVxuXG4gICAgZXZlbnQudGFyZ2V0LnJlc2V0KClcbn1cbmZ1bmN0aW9uIGFkZFRvZG8oZXZlbnQpe1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBsZXQgZGF0YSA9IE9iamVjdC5mcm9tRW50cmllcyhuZXcgRm9ybURhdGEoZXZlbnQudGFyZ2V0KS5lbnRyaWVzKCkpXG5cbiAgICBwcm9qZWN0TW9kdWxlLmNyZWF0ZVRvZG8oZG9tTW9kdWxlLmdldEN1cnJlbnRTZWxlY3RlZCgpLCBkYXRhLnRpdGxlLCBkYXRhLmRlc2NyaXB0aW9uLCBkYXRhLmR1ZURhdGUsIGRhdGEucHJpb3JpdHkpXG5cbiAgICBkb21Nb2R1bGUudXBkYXRlVG9kb3MocHJvamVjdE1vZHVsZS5yZWFkKCkudG9kb3NEYi5maWx0ZXIoY3JyPT57XG4gICAgICAgIHJldHVybiBkb21Nb2R1bGUuZ2V0Q3VycmVudFNlbGVjdGVkKCkgPT0gY3JyLnJlYWQoKS5fcHJvamVjdElkXG4gICAgfSkpXG4gICAgZG9tTW9kdWxlLnVwZGF0ZVByb2plY3RzKHByb2plY3RNb2R1bGUucmVhZCgpLnByb2plY3RzRGIpXG5cbiAgICBldmVudC50YXJnZXQucmVzZXQoKVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9