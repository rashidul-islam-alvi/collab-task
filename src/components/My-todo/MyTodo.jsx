import { Divider } from "@mantine/core";
import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import FilterTodos from "./FilterTodos";
import TodosList from "./TodosList";
import Sidebar from "../Sidebar/Sidebar";

const MyTodo = ({ header }) => {
  const [todos, setTodos] = useState([]);

  return (
    <div className="flex w-screen h-screen ">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-[1] p-5 ">
        <div>
          <div className="text-2xl "> My To-do</div>
          <Divider my={"xs"} className="w-full" />

          <AddTodoForm setTodos={setTodos} todos={todos} />

          <Divider my={"xs"} className="w-full" />
        </div>

        <div className="flex-[6] my-5">
          <TodosList setTodos={setTodos} todos={todos} />
        </div>
      </div>
    </div>
  );
};

export default MyTodo;
