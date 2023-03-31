import { format } from "date-fns";
import { projectModal, todoModal, todosContent } from "./domSelectors";
import { todos } from "./todos";

const todoModalHandler = () => {
  todoModal.style.display =
    todoModal.style.display === "block" ? "none" : "block";
};

const projectModalHandler = () => {
  projectModal.style.display =
    projectModal.style.display === "block" ? "none" : "block";
};

const createCard = (title, dueDate, id) => {
  const card = document.createElement("div");
  card.classList.add("todo-card");
  card.dataset.id = id;
  const checkbox = document.createElement("span");
  checkbox.classList.add("material-symbols-outlined");
  checkbox.classList.add("checkbox");
  checkbox.textContent = " radio_button_unchecked ";
  const todoTitle = document.createElement("div");
  todoTitle.classList.add("todo-title");
  todoTitle.textContent = title;
  const todoDueDate = document.createElement("div");
  todoDueDate.classList.add("todo-due-date");
  todoDueDate.textContent = dueDate;
  todosContent.appendChild(card);
  card.appendChild(checkbox);
  card.appendChild(todoTitle);
  card.appendChild(todoDueDate);
};

const renderAllTodos = () => {
  todosContent.innerHTML = "";
  todos.forEach(todo => {
    createCard(todo.title, todo.dueDate, todo.id);
    console.log(todo);
  });
};

const renderTodayTodos = () => {
  const todayTodos = todos.filter(
    todo => todo.dueDate === format(new Date(), "yyyy-MM-dd")
  );

  todosContent.innerHTML = "";
  todayTodos.forEach(todo => {
    createCard(todo.title, todo.dueDate);
  });
};

const renderImportantTodos = () => {
  const importantTodos = todos.filter(todo => todo.important === true);

  todosContent.innerHTML = "";
  importantTodos.forEach(todo => {
    createCard(todo.title, todo.dueDate);
  });
};

const checkTodo = e => {
  const card = e.target.parentElement;

  todos.forEach(todo => {
    if (card.dataset.id === todo.id) {
      todo.isCompleted = !todo.isCompleted;
    }
  });
  console.log(todos);
  card.style.opacity = 0.5;
  card.style.textDecoration = "line-through";
};

export {
  todoModalHandler,
  projectModalHandler,
  renderAllTodos,
  renderTodayTodos,
  renderImportantTodos,
  checkTodo,
};
