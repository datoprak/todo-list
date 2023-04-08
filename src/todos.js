import {
  newDescription,
  newDueDate,
  newImportant,
  newProject,
  newTitle,
} from "./domSelectors";
import { getLocal, setLocal } from "./getSetLocal";
import {
  createBigCard,
  createCard,
  loadAllTodos,
  modalHandler,
} from "./interface";

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
}

const createTodo = e => {
  e.preventDefault();
  const todo = new Todo(
    newTitle.value,
    newDescription.value,
    newDueDate.value,
    newImportant.checked,
    newProject.value
  );
  const todos = getLocal().todos;
  const projects = getLocal().projects;

  todos.push(todo);
  const sortedTodos = todos.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
  const project = projects.find(p => p.name === todo.project);

  project.todos.push(todo);
  const sortedProjectTodos = (project.todos = project.todos.sort((a, b) =>
    a.dueDate > b.dueDate ? 1 : -1
  ));
  console.log(sortedTodos);
  console.log(sortedProjectTodos);
  projects.todos = sortedProjectTodos;
  setLocal(todos, projects);
  if (todo.project !== "all-todos") {
    const allTodosProject = projects.find(p => p.name === "all-todos");
    allTodosProject.todos.push(todo);
    projects[projects.indexOf(allTodosProject)] = allTodosProject;
    setLocal(todos, projects);
  }
  const card = createCard(todo);
  createBigCard(todo, card);
  modalHandler(e);
  loadAllTodos();
};

export { createTodo };
