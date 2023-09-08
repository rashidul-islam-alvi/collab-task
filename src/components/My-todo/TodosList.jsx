import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/useAuth";
import { Button } from "@mantine/core";
import FilterTodos from "./FilterTodos";

const TodosList = ({ todos, setTodos }) => {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Retrieve todos from local storage
    const storedTodos = JSON.parse(localStorage.getItem("my-todos")) || [];

    const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];

    const filteredProjects = existingProjects.filter(
      (project) =>
        project.owner === user.email ||
        project.shareWithOthers.includes(user.email)
    );

    setProjects(filteredProjects);
    // Filter todos by owner's email
    const filteredTodos = storedTodos.filter(
      (todo) => todo.owner === user.email
    );

    // Update the state with filtered todos
    setTodos(filteredTodos);
  }, [user.email]);

  const handleTodoAction = (taskName, action) => {
    const todoList = localStorage.getItem("my-todos");

    if (todoList) {
      const todoListArr = JSON.parse(todoList);

      todoListArr.forEach((todo, index) => {
        if (todo.taskName === taskName) {
          if (action === "delete") {
            todoListArr.splice(index, 1);
          } else if (action === "complete") {
            todo.isCompleted = !todo.isCompleted;
          }
        }
      });

      localStorage.setItem("my-todos", JSON.stringify(todoListArr));
      setTodos(todoListArr.filter((todo) => todo.owner === user.email));
    }
  };

  return (
    <div className="flex h-full gap-5 ">
      <div className="flex-[1] rounded-lg p-5 shadow-md">
        <h1 className="text-xl font-semibold">All Todos : </h1>
        <div className="my-5">
          <FilterTodos />
        </div>
        <ul className="flex flex-col">
          {todos.map((todo, index) => (
            <div key={index}>
              <li className="flex items-center justify-between py-2 duration-300 ease-in border-b-2">
                {todo.taskName}
                <div className="flex items-center justify-center gap-2">
                  {todo.isCompleted && (
                    <h1 className="text-green-400">completed</h1>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => handleTodoAction(todo.taskName, "complete")}
                  >
                    ✔️
                  </Button>
                  <Button
                    variant="outline"
                    styles={(theme) => ({
                      root: {
                        borderColor: "red",
                        color: "red",
                      },
                    })}
                    onClick={() => () =>
                      handleTodoAction(todo.taskName, "delete")}
                  >
                    x
                  </Button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="flex-[1] flex flex-col gap-5 ">
        <div className="flex-[1] p-5 rounded-lg shadow-md">
          <h1 className="mb-5 text-xl font-semibold">Assigned Projects : </h1>
          <div className="flex flex-grow-0 gap-5">
            {projects.map((project) => (
              <a
                href={`/projects/${project.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                key={project.name}
              >
                <div className="h-[110px] flex justify-center items-center font-semibold cursor-pointer shadow-md w-[160px] bg-slate-50">
                  {project.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosList;
