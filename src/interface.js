import { format } from "date-fns";
import {
  addProject,
  editDescription,
  editDueDate,
  editImportant,
  editModal,
  editProject,
  editTitle,
  newProject,
  projectModal,
  projectsUl,
  todoModal,
  todosContent,
  warning,
} from "./domSelectors";
import { getLocal, setLocal } from "./getSetLocal";

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
    case "edit-button":
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
  return cardContainer;
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
  impButton.style.backgroundColor = todo.important === true ? "green" : "red";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "delete";

  bigCard.appendChild(todoTitle);
  bigCard.appendChild(todoDueDate);
  bigCard.appendChild(todoDesc);
  bigCard.appendChild(editButton);
  bigCard.appendChild(impButton);
  bigCard.appendChild(deleteButton);
  card.appendChild(bigCard);
};

const createAllTodos = () => {
  getLocal().todos.forEach(todo => {
    const card = createCard(todo);
    createBigCard(todo, card);
  });
};

const loadAllTodos = e => {
  warning.textContent = "";

  if (getLocal().todos.length === 0) {
    warning.textContent = "there is no todo";
  } else {
    document
      .querySelectorAll(".todo-card")
      .forEach(card => (card.style.display = "block"));
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
    sortHtml(todayTodos);
  }
  toggleBigCard(e);
};

const loadImportantTodos = e => {
  const importantTodos = getLocal().todos.filter(
    todo => todo.important === true
  );

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
    sortHtml(importantTodos);
  }

  toggleBigCard(e);
};

const checkTodo = e => {
  if (e.target.className === "material-symbols-outlined checkbox") {
    const card = e.target.parentElement;

    const todos = getLocal().todos;
    const projects = getLocal().projects;
    const foundTodo = todos.find(todo => todo.id === card.dataset.id);
    const foundProject = projects.find(p => p.name === foundTodo.project);
    const foundProjectTodo = foundProject.todos.find(
      t => t.id === card.dataset.id
    );
    const todoIndex = todos.indexOf(foundTodo);
    const projectIndex = projects.indexOf(foundProject);
    const projectTodoIndex = foundProject.todos.indexOf(foundProjectTodo);

    foundTodo.isCompleted = !foundTodo.isCompleted;
    foundProjectTodo.isCompleted = !foundProjectTodo.isCompleted;
    todos[todoIndex] = foundTodo;
    foundProject.todos[projectTodoIndex] = foundProjectTodo;
    projects[projectIndex] = foundProject;
    setLocal(todos, projects);

    card.style.opacity = 0.5;
    card.style.textDecoration = "line-through";
  }
};

const toggleBigCard = e => {
  if (!e) return;
  if (!e.target) {
    document.querySelectorAll(".big-todo-card").forEach(bc => {
      bc.style.display = "none";
    });
  } else {
    if (e.target.className === "todo-card") {
      const card = e.target;
      const bigCard = card.nextElementSibling;
      bigCard.style.display =
        bigCard.style.display === "block" ? "none" : "block";
    } else if (e.currentTarget !== todosContent) {
      document.querySelectorAll(".big-todo-card").forEach(bc => {
        bc.style.display = "none";
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
    projectName.style.display = "block";
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
  }
};

const deleteProject = e => {
  console.log(e);
  if (e.target.nodeName !== "BUTTON") return;
  const projectElement = e.target.parentElement;
  const projectName = projectElement.dataset.name;

  projectElement.remove();

  const projects = getLocal().projects;
  const todos = getLocal().todos;
  const foundProject = projects.find(p => p.name === projectName);
  const projectIndex = projects.indexOf(foundProject);
  const allTodosProject = projects[0];
  foundProject.todos.forEach(t => {
    todos.forEach(todo => {
      if (todo.id === t.id) {
        todos.splice(todos.indexOf(todo), 1);
      }
    });
    allTodosProject.todos.forEach(todo => {
      if (todo.id === t.id) {
        allTodosProject.todos.splice(allTodosProject.todos.indexOf(todo), 1);
      }
    });
    document.querySelectorAll(".card-container").forEach(c => {
      if (c.dataset.ccid === t.id) {
        c.remove();
      }
    });
  });
  projects[0] = allTodosProject;
  projects.splice(projectIndex, 1);
  setLocal(todos, projects);
  loadAllTodos();
};

const createAllProjects = () => {
  getLocal().projects.forEach(project => {
    createProjectsSidebar(project);
  });
};

const loadAllProjects = () => {
  document
    .querySelectorAll(".created-project")
    .forEach(project => (project.style.display = "block"));
};

const loadSpecificProject = e => {
  const selectedProject = e.target ? e.target.dataset.name : e;
  if (!selectedProject) return;

  const foundProject = getLocal().projects.find(
    project => project.name === selectedProject
  );
  console.log(foundProject);

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
    console.log(foundProject.todos);
    sortHtml(foundProject.todos);
  }

  toggleBigCard(e);
};

const toggleProjects = () => {
  addProject.style.display =
    addProject.style.display === "none" ? "block" : "none";
  document.querySelectorAll(".created-project").forEach(project => {
    project.style.display =
      project.style.display === "block" ? "none" : "block";
  });
};

const handleBigCardButtons = e => {
  e.preventDefault();
  if (e.target.nodeName !== "BUTTON") return;
  const button = e.target;
  const foundBigCard = button.parentElement;
  const foundCard = foundBigCard.previousElementSibling;
  const foundCardContainer = foundCard.parentElement;
  const todos = getLocal().todos;
  const projects = getLocal().projects;
  const allTodosProject = projects[0];
  const foundTodo = todos.find(todo => todo.id === foundBigCard.dataset.bid);

  const foundProject = projects.find(p => p.name === foundTodo.project);

  const foundProjectTodo = foundProject.todos.find(
    t => t.id === foundBigCard.dataset.bid
  );

  const foundAllTodosTodo = allTodosProject.todos.find(
    t => t.id === foundBigCard.dataset.bid
  );
  const todoIndex = todos.indexOf(foundTodo);
  const projectIndex = projects.indexOf(foundProject);
  const projectTodoIndex = foundProject.todos.indexOf(foundProjectTodo);
  const allTodosIndex = allTodosProject.todos.indexOf(foundAllTodosTodo);

  if (button.className === "edit-button") {
    editTitle.value = foundTodo.title;
    editDescription.value = foundTodo.description;
    editDueDate.value = foundTodo.dueDate;
    editProject.value = foundTodo.project;
    editImportant.checked = foundTodo.important;
    editModal.dataset.id = foundTodo.id;
  } else if (button.className === "imp-button") {
    console.log(foundProjectTodo.important);
    foundTodo.important = !foundTodo.important;
    foundProjectTodo.important = !foundProjectTodo.important;
    console.log(foundProjectTodo.important);
    if (!foundTodo.important) {
      delete foundCard.dataset.important;
    } else {
      foundCard.dataset.important = "";
    }
    button.style.backgroundColor =
      foundTodo.important === true ? "green" : "red";
    todos[todoIndex] = foundTodo;
    console.log(foundProject.todos[projectTodoIndex].important);
    foundProject.todos[projectTodoIndex] = foundProjectTodo;

    projects[projectIndex] = foundProject;
    if (foundProject.name !== "all-todos") {
      foundAllTodosTodo.important = !foundAllTodosTodo.important;
      allTodosProject.todos[allTodosIndex] = foundAllTodosTodo;
      projects[0] = allTodosProject;
    }

    setLocal(todos, projects);
  } else if (button.className === "delete-button") {
    foundBigCard.remove();
    foundCard.remove();
    foundCardContainer.remove();

    todos.splice(todoIndex, 1);
    foundProject.todos.splice(projectTodoIndex, 1);
    projects[projectIndex] = foundProject;
    if (foundProject.name !== "all-todos") {
      allTodosProject.todos.splice(allTodosIndex, 1);
      projects[0] = allTodosProject;
    }

    setLocal(todos, projects);

    // may fix
    // loadAllTodos();
  } else {
    return;
  }
};

const editTodo = e => {
  e.preventDefault();
  const cardId = e.target.parentElement.parentElement.parentElement.dataset.id;
  const todos = getLocal().todos;
  const projects = getLocal().projects;
  const allTodosProject = projects[0];
  const foundTodo = todos.find(todo => todo.id === cardId);
  const foundProject = projects.find(p => p.name === foundTodo.project);
  const foundProjectTodo = foundProject.todos.find(t => t.id === cardId);
  const foundAllTodosTodo = allTodosProject.todos.find(t => t.id === cardId);
  const todoIndex = todos.indexOf(foundTodo);
  const projectIndex = projects.indexOf(foundProject);
  const projectTodoIndex = foundProject.todos.indexOf(foundProjectTodo);
  const allTodosIndex = allTodosProject.todos.indexOf(foundAllTodosTodo);

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
      bc.children[4].style.backgroundColor =
        editImportant.checked === true ? "green" : "red";
    }
  });

  foundTodo.title = editTitle.value;
  foundTodo.description = editDescription.value;
  foundTodo.dueDate = editDueDate.value;
  // foundTodo.project = editProject.value;
  foundTodo.important = editImportant.checked;
  console.log(foundTodo);

  if (foundTodo.project !== editProject.value) {
    const newProjectName = editProject.value;
    const oldProjectName = foundTodo.project;
    const oldProject = projects.find(p => p.name === oldProjectName);
    const newProject = projects.find(p => p.name === newProjectName);
    const newIndex = projects.indexOf(newProject);
    const oldIndex = projects.indexOf(oldProject);
    foundTodo.project = newProjectName;
    if (oldProjectName !== "all-todos") {
      oldProject.todos.splice(projectTodoIndex, 1);
      projects[oldIndex] = oldProject;
    }
    if (newProjectName !== "all-todos") {
      newProject.todos.push(foundTodo);
      const sortedProjectTodos = newProject.todos.sort((a, b) =>
        a.dueDate > b.dueDate ? 1 : -1
      );
      newProject.todos = sortedProjectTodos;
      projects[newIndex] = newProject;
    }
    todos[todoIndex] = foundTodo;
    const sortedTodos = todos.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
    setLocal(sortedTodos, projects);
    if (oldProjectName === "all-todos") {
      loadAllTodos();
    } else {
      loadSpecificProject(oldProjectName);
    }
  } else {
    todos[todoIndex] = foundTodo;
    foundProject.todos[projectTodoIndex] = foundTodo;
    const sortedProjectTodos = foundProject.todos.sort((a, b) =>
      a.dueDate > b.dueDate ? 1 : -1
    );
    foundProject.todos = sortedProjectTodos;
    projects[projectIndex] = foundProject;
    if (foundProject.name !== "all-todos") {
      allTodosProject.todos[allTodosIndex] = foundTodo;
      const sortedAllTodosTodos = allTodosProject.todos.sort((a, b) =>
        a.dueDate > b.dueDate ? 1 : -1
      );
      allTodosProject.todos = sortedAllTodosTodos;
      projects[0] = allTodosProject;
    }
    const sortedTodos = todos.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
    setLocal(sortedTodos, projects);
    if (foundTodo.project === "all-todos") {
      loadAllTodos();
    } else {
      loadSpecificProject(foundTodo.project);
    }
  }

  modalHandler(e);
};

export {
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
  handleBigCardButtons,
  modalHandler,
  editTodo,
  deleteProject,
};
