// navbar
const plusTodo = document.querySelector(".task-modal-opener");

// sidebar
const alltodos = document.querySelector(".all-todos");
const today = document.querySelector(".today");
const important = document.querySelector(".important");
const projects = document.querySelector(".projects");
const addProject = document.querySelector(".new-project");
const projectsUl = document.querySelector(".projects-ul");

// add todo modal
const todoModal = document.querySelector(".todo-modal");
const newTitle = document.querySelector("#title");
const newDescription = document.querySelector("#description");
const newDueDate = document.querySelector("#due-date");
const newProject = document.querySelector("#projects");
const newImportant = document.querySelector("#important");
const addTodoButton = document.querySelector(".add-todo");
const cancelTodoButton = document.querySelector(".cancel-todo");

// add project modal
const projectModal = document.querySelector(".project-modal");
const newProjectName = document.querySelector("#project");
const addProjectButton = document.querySelector(".add-project");
const cancelProjectButton = document.querySelector(".cancel-project");

// content
const todosContent = document.querySelector(".todos-content");
const warning = document.querySelector(".warning");

export {
  newTitle,
  newDescription,
  newDueDate,
  newProject,
  newImportant,
  newProjectName,
  todoModal,
  addProjectButton,
  addTodoButton,
  cancelProjectButton,
  cancelTodoButton,
  projectModal,
  plusTodo,
  todosContent,
  alltodos,
  today,
  important,
  projects,
  addProject,
  projectsUl,
  warning,
};
