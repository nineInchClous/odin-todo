// #region Imports
import './css/styles.scss';
import { handleSubmitForm, showForm } from './js/DOMHandler';
// #endregion

const content = document.getElementById('content');
const newTodoForm = document.getElementById('new-todo-form');
const addTodoBtn = document.getElementById('add-todo-btn');

function initialize() {
    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmitForm();
    });

    addTodoBtn.addEventListener('click', () => showForm(true));
    document.getElementById('cancel-btn').addEventListener('click', () => showForm(false));
}

document.addEventListener('DOMContentLoaded', initialize);