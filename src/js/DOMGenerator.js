import { deleteTodo } from "./todoList";
import { fillForm } from "./DOMHandler";
import { format } from 'date-fns';

export function printTodoList(pContainer, pTodoList) {
    pContainer.innerHTML = '';
    pTodoList.forEach((todo) => printNewTodo(pContainer, todo));
}

export function printNewTodo(pContainer, pTodo) {
    const article = document.createElement('article');
    article.className = 'todo';
    article.setAttribute('data-id', pTodo.getID());

    const todoTitle = document.createElement('div');
    todoTitle.className = 'todo-title';
    const title = document.createElement('h2');
    if (pTodo.important) {
        const starIcon = document.createElement('i');
        starIcon.className = 'fa-solid fa-star';
        title.appendChild(starIcon);
    }
    title.appendChild(document.createTextNode(pTodo.title));
    todoTitle.appendChild(title);

    const description = document.createElement('p');
    description.textContent = pTodo.description;

    const date = document.createElement('p');
    if (pTodo.dueDate !== '') {
        date.textContent = 'Due date: ' + format(pTodo.dueDate, 'yyy-MM-dd');
    }

    const divBtns = document.createElement('div');
    const checkBtn = createTodoBtn('fa-solid fa-check');
    checkBtn.addEventListener('click', () => {
        pTodo.changeCompleteState();
        updateTodoOnComplete(pTodo.getComplete(), title, description, date, checkBtn);
    });
    const editBtn = createTodoBtn('fa-solid fa-pen-to-square');
    editBtn.addEventListener('click', () => {
        fillForm(pTodo);
    });
    const deleteBtn = createTodoBtn('fa-solid fa-trash');
    deleteBtn.addEventListener('click', () => {
        deleteTodo(pTodo.getID());
        article.remove();
    });

    divBtns.appendChild(checkBtn);
    divBtns.appendChild(editBtn);
    divBtns.appendChild(deleteBtn);
    todoTitle.appendChild(divBtns);

    article.appendChild(todoTitle);
    article.appendChild(description);
    article.appendChild(date);

    updateTodoOnComplete(pTodo.getComplete(), title, description, date, checkBtn);

    pContainer.appendChild(article);
}

function createTodoBtn(pIconClass) {
    const btn = document.createElement('button');
    btn.type = 'button';
    const icon = document.createElement('i');
    icon.className = pIconClass;
    btn.appendChild(icon);

    return btn;
}

function updateTodoOnComplete(pComplete, pTitle, pDescription, pDueDate, pCheckBtn) {
    if (pComplete) {
        pDescription.parentElement.style.backgroundColor = '#7dd3fc';
        pTitle.style.textDecoration = 'line-through';
        pDescription.style.textDecoration = 'line-through';
        pDueDate.style.textDecoration = 'line-through';
        pCheckBtn.style.backgroundColor = '#082f49';
        pCheckBtn.style.color = '#f0f9ff';
    } else {
        pDescription.parentElement.style.backgroundColor = '#0ea5e9';
        pTitle.style.textDecoration = '';
        pDescription.style.textDecoration = '';
        pDueDate.style.textDecoration = '';
        pCheckBtn.style.color = '#082f49';
        pCheckBtn.style.backgroundColor = '#f0f9ff';
    }
}