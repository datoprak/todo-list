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
  todosContent,
} from "./domSelectors";
import {
  projectModalHandler,
  todoModalHandler,
  checkTodo,
  createAllTodos,
  loadAllTodos,
  loadTodayTodos,
  loadImportantTodos,
  toggleBigCard,
} from "./interface";
import { createProject } from "./projects";
import { createTodo } from "./todos";

createAllTodos();

plusTodo.addEventListener("click", todoModalHandler);

cancelTodoButton.addEventListener("click", todoModalHandler);

plusProject.addEventListener("click", projectModalHandler);

cancelProjectButton.addEventListener("click", projectModalHandler);

addTodoButton.addEventListener("click", createTodo);

addProjectButton.addEventListener("click", createProject);

alltodos.addEventListener("click", loadAllTodos);

today.addEventListener("click", loadTodayTodos);

important.addEventListener("click", loadImportantTodos);

todosContent.addEventListener("click", checkTodo);

todosContent.addEventListener("click", toggleBigCard);
