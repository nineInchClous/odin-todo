// #region Imports
import './css/styles.scss';
import createTodo from './js/todo';
import { format } from 'date-fns';
// #endregion

const content = document.getElementById('content');
const newTodoForm = document.getElementById('new-todo-form');

function initialize() {
    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const dueDate = format(new Date(document.getElementById('due-date').value), 'yyy-MM-dd');
        const important = document.getElementById('important').checked;
        const newTodo = createTodo(title, description, dueDate, important, '');
        console.log(newTodo);
    })
}

document.addEventListener('DOMContentLoaded', initialize);