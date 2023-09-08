export function getProjectsFromLocalStorage() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  return projects;
}

export function getTodosFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("my-todos")) || [];
  return todos;
}
