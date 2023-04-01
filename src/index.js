import {
  addProjectButton,
  addTodoButton,
  alltodos,
  cancelProjectButton,
  cancelTodoButton,
  important,
  addProject,
  plusTodo,
  today,
  todosContent,
  projects,
  projectsUl,
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
  createAllProjects,
  toggleProjects,
  loadSpecificProject,
} from "./interface";
import { createProject } from "./projects";
import { createTodo } from "./todos";

createAllTodos();
createAllProjects();

plusTodo.addEventListener("click", todoModalHandler);

cancelTodoButton.addEventListener("click", todoModalHandler);

addProject.addEventListener("click", projectModalHandler);

cancelProjectButton.addEventListener("click", projectModalHandler);

addTodoButton.addEventListener("click", createTodo);

addProjectButton.addEventListener("click", createProject);

alltodos.addEventListener("click", loadAllTodos);

today.addEventListener("click", loadTodayTodos);

important.addEventListener("click", loadImportantTodos);

todosContent.addEventListener("click", checkTodo);

todosContent.addEventListener("click", toggleBigCard);

projects.addEventListener("click", toggleProjects);

projectsUl.addEventListener("click", loadSpecificProject);
