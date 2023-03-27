import { Todo, todos } from "./todos";

const title = document.querySelector("#title").value;
const description = document.querySelector("#description").value;
const dueDate = document.querySelector("#due-date").value;
const project = document.querySelector("#project").value;
const important = document.querySelector("#important");

const createTodo = () => {
  const todo = new Todo(title, description, dueDate, project, important);
  todos.push(todo);
};
