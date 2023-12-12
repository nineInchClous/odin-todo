import createTodo from './todo';
import { addTodoToList, updateTodo } from './todoList';
import { printNewTodo, printProject } from './DOMGenerator';
import { addProject } from './projects';
import { addTodoBtn, newTodoForm, titleInput, titleError, descriptionInput, dueDateInput, importantInput, selectProject, submitBtn, todoContainer, newProjectForm, projectNameInput, nameError, projectContainer, allTodosBtn, todayTodosBtn, monthTodosBtn, importantTodosBtn } from './ref';
import { format } from 'date-fns';

function refreshTodoView(pId, pTodo) {
    const todos = document.getElementsByClassName('todo');
    let updateTodo;

    for (const article in todos) {
        if (typeof (todos[article]) === 'object' && todos[article].attributes[1].value == pId) {
            updateTodo = todos[article];
        }
    }

    if (pTodo.important) {
        const starIcon = document.createElement('i');
        starIcon.className = 'fa-solid fa-star';
        updateTodo.childNodes[0].childNodes[0].innerHTML = '';
        updateTodo.childNodes[0].childNodes[0].appendChild(starIcon);
        updateTodo.childNodes[0].childNodes[0].appendChild(document.createTextNode(pTodo.title));
    } else {
        updateTodo.childNodes[0].childNodes[0].textContent = pTodo.title;
    }

    updateTodo.childNodes[1].textContent = pTodo.description;

    if (pTodo.dueDate !== '') {
        updateTodo.childNodes[2].innerHTML = '';
        const spanDate = document.createElement('span');
        spanDate.textContent = 'Due date: ';
        updateTodo.childNodes[2].appendChild(spanDate);
        updateTodo.childNodes[2].appendChild(document.createTextNode(format(pTodo.dueDate, 'yyy-MM-dd')));
    } else {
        updateTodo.childNodes[2].textContent = '';
    }

    if (pTodo.project !== '') {
        updateTodo.childNodes[3].innerHTML = '';
        const spanProject = document.createElement('span');
        spanProject.textContent = 'Project: ';
        updateTodo.childNodes[3].appendChild(spanProject);
        updateTodo.childNodes[3].appendChild(document.createTextNode(pTodo.project));
    } else {
        updateTodo.childNodes[3].textContent = '';
    }
}

export function handleSubmitFormTodo() {
    if (titleInput.value.trim().length < 2) {
        titleError.className = '';
        titleInput.className = 'error-input';
    } else {
        titleError.className = 'hide';
        titleInput.className = '';

        let dueDate = '';
        if (dueDateInput.value !== '') {
            dueDate = new Date(dueDateInput.value);
            dueDate.setDate(dueDate.getDate() + 1);
        }

        const newTodo = createTodo(titleInput.value.trim(), descriptionInput.value.trim(), dueDate, importantInput.checked, selectProject.value);

        if (newTodoForm.hasAttribute('data-id')) {
            updateTodo(newTodoForm.getAttribute('data-id'), newTodo);
            refreshTodoView(newTodoForm.getAttribute('data-id'), newTodo);
        } else {
            addTodoToList(newTodo);
            printNewTodo(todoContainer, newTodo);
        }

        newTodoForm.reset();
        showTodoForm(false);
    }
}

export function showTodoForm(pVisible) {
    if (pVisible) {
        newTodoForm.className = '';
        addTodoBtn.className = 'hide';
        titleError.className = 'hide';
        titleInput.className = '';
        titleInput.focus();
    } else {
        newTodoForm.className = 'hide';
        addTodoBtn.className = '';
        newTodoForm.removeAttribute('data-id');
        submitBtn.textContent = 'Create Todo';
    }
}

export function fillFormTodo(pTodo) {
    titleInput.value = pTodo.title;
    descriptionInput.value = pTodo.description;
    if (pTodo.dueDate !== '') {
        dueDateInput.value = format(pTodo.dueDate, 'yyyy-MM-dd');
    }
    importantInput.checked = pTodo.important;
    selectProject.value = pTodo.project;
    newTodoForm.setAttribute('data-id', pTodo.getID());
    submitBtn.textContent = 'Update Todo'
    showTodoForm(true);
}

export function showProjectForm(pVisible) {
    if (pVisible) {
        newProjectForm.className = '';
        projectNameInput.focus();
    } else {
        newProjectForm.className = 'hide';
        nameError.className = 'hide';
        projectNameInput.className = '';
    }
}

export function handleSubmitFormProject() {
    if (projectNameInput.value.trim().length < 2) {
        nameError.className = '';
        projectNameInput.className = 'error-input';
    } else {
        nameError.className = 'hide';
        projectNameInput.className = '';

        printProject(projectContainer, projectNameInput.value.trim());
        addProject(projectNameInput.value.trim());

        projectNameInput.value = '';
        showProjectForm(false);
    }
}

export function setActiveLink(pActiveLink) {
    removeActiveLink();
    pActiveLink.className = 'active';
}
export function removeActiveLink() {
    allTodosBtn.className = '';
    todayTodosBtn.className = '';
    monthTodosBtn.className = '';
    importantTodosBtn.className = '';
    const projectBtns = projectContainer.getElementsByTagName('button');
    for (const p in projectBtns) {
        if (typeof(projectBtns[p]) === 'object') {
            projectBtns[p].className = '';
        }
    }
}

export function updateTodoOnComplete(pComplete, pTitle, pDescription, pDueDate, pCheckBtn, pProject) {
    if (pComplete) {
        pDescription.parentElement.style.backgroundColor = '#7dd3fc';
        pTitle.style.textDecoration = 'line-through';
        pDescription.style.textDecoration = 'line-through';
        pDueDate.style.textDecoration = 'line-through';
        pProject.style.textDecoration = 'line-through';
        pCheckBtn.style.backgroundColor = '#082f49';
        pCheckBtn.style.color = '#f0f9ff';
    } else {
        pDescription.parentElement.style.backgroundColor = '#0ea5e9';
        pTitle.style.textDecoration = '';
        pDescription.style.textDecoration = '';
        pDueDate.style.textDecoration = '';
        pProject.style.textDecoration = '';
        pCheckBtn.style.color = '#082f49';
        pCheckBtn.style.backgroundColor = '#f0f9ff';
    }
}