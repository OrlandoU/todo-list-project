import todosF from "./todosFactory";
import projectsF from "./projectsFactory"
import { format } from "date-fns";
//Manager module for all projects
export const projectModule = (function () {

    let _projectId = 0;
    let _todoId = 0;

    let projectsDb = [];
    let todosDb = [];

    const retrieveData = () => {
        let storedValues = JSON.parse(localStorage.getItem('db'))
        if (!storedValues) return
        let projectsD = storedValues.projectsD || []
        let todosD = storedValues.todosD || []

        if (projectsD.length != 0) {
            for (let i = projectsD.length; i > 0; i--) {
                if (projectsD[i]) {
                    _projectId = projectsD.at(i)._id + 1
                    break
                }
            }
            projectsD.forEach(project => {
                if (project) {
                    projectsDb[project._id] = projectsF(project._id, project._name, project._category)
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
                    todosDb[todo._id] = todosF(todo._id, todo._projectId, todo._title, todo._description, todo._dueDate, todo._priority, todo._state, todo._isFavorite)
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
        projectsDb[getProjectId()] = projectsF(getProjectId(), projectName, category);
        _updateProjectId();
        _saveOnStorage()
    }
    const createTodo = (projectId, title, description, dueDate, priority) => {
        todosDb[_getTodoId()] = todosF(_getTodoId(), projectId, title, description, dueDate, priority);
        _updateTodoId();
        _saveOnStorage()
    }


    const removeProject = (id) => {
        delete projectsDb[id]
        todosDb.forEach(crr => {
            if (crr.read()._projectId == id) {
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
        else {
            todosDb[index].toggleFavorite()
            _saveOnStorage()
        }
    }



    return { createProject, createTodo, removeProject, removeTodo, read, updateProject, updateTodoState, retrieveData, getProjectId, updateFTodo }
})();

export const domModule = (function () {

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
        importantCounter.textContent = todosDb.filter(crr => {
            return crr.read()._isFavorite == true
        }).length
        if (importantCounter.textContent == 0) {
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
            date.textContent = format(new Date(currentTodo._dueDate), 'PPPPpp')
            date.classList.add('date-container')

            let detailsContainer = document.createElement('div')
            detailsContainer.classList.add('notes-container')
            let notesTitle = document.createElement('div')
            notesTitle.classList.add('note-title')
            notesTitle.textContent = 'Notes'

            let notesContainer = document.createElement('div')
            notesContainer.textContent = currentTodo._description
            notesContainer.classList.add('notes-text-container')

            
            detailsContainer.appendChild(notesTitle)
            detailsContainer.appendChild(notesContainer)


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
            listElement.appendChild(detailsContainer)
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

