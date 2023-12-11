let currentID = 0;

export default function createTodo(pTitle, pDescription, pDueDate, pImportant, pProject) {
    const id = currentID;
    currentID++;

    let title = pTitle;
    let description = pDescription;
    let dueDate = pDueDate;
    let important = pImportant;
    let project = pProject
    let complete = false;

    const getID = () => id;
    const getComplete = () => complete;
    const changeCompleteState = () => {
        complete = !complete;
    }

    return {title, description, dueDate, important, project, changeCompleteState, getID, getComplete};
}