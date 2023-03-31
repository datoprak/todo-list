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
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.important = important;
    this.project = project;
  }
}

const todos = [
  {
    title: "first",
    description: "test",
    dueDate: "2023-03-30",
    important: true,
    project: "all-todos",
  },
  {
    title: "today",
    description: "test2",
    dueDate: "2023-03-31",
    important: false,
    project: "all-todos",
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
