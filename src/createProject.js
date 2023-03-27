import { Project, projects } from "./projects";

const projectName = document.querySelector("#name").value;

const createProject = () => {
  const project = new Project(projectName);
  projects.push(project);
};
