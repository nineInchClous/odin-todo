let todoList = [];

export function addTodoToList(pTodo) {
    todoList.push(pTodo);
}

export function deleteTodo(pId) {
    todoList = todoList.filter((todo) => todo.getID() !== pId);
}

export function updateTodo(pId, pTodo) {
    todoList.forEach((todo) => {
        if (todo.getID() == pId) {
            todo.title = pTodo.title;
            todo.description = pTodo.description;
            todo.important = pTodo.important;
            todo.dueDate = pTodo.dueDate;
        }
    });
}