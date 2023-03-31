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

const createCard = (title, dueDate) => {
  const card = document.createElement("div");
  card.classList.add("todo-card");
  const todoTitle = document.createElement("div");
  todoTitle.classList.add("todo-title");
  todoTitle.textContent = title;
  const todoDueDate = document.createElement("div");
  todoDueDate.classList.add("todo-due-date");
  todoDueDate.textContent = dueDate;
  todosContent.appendChild(card);
  card.appendChild(todoTitle);
  card.appendChild(todoDueDate);
};

const renderAllTodos = () => {
  todosContent.innerHTML = "";
  todos.forEach(todo => {
    createCard(todo.title, todo.dueDate);
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

export {
  todoModalHandler,
  projectModalHandler,
  renderAllTodos,
  renderTodayTodos,
  renderImportantTodos,
};
