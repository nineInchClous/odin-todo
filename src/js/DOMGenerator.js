import { deleteTodo, getTodoByProject } from "./todoList";
import { fillFormTodo, removeActiveLink, updateTodoOnComplete } from "./DOMHandler";
import { getAllProjects } from "./projects";
import { selectProject, todoContainer } from "./ref";
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
        const spanDate = document.createElement('span');
        spanDate.textContent = 'Due date: ';
        date.appendChild(spanDate);
        date.appendChild(document.createTextNode(format(pTodo.dueDate, 'yyy-MM-dd')));
    }

    const project = document.createElement('p');
    if (pTodo.project !== '') {
        const spanProject = document.createElement('span');
        spanProject.textContent = 'Project: ';
        project.appendChild(spanProject);
        project.appendChild(document.createTextNode(pTodo.project));
    }

    const divBtns = document.createElement('div');
    const checkBtn = createTodoBtn('fa-solid fa-check');
    checkBtn.addEventListener('click', () => {
        pTodo.changeCompleteState();
        updateTodoOnComplete(pTodo.getComplete(), title, description, date, checkBtn, project);
    });
    const editBtn = createTodoBtn('fa-solid fa-pen-to-square');
    editBtn.addEventListener('click', () => {
        fillFormTodo(pTodo);
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
    article.appendChild(project);

    updateTodoOnComplete(pTodo.getComplete(), title, description, date, checkBtn, project);

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

export function printProject(pContainer, pProject) {
    const btn = document.createElement('button');
    btn.type = 'button';
    const i = document.createElement('i');
    i.className = 'fa-solid fa-rectangle-list';
    btn.appendChild(i);
    btn.appendChild(document.createTextNode(pProject));
    btn.setAttribute('data-project', pProject);
    btn.addEventListener('click', () => {
        printTodoList(todoContainer, getTodoByProject(pProject));
        removeActiveLink();
        btn.className = 'active';
    });
    pContainer.appendChild(btn);
}

export function printAllProjects(pContainer) {
    const projects = getAllProjects();
    projects.forEach((project) => {
        printProject(pContainer, project);
    });
}

export function refreshOptionProject() {
    selectProject.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'None';
    defaultOption.value = '';
    selectProject.appendChild(defaultOption);

    const projects = getAllProjects();
    projects.forEach((project) => {
        const option = document.createElement('option');
        option.textContent = project;
        option.value = project;
        selectProject.appendChild(option);
    });
}