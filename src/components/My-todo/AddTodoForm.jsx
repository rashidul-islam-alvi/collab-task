import { Button, Input } from "@mantine/core";
import React, { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useForm } from "@mantine/form";

const AddTodoForm = ({ setTodos, todos }) => {
  const [isNewTask, setIsNewTask] = useState(false);
  const { user } = useAuth();

  const form = useForm({
    initialValues: {
      name: "",
    },
  });

  const hanldeTaskButton = (type) => {
    if (type === "toggle-btn") {
      setIsNewTask((prev) => !prev);
    }
    if (type === "add-btn") {
      const existingMytodos = localStorage.getItem("my-todos");

      const mytodosArray = existingMytodos ? JSON.parse(existingMytodos) : [];

      const newTodo = {
        taskName: form.values.name,
        owner: user.email,
        isCompleted: false,
        priority: "low",
      };

      mytodosArray.push(newTodo);
      setTodos(mytodosArray.filter((todo) => todo.owner === user.email));
      localStorage.setItem("my-todos", JSON.stringify(mytodosArray));

      setIsNewTask(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isNewTask ? (
        <div>
          <form
            className="flex gap-2"
            onSubmit={form.onSubmit(() => hanldeTaskButton("add-btn"))}
          >
            <Input
              autoFocus
              w={300}
              required
              label="Task Name"
              placeholder="Type here..."
              onChange={(e) =>
                form.setFieldValue("name", e.currentTarget.value)
              }
            />
            <Button
              variant="outline"
              size="sm"
              styles={(theme) => ({
                root: {
                  borderColor: "green",
                  color: "green",
                },
              })}
              type="submit"
            >
              ✔️
            </Button>
            <Button
              variant="outline"
              size="sm"
              styles={(theme) => ({
                root: {
                  borderColor: "red",
                  color: "red",
                },
              })}
              onClick={() => hanldeTaskButton("toggle-btn")}
            >
              x
            </Button>
          </form>
        </div>
      ) : (
        <>
          <Button
            onClick={() => hanldeTaskButton("toggle-btn")}
            variant="outline"
            size="sm"
          >
            +
          </Button>
          <h1 className="text-xl italic">Task</h1>
        </>
      )}
    </div>
  );
};

export default AddTodoForm;
