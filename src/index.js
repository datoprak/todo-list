import {
  cancelProjectButton,
  cancelTodoButton,
  plusProject,
  plusTodo,
  projectModal,
  todoModal,
} from "./domSelectors";

plusTodo.addEventListener("click", () => {
  todoModal.style.display = "block";
});

cancelTodoButton.addEventListener("click", () => {
  todoModal.style.display = "none";
});

plusProject.addEventListener("click", () => {
  projectModal.style.display = "block";
});

cancelProjectButton.addEventListener("click", () => {
  projectModal.style.display = "none";
});
