import {
  newDescription,
  newDueDate,
  newImportant,
  newProject,
  newTitle,
} from "./domSelectors";
import {
  createBigCard,
  createCard,
  loadAllTodos,
  modalHandler,
} from "./interface";

class Todo {
  constructor(title, description, dueDate, important, project) {
    this.id = new Date().valueOf().toString();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.important = important;
    this.project = project;
    this.isCompleted = false;
  }

  set isCompleted(value) {
    return (this._isCompleted = value);
  }
}

const todos = [
  {
    id: "1",
    title: "first",
    description: "test",
    dueDate: "2023-03-30",
    important: true,
    project: "all-todos",
    isCompleted: false,
  },
  {
    id: "2",
    title: "today",
    description: "test2",
    dueDate: "2023-04-01",
    important: false,
    project: "all-todos",
    isCompleted: false,
  },
  {
    id: "3",
    title: "project todo",
    description: "test",
    dueDate: "2023-04-02",
    important: true,
    project: "Personal",
    isCompleted: false,
  },
  {
    id: "4",
    title: "work todo",
    description: "work test",
    dueDate: "2023-04-04",
    important: true,
    project: "Work",
    isCompleted: false,
  },
];

const createTodo = e => {
  e.preventDefault();
  const todo = new Todo(
    newTitle.value,
    newDescription.value,
    newDueDate.value,
    newImportant.checked,
    newProject.value
  );
  todos.push(todo);
  const card = createCard(todo);
  createBigCard(todo, card);
  modalHandler(e);
  // change when in project
  loadAllTodos();
};

export { createTodo, todos };
