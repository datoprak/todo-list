import { newProjectName } from "./domSelectors";
import {
  createProjectsSidebar,
  loadAllProjects,
  projectModalHandler,
} from "./interface";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
}

const projects = [
  {
    name: "Personal",
    todos: [
      {
        id: "3",
        title: "project todo",
        description: "test",
        dueDate: "2023-04-02",
        important: true,
        project: "Personal",
        isCompleted: false,
      },
    ],
  },
  {
    name: "Work",
    todos: [
      {
        id: "4",
        title: "work todo",
        description: "work test",
        dueDate: "2023-04-04",
        import: true,
        project: "Work",
        isCompleted: false,
      },
    ],
  },
];

const createProject = e => {
  e.preventDefault();
  const project = new Project(newProjectName.value);
  projects.push(project);
  createProjectsSidebar(project);
  projectModalHandler();
  loadAllProjects();
};

export { createProject, projects };
