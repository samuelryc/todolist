import "../reset.css";
import "../App.css";
import { useEffect, useState, useRef } from "react";
import NoTodos from "./NoTodos";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import useLocalStorage from "../hooks/useLocalStorage";
import { TodosContext } from "../context/TodosContext";
import { CSSTransition, SwitchTransition } from "react-transition-group";

function App() {
  const [name, setName] = useLocalStorage('name', '');
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);
  const [filter, setFilter] = useState("all");

  function todosFiltered() {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.isComplete);
      case "completed":
        return todos.filter((todo) => todo.isComplete);
      default:
        return todos;
    }
  }

  return (
    <TodosContext.Provider value={{todos, setTodos, idForTodo, setIdForTodo, filter, setFilter, todosFiltered }}>
      <div className="todo-app">
        <TodoForm />

        <SwitchTransition mode="out-in">
          <CSSTransition key={todos.length > 0} timeout={300} classNames="slide-vertical" unmountOnExit>
            {todos.length > 0 ? <TodoList /> : <NoTodos />}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
