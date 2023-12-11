// #region Imports
import './css/styles.scss';
import createTodo from './js/todo';
import { printTodo } from './js/DOMGenerator';
import { format } from 'date-fns';
// #endregion

const content = document.getElementById('content');
const newTodoForm = document.getElementById('new-todo-form');
const todoContainer = document.getElementById('todo-container');

function initialize() {
    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();

        let dueDate = '';
        if (document.getElementById('due-date').value !== '') {
            dueDate = format(new Date(document.getElementById('due-date').value), 'yyy-MM-dd');
        }
        
        const important = document.getElementById('important').checked;
        const newTodo = createTodo(title, description, dueDate, important, '');
        console.log(newTodo);
        printTodo(todoContainer, newTodo);
    })
}

document.addEventListener('DOMContentLoaded', initialize);