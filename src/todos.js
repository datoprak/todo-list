import {
  newDescription,
  newDueDate,
  newImportant,
  newProject,
  newTitle,
} from "./domSelectors";
import {
  createBigCard,
  createCard,
  loadAllTodos,
  modalHandler,
} from "./interface";
import { projects } from "./projects";

class Todo {
  constructor(title, description, dueDate, important, project) {
    this.id = new Date().valueOf().toString();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.important = important;
    this.project = project;
    this.isCompleted = false;
  }

  set isCompleted(value) {
    this._isCompleted = value;
  }

  set important(value) {
    this._important = value;
  }

  get important() {
    return this._important;
  }

  addToProject() {
    const project = projects.find(p => p.name === this.project);
    project.todos.push(this);
  }
}

const todos = [
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
  {
    id: "3",
    title: "project todo",
    description: "test",
    dueDate: "2023-04-02",
    important: true,
    project: "Personal",
    isCompleted: false,
  },
  {
    id: "4",
    title: "work todo",
    description: "work test",
    dueDate: "2023-04-04",
    important: true,
    project: "Work",
    isCompleted: false,
  },
];

const createTodo = e => {
  e.preventDefault();
  const todo = new Todo(
    newTitle.value,
    newDescription.value,
    newDueDate.value,
    newImportant.checked,
    newProject.value
  );
  todos.push(todo);
  todo.addToProject();
  if (todo.project !== "all-todos") {
    const allTodosProject = projects.find(p => p.name === "all-todos");
    allTodosProject.todos.push(todo);
  }
  const card = createCard(todo);
  createBigCard(todo, card);
  modalHandler(e);
  // change when in project
  loadAllTodos();
};

export { createTodo, todos };
