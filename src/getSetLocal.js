const setLocal = (todos, projects) => {
  if (todos === "") {
    localStorage.setItem("projects", JSON.stringify(projects));
  } else if (projects === "") {
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("projects", JSON.stringify(projects));
  }
};

const getLocal = () => {
  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
    localStorage.setItem(
      "projects",
      JSON.stringify([{ name: "all-todos", todos: [] }])
    );
  }
  const todos = JSON.parse(localStorage.getItem("todos"));
  const projects = JSON.parse(localStorage.getItem("projects"));

  return { todos, projects };
};

export { setLocal, getLocal };
