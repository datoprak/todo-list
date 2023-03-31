import {
  addProjectButton,
  addTodoButton,
  alltodos,
  cancelProjectButton,
  cancelTodoButton,
  important,
  plusProject,
  plusTodo,
  today,
} from "./domSelectors";
import {
  renderAllTodos,
  renderTodayTodos,
  projectModalHandler,
  todoModalHandler,
  renderImportantTodos,
  checkTodo,
} from "./interface";
import { createProject } from "./projects";
import { createTodo } from "./todos";

renderAllTodos();

plusTodo.addEventListener("click", todoModalHandler);

cancelTodoButton.addEventListener("click", todoModalHandler);

plusProject.addEventListener("click", projectModalHandler);

cancelProjectButton.addEventListener("click", projectModalHandler);

addTodoButton.addEventListener("click", createTodo);

addProjectButton.addEventListener("click", createProject);

alltodos.addEventListener("click", renderAllTodos);

today.addEventListener("click", renderTodayTodos);

important.addEventListener("click", renderImportantTodos);

const checkboxes = document.querySelectorAll(".checkbox");
checkboxes.forEach(c => {
  c.addEventListener("click", checkTodo);
});
