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

export { Todo, todos };
