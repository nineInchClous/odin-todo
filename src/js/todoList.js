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
            todo.project = pTodo.project;
        }
    });
}

export function getAllTodos() {
    return todoList;
}

export function getImportantTodos() {
    return todoList.filter((todo) => todo.important);
}

export function getTodayTodos() {
    return todoList.filter((todo) => {
        if (todo.dueDate !== '') {
            const now = new Date();
            return (todo.dueDate.getYear() === now.getYear() && todo.dueDate.getMonth() === now.getMonth() && todo.dueDate.getDay() === now.getDay());
        }
    });
}

export function getMonthTodos() {
    return todoList.filter((todo) => {
        const now = new Date();
        return (todo.dueDate !== '' && todo.dueDate.getYear() === now.getYear() && todo.dueDate.getMonth() === now.getMonth());
    });
}

export function getTodoByProject(pProject) {
    return todoList.filter((todo) => todo.project === pProject);
}