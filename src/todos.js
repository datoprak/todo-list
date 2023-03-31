import {
  newDescription,
  newDueDate,
  newImportant,
  newProject,
  newTitle,
} from "./domSelectors";
import { todoModalHandler } from "./interface";

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
    return this.isCompleted = value
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
    dueDate: "2023-03-31",
    important: false,
    project: "all-todos",
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
  console.log(todos);
  console.log(todo.project);
  todoModalHandler();
};

export { createTodo, todos };
