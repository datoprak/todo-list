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
  editCancelButton,
  editButton,
} from "./domSelectors";
import {
  checkTodoUI,
  createAllTodos,
  loadAllTodos,
  loadTodayTodos,
  loadImportantTodos,
  toggleBigCard,
  createAllProjects,
  toggleProjects,
  loadSpecificProject,
  handleBigCardButtons,
  modalHandler,
  editTodoUI,
  deleteProjectUI,
} from "./interface";
import { createProject } from "./projects";
import { createTodo } from "./todos";

createAllTodos();
createAllProjects();

plusTodo.addEventListener("click", modalHandler);

cancelTodoButton.addEventListener("click", modalHandler);

addProject.addEventListener("click", modalHandler);

cancelProjectButton.addEventListener("click", modalHandler);

todosContent.addEventListener("click", modalHandler);

editButton.addEventListener("click", editTodoUI);

editCancelButton.addEventListener("click", modalHandler);

addTodoButton.addEventListener("click", createTodo);

addProjectButton.addEventListener("click", createProject);

alltodos.addEventListener("click", loadAllTodos);

today.addEventListener("click", loadTodayTodos);

important.addEventListener("click", loadImportantTodos);

todosContent.addEventListener("click", checkTodoUI);

todosContent.addEventListener("click", toggleBigCard);

todosContent.addEventListener("click", handleBigCardButtons);

projects.addEventListener("click", toggleProjects);

projectsUl.addEventListener("click", loadSpecificProject);

projectsUl.addEventListener("click", deleteProjectUI);
