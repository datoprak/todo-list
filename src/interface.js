import { format } from "date-fns";
import {
  addProject,
  editDescription,
  editDueDate,
  editImportant,
  editModal,
  editProject,
  editTitle,
  newDescription,
  newDueDate,
  newImportant,
  newProject,
  newProjectName,
  newTitle,
  projectModal,
  projectTitle,
  projectsUl,
  todoModal,
  todosContent,
  warning,
} from "./domSelectors";
import { getLocal } from "./getSetLocal";
import {
  changeImportance,
  checkTodo,
  deleteProject,
  deleteTodo,
  editTodo,
} from "./controllers";

const modalHandler = e => {
  e.preventDefault();
  const modal = e.target.className;
  switch (modal) {
    case "task-modal-opener":
      todoModal.style.display = "block";
      break;
    case "new-project":
      projectModal.style.display = "block";
      break;
    case "material-symbols-outlined edit-button":
      editModal.style.display = "block";
      break;
    case "cancel-todo":
    case "add-todo":
      todoModal.style.display = "none";
      break;
    case "cancel-project":
    case "add-project":
      projectModal.style.display = "none";
      break;
    case "edit-cancel-todo":
    case "edit-todo":
      editModal.style.display = "none";
      break;
    default:
      break;
  }
};

const createCard = todo => {
  let lastTodo = null;
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  cardContainer.dataset.ccid = todo.id;

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
  cardContainer.appendChild(card);
  todosContent.insertBefore(cardContainer, lastTodo);
  clearTodoForm();
  return cardContainer;
};

const createBigCard = (todo, card) => {
  const bigCard = document.createElement("div");
  bigCard.classList.add("big-todo-card", "hide");
  bigCard.dataset.bid = todo.id;

  const todoTitle = document.createElement("div");
  todoTitle.classList.add("big-todo-title");
  todoTitle.textContent = `Title: ${todo.title}`;

  const todoDueDate = document.createElement("div");
  todoDueDate.classList.add("big-todo-due-date");
  todoDueDate.textContent = `Due Date: ${todo.dueDate}`;

  const todoDesc = document.createElement("div");
  todoDesc.classList.add("big-todo-desc");
  todoDesc.textContent = `Description: ${todo.description}`;

  const editButton = document.createElement("span");
  editButton.classList.add("material-symbols-outlined", "edit-button");
  editButton.textContent = " edit ";
  const editToolTipText = document.createElement("span");
  editToolTipText.classList.add("edit-tip", "tool");
  editToolTipText.textContent = "Edit ToDo";

  const impButton = document.createElement("span");
  impButton.classList.add("material-symbols-outlined", "imp-button");
  impButton.textContent = " star ";
  impButton.style.fontVariationSettings =
    todo.important === true ? `"FILL" 1` : `"FILL" 0`;
  const impToolTipText = document.createElement("span");
  impToolTipText.classList.add("imp-tip", "tool");
  impToolTipText.textContent =
    todo.important === true ? "Remove importance" : "Make important";

  const deleteButton = document.createElement("span");
  deleteButton.classList.add("material-symbols-outlined", "delete-button");
  deleteButton.textContent = " delete ";
  const deleteToolTipText = document.createElement("span");
  deleteToolTipText.classList.add("delete-tip", "tool");
  deleteToolTipText.textContent = "Delete ToDo";

  bigCard.appendChild(todoTitle);
  bigCard.appendChild(todoDueDate);
  bigCard.appendChild(todoDesc);
  bigCard.appendChild(editButton);
  bigCard.appendChild(editToolTipText);
  bigCard.appendChild(impButton);
  bigCard.appendChild(impToolTipText);
  bigCard.appendChild(deleteButton);
  bigCard.appendChild(deleteToolTipText);
  card.appendChild(bigCard);
};

const clearTodoForm = () => {
  newTitle.value = "";
  newDescription.value = "";
  newDueDate.value = "";
  newProject.value = "";
  newImportant.checked = false;
};

const clearProjectForm = () => {
  newProjectName.value = "";
};

const createAllTodos = () => {
  getLocal().todos.forEach(todo => {
    const card = createCard(todo);
    createBigCard(todo, card);
  });
};

const loadAllTodos = e => {
  projectTitle.textContent = "All toDos";
  warning.textContent = "";
  if (getLocal().todos.length === 0) {
    warning.textContent = "There is no toDos";
  } else {
    document
      .querySelectorAll(".todo-card")
      .forEach(card => card.classList.remove("hide"));
    document
      .querySelectorAll(".card-container")
      .forEach(card => card.classList.remove("hide"));
    sortHtml(getLocal().todos);
  }
  toggleBigCard(e);
};

const sortHtml = todos => {
  let lastTodo = null;
  todos.forEach(todo => {
    const cardContainer = document.querySelector(`[data-ccid="${todo.id}"]`);
    if (cardContainer) {
      todosContent.insertBefore(cardContainer, lastTodo);
    }
  });
};

const loadTodayTodos = e => {
  const todayTodos = getLocal().todos.filter(
    todo => todo.dueDate === format(new Date(), "yyyy-MM-dd")
  );

  projectTitle.textContent = "Today's toDos";
  warning.textContent = "";
  document
    .querySelectorAll(".todo-card")
    .forEach(card => card.classList.add("hide"));
  document
    .querySelectorAll(".card-container")
    .forEach(card => card.classList.add("hide"));

  if (todayTodos.length === 0) {
    warning.textContent = "There is no toDos for today";
  } else {
    document.querySelectorAll("[data-today]").forEach(card => {
      card.classList.remove("hide");
      card.parentElement.classList.remove("hide");
    });
    sortHtml(todayTodos);
  }
  toggleBigCard(e);
};

const loadImportantTodos = e => {
  const importantTodos = getLocal().todos.filter(
    todo => todo.important === true
  );

  warning.textContent = "";
  projectTitle.textContent = "Important toDos";
  document
    .querySelectorAll(".todo-card")
    .forEach(card => card.classList.add("hide"));
  document
    .querySelectorAll(".card-container")
    .forEach(card => card.classList.add("hide"));

  if (importantTodos.length === 0) {
    warning.textContent = "There is no important toDos";
  } else {
    document.querySelectorAll("[data-important]").forEach(card => {
      card.classList.remove("hide");
      card.parentElement.classList.remove("hide");
    });
    sortHtml(importantTodos);
  }

  toggleBigCard(e);
};

const checkTodoUI = e => {
  if (e.target.className === "material-symbols-outlined checkbox") {
    const card = e.target.parentElement;
    card.style.opacity = 0.5;
    card.style.textDecoration = "line-through";
    checkTodo(card.dataset.id);
  }
};

const toggleBigCard = e => {
  if (!e) return;
  if (!e.target) {
    document.querySelectorAll(".big-todo-card").forEach(bc => {
      bc.classList.add("hide");
    });
  } else {
    if (
      e.target.className === "todo-card" ||
      e.target.className === "todo-title" ||
      e.target.className === "todo-due-date"
    ) {
      const card =
        e.target.className === "todo-card" ? e.target : e.target.parentElement;
      const bigCard = card.nextElementSibling;

      bigCard.classList.toggle("hide");
    } else if (e.currentTarget !== todosContent) {
      document.querySelectorAll(".big-todo-card").forEach(bc => {
        bc.classList.add("hide");
      });
    }
  }
};

const createProjectsSidebar = project => {
  if (project.name !== "all-todos") {
    const projectName = document.createElement("li");
    projectName.classList.add("created-project");
    projectName.dataset.name = project.name;
    projectName.textContent = project.name;
    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.classList.add("delete-project");
    deleteProjectButton.textContent = "X";
    projectName.classList.remove("hide");
    projectName.appendChild(deleteProjectButton);
    projectsUl.appendChild(projectName);

    const newDropdownAdd = document.createElement("option");
    newDropdownAdd.value = project.name;
    newDropdownAdd.textContent = project.name;
    const newDropdownEdit = document.createElement("option");
    newDropdownEdit.value = project.name;
    newDropdownEdit.textContent = project.name;

    newProject.appendChild(newDropdownAdd);
    editProject.appendChild(newDropdownEdit);

    clearProjectForm();
  }
};

const deleteProjectUI = e => {
  if (e.target.nodeName !== "BUTTON") return;
  const projectElement = e.target.parentElement;
  const projectName = projectElement.dataset.name;
  const projects = getLocal().projects;
  const foundProject = projects.find(p => p.name === projectName);
  foundProject.todos.forEach(t => {
    document.querySelectorAll(".card-container").forEach(c => {
      if (c.dataset.ccid === t.id) {
        c.remove();
      }
    });
  });
  projectElement.remove();

  deleteProject(projectName);
  loadAllTodos();
};

const createAllProjects = () => {
  getLocal().projects.forEach(project => {
    createProjectsSidebar(project);
  });
};

const loadSpecificProject = e => {
  const selectedProject = e.target ? e.target.dataset.name : e;
  if (!selectedProject) return;

  const foundProject = getLocal().projects.find(
    project => project.name === selectedProject
  );

  warning.textContent = "";
  projectTitle.textContent = `${foundProject.name}`;
  document
    .querySelectorAll(".todo-card")
    .forEach(card => card.classList.add("hide"));
  document
    .querySelectorAll(".card-container")
    .forEach(card => card.classList.add("hide"));

  if (foundProject.todos.length === 0) {
    warning.textContent = `There is no toDos in ${foundProject.name} project`;
  } else {
    document
      .querySelectorAll(`[data-projectname="${selectedProject}"]`)
      .forEach(card => {
        card.classList.remove("hide");
        card.parentElement.classList.remove("hide");
      });

    sortHtml(foundProject.todos);
  }

  toggleBigCard(e);
};

const toggleProjects = () => {
  addProject.classList.toggle("hide");
  document.querySelectorAll(".created-project").forEach(project => {
    project.classList.toggle("hide");
  });
};

const handleBigCardButtons = e => {
  e.preventDefault();
  if (e.target.nodeName !== "SPAN") return;
  const button = e.target;
  const foundBigCard = button.parentElement;
  const foundCard = foundBigCard.previousElementSibling;
  const foundCardContainer = foundCard.parentElement;
  const todos = getLocal().todos;
  const foundTodo = todos.find(todo => todo.id === foundBigCard.dataset.bid);

  if (button.className === "material-symbols-outlined edit-button") {
    editTitle.value = foundTodo.title;
    editDescription.value = foundTodo.description;
    editDueDate.value = foundTodo.dueDate;
    editProject.value = foundTodo.project;
    editImportant.checked = foundTodo.important;
    editModal.dataset.id = foundTodo.id;
  } else if (button.className === "material-symbols-outlined imp-button") {
    const changedTodo = changeImportance(foundCard.dataset.id);

    if (!changedTodo.important) {
      delete foundCard.dataset.important;
    } else {
      foundCard.dataset.important = "";
    }
    button.style.fontVariationSettings =
      changedTodo.important === true ? `"FILL" 1` : `"FILL" 0`;
    button.nextElementSibling.textContent =
      changedTodo.important === true
        ? "Remove importance"
        : "Make important";
  } else if (button.className === "material-symbols-outlined delete-button") {
    foundBigCard.remove();
    foundCard.remove();
    foundCardContainer.remove();

    deleteTodo(foundCard.dataset.id);
  } else {
    return;
  }
};

const editTodoUI = e => {
  e.preventDefault();
  const cardId = e.target.parentElement.parentElement.parentElement.dataset.id;
  const todos = getLocal().todos;
  const foundTodo = todos.find(todo => todo.id === cardId);

  document.querySelectorAll(".todo-card").forEach(c => {
    if (c.dataset.id === cardId) {
      c.dataset.projectname = editProject.value;
      c.children[1].textContent = editTitle.value;
      c.children[2].textContent = editDueDate.value;
      if (!editImportant.checked) {
        delete c.dataset.important;
      }
    }
  });
  document.querySelectorAll(".big-todo-card").forEach(bc => {
    if (bc.dataset.bid === cardId) {
      bc.children[0].textContent = editTitle.value;
      bc.children[1].textContent = editDueDate.value;
      bc.children[2].textContent = editDescription.value;
      bc.children[5].style.fontVariationSettings =
        editImportant.checked === true ? `"FILL" 1` : `"FILL" 0`;
      bc.children[6].textContent =
        editImportant.important === true
          ? "Remove importance"
          : "Make important";
    }
  });

  editTodo(cardId);

  modalHandler(e);
};

export {
  loadAllTodos,
  loadTodayTodos,
  loadImportantTodos,
  checkTodoUI,
  toggleBigCard,
  createCard,
  createAllTodos,
  createBigCard,
  createAllProjects,
  toggleProjects,
  createProjectsSidebar,
  loadSpecificProject,
  handleBigCardButtons,
  modalHandler,
  editTodoUI,
  deleteProjectUI,
};
