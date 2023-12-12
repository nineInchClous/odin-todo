// #region Imports
import './css/styles.scss';
import { handleSubmitFormTodo, showTodoForm, setActiveLink, showProjectForm, handleSubmitFormProject } from './js/DOMHandler';
import { printAllProjects, printTodoList, refreshOptionProject } from './js/DOMGenerator';
import { getAllTodos, getTodayTodos, getMonthTodos, getImportantTodos, loadTodos } from './js/todoList';
import { loadProjects } from './js/projects';
import { newTodoForm, addTodoBtn, todoContainer, allTodosBtn, todayTodosBtn, monthTodosBtn, importantTodosBtn, addProjectBtn, newProjectForm, cancelProjectFormBtn, projectContainer } from './js/ref';
// #endregion

function initialize() {
    loadTodos();
    printTodoList(todoContainer, getAllTodos());

    loadProjects();
    printAllProjects(projectContainer);
    refreshOptionProject();

    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmitFormTodo();
    });

    addTodoBtn.addEventListener('click', () => showTodoForm(true));
    document.getElementById('cancel-btn-todo').addEventListener('click', () => showTodoForm(false));

    allTodosBtn.addEventListener('click', () => {
        printTodoList(todoContainer, getAllTodos());
        setActiveLink(allTodosBtn);
    });
    todayTodosBtn.addEventListener('click', () => {
        printTodoList(todoContainer, getTodayTodos());
        setActiveLink(todayTodosBtn);
    });
    monthTodosBtn.addEventListener('click', () => {
        printTodoList(todoContainer, getMonthTodos());
        setActiveLink(monthTodosBtn);
    });
    importantTodosBtn.addEventListener('click', () => {
        printTodoList(todoContainer, getImportantTodos());
        setActiveLink(importantTodosBtn);
    });

    addProjectBtn.addEventListener('click', () => showProjectForm(true));
    newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmitFormProject();
    });
    cancelProjectFormBtn.addEventListener('click', () => showProjectForm(false));
}

document.addEventListener('DOMContentLoaded', initialize);