import { format } from "date-fns";
import {
  addProject,
  newProject,
  projectModal,
  projectsUl,
  todoModal,
  todosContent,
  warning,
} from "./domSelectors";
import { todos } from "./todos";
import { projects } from "./projects";

const todoModalHandler = () => {
  todoModal.style.display =
    todoModal.style.display === "block" ? "none" : "block";
};

const projectModalHandler = () => {
  projectModal.style.display =
    projectModal.style.display === "block" ? "none" : "block";
};

const createCard = todo => {
  const card = document.createElement("div");
  card.classList.add("todo-card");
  card.dataset.id = todo.id;
  card.dataset.projectname = todo.project;
  if (todo.dueDate === format(new Date(), "yyyy-MM-dd")) {
    card.dataset.today = "";
  }
  if (todo.important === true) {
    card.dataset.important = "";
  }
  const checkbox = document.createElement("span");
  checkbox.classList.add("material-symbols-outlined");
  checkbox.classList.add("checkbox");
  checkbox.textContent = " radio_button_unchecked ";
  const todoTitle = document.createElement("div");
  todoTitle.classList.add("todo-title");
  todoTitle.textContent = todo.title;
  const todoDueDate = document.createElement("div");
  todoDueDate.classList.add("todo-due-date");
  todoDueDate.textContent = todo.dueDate;
  card.appendChild(checkbox);
  card.appendChild(todoTitle);
  card.appendChild(todoDueDate);
  todosContent.appendChild(card);
  return card;
};

const createBigCard = (todo, card) => {
  const bigCard = document.createElement("div");
  bigCard.classList.add("big-todo-card");
  bigCard.dataset.bid = todo.id;
  bigCard.style.display = "none";
  const todoTitle = document.createElement("div");
  todoTitle.classList.add("big-todo-title");
  todoTitle.textContent = todo.title;
  const todoDueDate = document.createElement("div");
  todoDueDate.classList.add("big-todo-due-date");
  todoDueDate.textContent = todo.dueDate;
  const todoDesc = document.createElement("div");
  todoDesc.classList.add("big-todo-desc");
  todoDesc.textContent = todo.description;
  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.textContent = "edit";
  const impButton = document.createElement("button");
  impButton.classList.add("imp-button");
  impButton.textContent = "imp";
  const moveButton = document.createElement("button");
  moveButton.classList.add("move-button");
  moveButton.textContent = "move";
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "delete";
  bigCard.appendChild(todoTitle);
  bigCard.appendChild(todoDueDate);
  bigCard.appendChild(todoDesc);
  bigCard.appendChild(editButton);
  bigCard.appendChild(impButton);
  bigCard.appendChild(moveButton);
  bigCard.appendChild(deleteButton);
  card.after(bigCard);
};

const createAllTodos = () => {
  todos.forEach(todo => {
    const card = createCard(todo);
    createBigCard(todo, card);
  });
};

const loadAllTodos = () => {
  warning.textContent = "";

  if (todos.length === 0) {
    warning.textContent = "there is no todo";
  } else {
    document
      .querySelectorAll(".todo-card")
      .forEach(card => (card.style.display = "block"));
  }
};

const loadTodayTodos = () => {
  const todayTodos = todos.filter(
    todo => todo.dueDate === format(new Date(), "yyyy-MM-dd")
  );

  warning.textContent = "";
  document
    .querySelectorAll(".todo-card")
    .forEach(card => (card.style.display = "none"));

  if (todayTodos.length === 0) {
    warning.textContent = "there is no todo for today";
  } else {
    document
      .querySelectorAll("[data-today]")
      .forEach(card => (card.style.display = "block"));
  }
};

const loadImportantTodos = () => {
  const importantTodos = todos.filter(todo => todo.important === true);

  warning.textContent = "";
  document
    .querySelectorAll(".todo-card")
    .forEach(card => (card.style.display = "none"));

  if (importantTodos.length === 0) {
    warning.textContent = "there is no important todo";
  } else {
    document
      .querySelectorAll("[data-important]")
      .forEach(card => (card.style.display = "block"));
  }
};

const checkTodo = e => {
  if (e.target.className === "material-symbols-outlined checkbox") {
    const card = e.target.parentElement;

    todos.forEach(todo => {
      if (card.dataset.id === todo.id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    card.style.opacity = 0.5;
    card.style.textDecoration = "line-through";
  }
};

const toggleBigCard = e => {
  if (e.target.className === "todo-card") {
    const card = e.target;
    const bigCard = card.nextElementSibling;
    bigCard.style.display =
      bigCard.style.display === "block" ? "none" : "block";
  }
};

const createProjectsSidebar = project => {
  const projectName = document.createElement("li");
  projectName.classList.add("created-project");
  projectName.dataset.name = project.name;
  projectName.textContent = project.name;
  projectName.style.display = "none";
  projectsUl.appendChild(projectName);

  const newDropdown = document.createElement("option");
  newDropdown.value = project.name;
  newDropdown.textContent = project.name;
  newProject.appendChild(newDropdown);
};

const createAllProjects = () => {
  projects.forEach(project => {
    createProjectsSidebar(project);
  });
};

const loadAllProjects = () => {
  document
    .querySelectorAll(".created-project")
    .forEach(project => (project.style.display = "block"));
};

const loadSpecificProject = e => {
  const selectedProject = e.target.dataset.name;
  if (!selectedProject) return;

  const foundProject = projects.find(
    project => project.name === selectedProject
  );

  warning.textContent = "";
  document
    .querySelectorAll(".todo-card")
    .forEach(card => (card.style.display = "none"));

  if (foundProject.todos.length === 0) {
    warning.textContent = `there is no todos in ${foundProject.name} project`;
  } else {
    document
      .querySelectorAll(`[data-projectname=${selectedProject}]`)
      .forEach(card => (card.style.display = "block"));
  }
};

const toggleProjects = () => {
  addProject.style.display =
    addProject.style.display === "block" ? "none" : "block";
  document.querySelectorAll(".created-project").forEach(project => {
    project.style.display =
      project.style.display === "block" ? "none" : "block";
  });
};

export {
  todoModalHandler,
  projectModalHandler,
  loadAllTodos,
  loadTodayTodos,
  loadImportantTodos,
  checkTodo,
  toggleBigCard,
  createCard,
  createAllTodos,
  createBigCard,
  createAllProjects,
  toggleProjects,
  createProjectsSidebar,
  loadAllProjects,
  loadSpecificProject,
};
