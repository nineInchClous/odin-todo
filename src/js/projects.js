import { refreshOptionProject } from "./DOMGenerator";

export let currentProject;
let projectList = [];

export function addProject(pProject) {
    projectList.push(pProject);
    refreshOptionProject();
}

export function getProject(pProject) {
    return projectList.find((project) => project === pProject);
}

export function getAllProjects() {
    return projectList;
}

export function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projectList));
}

export function loadProjects() {
    if ('projects' in localStorage) {
        projectList = JSON.parse(localStorage.getItem('projects'));
    }
}