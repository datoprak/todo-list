import { newProjectName } from "./domSelectors";
import { projectModalHandler } from "./interface";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
}

const projects = [];

const createProject = e => {
  e.preventDefault();
  const project = new Project(newProjectName.value);
  projects.push(project);
  console.log(projects);
  projectModalHandler();
};

export { createProject };
