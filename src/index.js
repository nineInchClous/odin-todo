// #region Imports
import './css/styles.scss';
import { handleSubmitForm, showForm } from './js/DOMHandler';
import { printTodoList } from './js/DOMGenerator';
import { getAllTodos, getTodayTodos, getMonthTodos, getImportantTodos } from './js/todoList';
// #endregion

const content = document.getElementById('content');
const newTodoForm = document.getElementById('new-todo-form');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoContainer = document.getElementById('todo-container');

const allTodosBtn = document.getElementById('all-todos');
const todayTodosBtn = document.getElementById('today-todos');
const monthTodosBtn = document.getElementById('month-todos');
const importantTodosBtn = document.getElementById('important-todos');

function setActiveLink(pActiveLink) {
    allTodosBtn.className = '';
    todayTodosBtn.className = '';
    monthTodosBtn.className = '';
    importantTodosBtn.className = '';
    pActiveLink.className = 'active';
}

function initialize() {
    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmitForm();
    });

    addTodoBtn.addEventListener('click', () => showForm(true));
    document.getElementById('cancel-btn').addEventListener('click', () => showForm(false));

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
}

document.addEventListener('DOMContentLoaded', initialize);