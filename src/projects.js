import { newProjectName } from "./domSelectors";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
}

const projects = [];

const createProject = () => {
  const project = new Project(newProjectName);
  projects.push(project);
};
