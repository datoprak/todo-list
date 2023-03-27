// navbar
const plusTodo = document.querySelector(".task-modal-opener");

// sidebar
const plusProject = document.querySelector(".projects");

// add todo modal
const todoModal = document.querySelector(".todo-modal");
const newTitle = document.querySelector("#title").value;
const newDescription = document.querySelector("#description").value;
const newDueDate = document.querySelector("#due-date").value;
const newProject = document.querySelector("#projects").value;
const newImportant = document.querySelector("#important");
const addTodoButton = document.querySelector(".add-todo");
const cancelTodoButton = document.querySelector(".cancel-todo");

// add project modal
const projectModal = document.querySelector(".project-modal");
const newProjectName = document.querySelector("#name");
const addProjectButton = document.querySelector(".add-project");
const cancelProjectButton = document.querySelector(".cancel-project");

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
};
