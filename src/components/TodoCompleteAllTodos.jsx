import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoCompleteAllTodos() {
  const { todos, setTodos } = useContext(TodosContext);

  function completeAllTodos() {
    const completedTodos = todos.map((todo) => {
      todo.isComplete = true;
      return todo;
    });

    setTodos(completedTodos);
  }

  return (
    <div>
      <div onClick={completeAllTodos} className="button">
        Check All
      </div>
    </div>
  );
}

export default TodoCompleteAllTodos;
