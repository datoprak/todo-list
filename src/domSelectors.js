// navbar
const plusTodo = document.querySelector(".task-modal-opener");

// sidebar
const plusProject = document.querySelector(".projects");

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

// sidebar
const alltodos = document.querySelector(".all-todos");
const today = document.querySelector(".today");
const important = document.querySelector(".important");

// content
const todosContent = document.querySelector(".todos-content");

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
  plusProject,
  todosContent,
  alltodos,
  today,
  important,
};
