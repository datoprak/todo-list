import { newProjectName } from "./domSelectors";
import {
  createProjectsSidebar,
  loadAllProjects,
  modalHandler,
} from "./interface";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
}

const projects = [
  {
    name: "all-todos",
    todos: [
      {
        id: "1",
        title: "first",
        description: "test",
        dueDate: "2023-03-30",
        important: true,
        project: "all-todos",
        isCompleted: false,
      },
      {
        id: "2",
        title: "today",
        description: "test2",
        dueDate: "2023-04-01",
        important: false,
        project: "all-todos",
        isCompleted: false,
      },
    ],
  },
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
  modalHandler(e);
  loadAllProjects();
};

export { createProject, projects };
