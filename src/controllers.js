import { getLocal, setLocal } from "./getSetLocal";
import { loadAllTodos, loadSpecificProject } from "./interface";
import {
  editDescription,
  editDueDate,
  editImportant,
  editProject,
  editTitle,
} from "./domSelectors";

const checkTodo = cardId => {
  const found = findTodo(cardId);

  found.foundTodo.isCompleted = !found.foundTodo.isCompleted;
  found.foundProjectTodo.isCompleted = !found.foundProjectTodo.isCompleted;
  found.foundAllTodosTodo.isCompleted = !found.foundAllTodosTodo.isCompleted;
  found.todos[found.todoIndex] = found.foundTodo;
  found.foundProject.todos[found.projectTodoIndex] = found.foundProjectTodo;
  found.projects[found.projectIndex] = found.foundProject;
  found.allTodosProject.todos[found.allTodosIndex] = found.foundAllTodosTodo;
  found.projects[0] = found.allTodosProject;
  setLocal(found.todos, found.projects);
};

const deleteProject = projectName => {
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
  });
  projects[0] = allTodosProject;
  projects.splice(projectIndex, 1);
  setLocal(todos, projects);
};

const changeImportance = cardId => {
  const found = findTodo(cardId);

  found.foundTodo.important = !found.foundTodo.important;
  found.foundProjectTodo.important = !found.foundProjectTodo.important;
  found.todos[found.todoIndex] = found.foundTodo;
  found.foundProject.todos[found.projectTodoIndex] = found.foundProjectTodo;
  found.projects[found.projectIndex] = found.foundProject;

  if (found.foundProject.name !== "all-todos") {
    found.foundAllTodosTodo.important = !found.foundAllTodosTodo.important;
    found.allTodosProject.todos[found.allTodosIndex] = found.foundAllTodosTodo;
    found.projects[0] = found.allTodosProject;
  }

  setLocal(found.todos, found.projects);
  return found.foundTodo;
};

const deleteTodo = cardId => {
  const found = findTodo(cardId);

  found.todos.splice(found.todoIndex, 1);
  found.foundProject.todos.splice(found.projectTodoIndex, 1);
  found.projects[found.projectIndex] = found.foundProject;
  if (found.foundProject.name !== "all-todos") {
    found.allTodosProject.todos.splice(found.allTodosIndex, 1);
    found.projects[0] = found.allTodosProject;
  }

  setLocal(found.todos, found.projects);
};

const editTodo = cardId => {
  const found = findTodo(cardId);

  found.foundTodo.title = editTitle.value;
  found.foundTodo.description = editDescription.value;
  found.foundTodo.dueDate = editDueDate.value;
  found.foundTodo.important = editImportant.checked;

  if (found.foundTodo.project !== editProject.value) {
    const newProjectName = editProject.value;
    const oldProjectName = found.foundTodo.project;
    const oldProject = found.projects.find(p => p.name === oldProjectName);
    const newProject = found.projects.find(p => p.name === newProjectName);
    const newIndex = found.projects.indexOf(newProject);
    const oldIndex = found.projects.indexOf(oldProject);
    found.foundTodo.project = newProjectName;
    if (oldProjectName !== "all-todos") {
      oldProject.todos.splice(found.projectTodoIndex, 1);
      found.projects[oldIndex] = oldProject;
      found.foundAllTodosTodo.project = newProjectName;
      found.allTodosProject.todos[found.allTodosIndex] =
        found.foundAllTodosTodo;
      found.projects[0] = found.allTodosProject;
    }
    if (newProjectName !== "all-todos") {
      newProject.todos.push(found.foundTodo);
      const sortedProjectTodos = newProject.todos.sort((a, b) =>
        a.dueDate > b.dueDate ? 1 : -1
      );
      newProject.todos = sortedProjectTodos;
      found.projects[newIndex] = newProject;
    }
    found.todos[found.todoIndex] = found.foundTodo;
    const sortedTodos = found.todos.sort((a, b) =>
      a.dueDate > b.dueDate ? 1 : -1
    );
    setLocal(sortedTodos, found.projects);
    if (oldProjectName === "all-todos") {
      loadAllTodos();
    } else {
      loadSpecificProject(oldProjectName);
    }
  } else {
    found.todos[found.todoIndex] = found.foundTodo;
    found.foundProject.todos[found.projectTodoIndex] = found.foundTodo;
    const sortedProjectTodos = found.foundProject.todos.sort((a, b) =>
      a.dueDate > b.dueDate ? 1 : -1
    );
    found.foundProject.todos = sortedProjectTodos;
    found.projects[found.projectIndex] = found.foundProject;
    if (found.foundProject.name !== "all-todos") {
      found.allTodosProject.todos[found.allTodosIndex] = found.foundTodo;
      const sortedAllTodosTodos = found.allTodosProject.todos.sort((a, b) =>
        a.dueDate > b.dueDate ? 1 : -1
      );
      found.allTodosProject.todos = sortedAllTodosTodos;
      found.projects[0] = found.allTodosProject;
    }
    const sortedTodos = found.todos.sort((a, b) =>
      a.dueDate > b.dueDate ? 1 : -1
    );
    setLocal(sortedTodos, found.projects);
    if (found.foundTodo.project === "all-todos") {
      loadAllTodos();
    } else {
      loadSpecificProject(found.foundTodo.project);
    }
  }
};

const findTodo = cardId => {
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

  return {
    todos,
    projects,
    allTodosProject,
    foundTodo,
    foundProject,
    foundProjectTodo,
    foundAllTodosTodo,
    todoIndex,
    projectIndex,
    projectTodoIndex,
    allTodosIndex,
  };
};

export { checkTodo, deleteProject, changeImportance, deleteTodo, editTodo };
