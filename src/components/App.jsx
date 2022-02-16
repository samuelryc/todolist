import "../reset.css";
import "../App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import NoTodos from "./NoTodos";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function App() {
  const [name, setName] = useState("");
  const nameInputEl = useRef(null);

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish React Series",
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: "Go Grocery",
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: "Take over the world",
      isComplete: false,
      isEditing: false,
    },
  ]);

  const [idForTodo, setIdForTodo] = useState(4);

  function addTodo(todo) {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isComplete: false,
      },
    ]);

    setIdForTodo((previousIdForTodo) => idForTodo + 1);
  }

  function deleteTodo(id) {
    setTodos([...todos].filter((todo) => todo.id !== id));
  }

  function todoCompletionTrigger(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function todoEditingTrigger(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = !todo.isEditing;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
        if (event.target.value.trim().length === 0) {
          return todo;
        }

        todo.title = event.target.value;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function remainingCalculation() {
    return todos.filter((todo) => !todo.isComplete).length;
  }

  const remaining = useMemo(remainingCalculation, [todos]);

  function clearCompleted() {
    setTodos([...todos].filter((todo) => !todo.isComplete));
  }

  function completeAllTodos() {
    const completedTodos = todos.map((todo) => {
      todo.isComplete = true;
      return todo;
    });

    setTodos(completedTodos);
  }

  function todosFiltered(filter) {
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

  useEffect(() => {
    nameInputEl.current.focus();

    return function cleanup() {
      //console.log('test');
    }
  }, []);

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">
          <h2>What is your name?</h2>
          <form action="#">
            <input
              type="text"
              className="todo-input"
              ref={nameInputEl}
              placeholder="What is your name?"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {name && <p className="name-label">Hello, {name}</p>}
          </form>
        </div>
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />

        {todos.length > 0 ? (
          <TodoList
            deleteTodo={deleteTodo}
            todoCompletionTrigger={todoCompletionTrigger}
            todos={todos}
            todoEditingTrigger={todoEditingTrigger}
            updateTodo={updateTodo}
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;