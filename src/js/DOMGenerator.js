import { deleteTodo } from "./todoList";
import { fillForm } from "./DOMHandler";

export function printTodo(pContainer, pTodo) {
    const article = document.createElement('article');
    article.className = 'todo';
    article.setAttribute('data-id', pTodo.getID());

    const todoTitle = document.createElement('div');
    todoTitle.className = 'todo-title';
    const h2 = document.createElement('h2');
    if (pTodo.important) {
        const starIcon = document.createElement('i');
        starIcon.className = 'fa-solid fa-star';
        h2.appendChild(starIcon);
    }
    h2.appendChild(document.createTextNode(pTodo.title));
    todoTitle.appendChild(h2);

    const description = document.createElement('p');
    description.textContent = pTodo.description;

    const date = document.createElement('p');
    if (pTodo.dueDate !== '') {
        date.textContent = 'Due date: ' + pTodo.dueDate;
    }

    const divBtns = document.createElement('div');
    const checkBtn = createTodoBtn('fa-solid fa-check');
    checkBtn.addEventListener('click', () => {
        pTodo.changeCompleteState();
        updateTodoOnComplete(pTodo.getComplete(), h2, description, date, checkBtn);
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

function updateTodoOnComplete(pComplete, pTitle, pDescription, pDueDate, pBtn) {
    if (pComplete) {
        pTitle.style.textDecoration = 'line-through';
        pDescription.style.textDecoration = 'line-through';
        pDueDate.style.textDecoration = 'line-through';
        pBtn.style.backgroundColor = '#082f49';
        pBtn.style.color = '#f0f9ff';
    } else {
        pTitle.style.textDecoration = '';
        pDescription.style.textDecoration = '';
        pDueDate.style.textDecoration = '';
        pBtn.style.color = '#082f49';
        pBtn.style.backgroundColor = '#f0f9ff';
    }
}