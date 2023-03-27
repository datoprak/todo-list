import {
  newDescription,
  newDueDate,
  newImportant,
  newProject,
  newTitle,
} from "./domSelectors";

class Todo {
  constructor(title, description, dueDate, important, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.important = important;
    this.project = project;
  }
}

const todos = [];

const createTodo = () => {
  const todo = new Todo(
    newTitle,
    newDescription,
    newDueDate,
    newImportant,
    newProject
  );
  todos.push(todo);
};
