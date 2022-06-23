const mainHeader = document.querySelector('.main-header')

export default (() => {
    const _clearElement = (el) =>{
        let del = document.querySelector(el)
        del.parentElement.removeChild(del)
    }
    const updateProjects = () =>{
        
    }
    const updateTodos = (todosDb) => {
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

            listElement.appendChild(checkBox)
            subContainer.appendChild(header)
            subContainer.appendChild(date)
            subContainer.appendChild(priorityC)
            listElement.appendChild(subContainer)

            document.querySelector('.todos-container').appendChild(listElement)
        }
        


    }

    return {updateProjects, updateTodos}
})()



    