export default function createTodo(pTitle, pDescription, pDueDate, pPriority, pProject) {
    let title = pTitle;
    let description = pDescription;
    let dueDate = pDueDate;
    let priority = pPriority;
    let project = pProject
    let complete = false;

    const changeCompleteState = (state) => {
        complete = state;
    }

    return {title, description, dueDate, priority, project, changeCompleteState};
}