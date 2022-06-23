/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst mainHeader = document.querySelector('.main-header')\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {\n    const _clearElement = (el) =>{\n        let del = document.querySelector(el)\n        del.parentElement.removeChild(del)\n    }\n    const updateProjects = () =>{\n        \n    }\n    const updateTodos = (todosDb) => {\n        for(const item in todosDb){\n            let listElement = document.createElement('li')\n            let currentTodo = todosDb[item].read();\n\n            let checkBox = document.createElement('input')\n            checkBox.type = 'checkbox'\n            checkBox.checked = currentTodo._state \n\n            let subContainer = document.createElement('div')\n            subContainer.classList.add('sub-container')\n        \n            let header = document.createElement('h2')\n            header.textContent = currentTodo._title\n            console.log(currentTodo)\n\n            let date = document.createElement('h4')\n            date.textContent = currentTodo._dueDate\n\n            let priorityC = document.createElement('h5')\n            priorityC.textContent = currentTodo._priority\n\n            listElement.appendChild(checkBox)\n            subContainer.appendChild(header)\n            subContainer.appendChild(date)\n            subContainer.appendChild(priorityC)\n            listElement.appendChild(subContainer)\n\n            document.querySelector('.todos-container').appendChild(listElement)\n        }\n        \n\n\n    }\n\n    return {updateProjects, updateTodos}\n})());\n\n\n\n    \n\n//# sourceURL=webpack://todo-list-project/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\nconst projectForm = document.querySelector('#projectForm')\nprojectForm.addEventListener('submit', addProject)\nconst todoForm = document.querySelector('#todos-form')\ntodoForm.addEventListener('submit', addTodo)\n\nfunction addProject(e){\n    e.preventDefault()\n    let data = Object.fromEntries(new FormData(e.target).entries())\n\n    document.querySelector('.closeModal').click()\n\n    _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateProjects(data)\n}\nfunction addTodo(event){\n    event.preventDefault()\n    let data = Object.fromEntries(new FormData(event.target).entries())\n\n    _projects__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createTodo('1', data.title, data.description, data.dueDate, data.priority)\n\n    _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateTodos(_projects__WEBPACK_IMPORTED_MODULE_0__[\"default\"].read().todosDb)\n\n}\n\n\n//# sourceURL=webpack://todo-list-project/./src/index.js?");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _todosFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todosFactory */ \"./src/todosFactory.js\");\n/* harmony import */ var _projectsFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectsFactory */ \"./src/projectsFactory.js\");\n\n\n\n//Manager module for all projects\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function(){\n\n    let _projectId = 0;\n    let _todoId = 0;\n\n    const projectsDb = {};\n    const todosDb = {};\n\n    const _getProjectId = () => {\n        return _projectId\n    }\n    const _updateProjectId = () =>{_projectId++}\n\n    const _getTodoId = () => {\n        return _todoId\n    }\n    const _updateTodoId = () => {_todoId++}\n\n\n    const createProject = (projectName, category) => {\n        projectsDb[_getProjectId()] = (0,_projectsFactory__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_getProjectId(), projectName, category);\n        _updateProjectId();\n    }\n    const createTodo = (projectId, title, description, dueDate, priority) => {\n        todosDb[_getTodoId()] = (0,_todosFactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_getTodoId(), projectId, title, description, dueDate, priority);\n        _updateTodoId();\n    }\n\n\n    const removeProject = (id) => {\n        delete projectsDb[id]\n    }\n    const removeTodo = (id) => {\n        delete todosDb[id]   \n    }\n\n\n    const read = () => {\n        return {projectsDb, todosDb}\n    }\n    \n\n    const updateProject = () => {\n       \n    }\n    const updateTodo = () => {\n       \n    }\n\n    \n\n    return{createProject, createTodo, removeProject, removeTodo, read, updateProject, updateTodo}\n})());\n\n\n\n\n//# sourceURL=webpack://todo-list-project/./src/projects.js?");

/***/ }),

/***/ "./src/projectsFactory.js":
/*!********************************!*\
  !*** ./src/projectsFactory.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//Creation, reading and updating of the object\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((id,name, category) => {\n    let _id = id\n    let _name = name;\n    let _date = new Date()\n    let _category = category;\n\n    const read = ()=>{{_id,_name, _date, _category}}\n\n    const update = (newName, newCategory)=>{\n        _name = newName\n        _category = newCategory\n    }\n    \n    return {read, update, addTodo}\n});\n\n//# sourceURL=webpack://todo-list-project/./src/projectsFactory.js?");

/***/ }),

/***/ "./src/todosFactory.js":
/*!*****************************!*\
  !*** ./src/todosFactory.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//todos factory function\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((id, projectId,title, description, dueDate, priority)=>{\n    //Object values\n    let _projectId = projectId\n    let _id = id\n    let _title = title;\n    let _description = description;\n    let _dueDate = dueDate;\n    let _priority = priority;\n    let _state = false;\n\n    const read = () =>{\n        return{_title, _description, _dueDate, _priority, _id, _projectId, _state}\n    }\n    \n\n    const update = (newName, newDescription, newDueDate, newPriority) =>{\n        _title = newName;\n        _description = newDescription;\n        _dueDate = newDueDate;\n        _priority = newPriority;\n    }\n    const toggleState = () =>{\n        _state = _state ? false : true;\n    }\n    return {read, update, toggleState}\n});\n\n\n\n\n\n//# sourceURL=webpack://todo-list-project/./src/todosFactory.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;