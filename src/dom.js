const mainHeader = document.querySelector('.main-header')
import projects from "./projects"

export default (() => {
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
            counterContainer.textContent = projects.counter(currentProject._id)

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
        updateTodos(projects.read().todosDb.filter(crr=>{
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
})()



    