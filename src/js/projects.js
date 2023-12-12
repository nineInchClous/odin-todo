import { refreshOptionProject } from "./DOMGenerator";

export let currentProject;
let projectList = [];

export function addProject(pProject) {
    projectList.push(pProject);
    refreshOptionProject();
}

export function removeProject(pProject) {
    projectList = projectList.filter((project) => project !== pProject);
    refreshOptionProject();
}

export function getProject(pProject) {
    return projectList.find((project) => project === pProject);
}

export function getAllProjects() {
    return projectList;
}