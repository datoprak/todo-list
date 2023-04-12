import { newProjectName } from "./domSelectors";
import { getLocal, setLocal } from "./getSetLocal";
import {
  createProjectsSidebar,
  loadSpecificProject,
  modalHandler,
  throwError,
} from "./interface";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
}

const createProject = e => {
  e.preventDefault();
  if (!newProjectName.value) {
    throwError("addProject");
    return;
  }
  const project = new Project(newProjectName.value);
  const projects = getLocal().projects;
  projects.push(project);
  setLocal("", projects);
  createProjectsSidebar(project);
  modalHandler(e);
  loadSpecificProject(project.name);
};

export { createProject };
