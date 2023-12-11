import createTodo from './todo';
import { addTodoToList, updateTodo } from './todoList';
import { printTodo } from './DOMGenerator';
import { format } from 'date-fns';

const addTodoBtn = document.getElementById('add-todo-btn');
const newTodoForm = document.getElementById('new-todo-form');
const titleInput = document.getElementById('title');
const titleError = document.getElementById('error-title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('due-date');
const importantInput = document.getElementById('important');
const submitBtn = document.getElementById('submit-btn');

const todoContainer = document.getElementById('todo-container');

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
        updateTodo.childNodes[2].textContent = 'Due date: ' + pTodo.dueDate;
    } else {
        updateTodo.childNodes[2].textContent = '';
    }
}

export function handleSubmitForm() {
    if (titleInput.value.trim().length < 2) {
        titleError.className = '';
        titleInput.className = 'error-input';
    } else {
        titleError.className = 'hide';
        titleInput.className = '';

        let dueDate = '';
        if (dueDateInput.value !== '') {
            dueDate = format(new Date(dueDateInput.value), 'yyy-MM-dd');
        }

        const newTodo = createTodo(titleInput.value.trim(), descriptionInput.value.trim(), dueDate, importantInput.checked, '');

        if (newTodoForm.hasAttribute('data-id')) {
            updateTodo(newTodoForm.getAttribute('data-id'), newTodo);
            refreshTodoView(newTodoForm.getAttribute('data-id'), newTodo);
        } else {
            addTodoToList(newTodo);
            printTodo(todoContainer, newTodo);
        }

        newTodoForm.reset();
        showForm(false);
    }
}

export function showForm(pVisible) {
    if (pVisible) {
        newTodoForm.className = '';
        addTodoBtn.className = 'hide';
        titleError.className = 'hide';
        titleInput.className = '';
    } else {
        newTodoForm.className = 'hide';
        addTodoBtn.className = '';
        newTodoForm.removeAttribute('data-id');
        submitBtn.textContent = 'Create Todo';
    }
}

export function fillForm(pTodo) {
    titleInput.value = pTodo.title;
    descriptionInput.value = pTodo.description;
    dueDateInput.value = pTodo.dueDate;
    importantInput.checked = pTodo.important;
    newTodoForm.setAttribute('data-id', pTodo.getID());
    submitBtn.textContent = 'Update Todo'
    showForm(true);
}