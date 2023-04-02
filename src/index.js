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
  checkTodo,
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
  editTodo,
  changeImportance,
} from "./interface";
import { createProject } from "./projects";
import { createTodo } from "./todos";

createAllTodos();
createAllProjects();

plusTodo.addEventListener("click", modalHandler);

cancelTodoButton.addEventListener("click", modalHandler);

addProject.addEventListener("click", modalHandler);

cancelProjectButton.addEventListener("click", modalHandler);

document.querySelectorAll(".edit-button").forEach(b => {
  b.addEventListener("click", modalHandler);
});

document.querySelectorAll(".imp-button").forEach(b => {
  b.addEventListener("click", changeImportance);
});

editButton.addEventListener("click", editTodo);

editCancelButton.addEventListener("click", modalHandler);

addTodoButton.addEventListener("click", createTodo);

addProjectButton.addEventListener("click", createProject);

alltodos.addEventListener("click", loadAllTodos);

today.addEventListener("click", loadTodayTodos);

important.addEventListener("click", loadImportantTodos);

todosContent.addEventListener("click", checkTodo);

todosContent.addEventListener("click", toggleBigCard);

todosContent.addEventListener("click", handleBigCardButtons);

projects.addEventListener("click", toggleProjects);

projectsUl.addEventListener("click", loadSpecificProject);