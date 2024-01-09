import "../reset.css";
import "../App.css";
import { useEffect, useState } from "react";
import NoTodos from "./NoTodos";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import useLocalStorage from "../hooks/useLocalStorage";
import { TodosContext } from "../context/TodosContext";
import { CSSTransition, SwitchTransition } from "react-transition-group";

function App() {
    const [ todos, setTodos ] = useLocalStorage("todos", []);
    const [ idForTodo, setIdForTodo ] = useLocalStorage("idForTodo", 1);
    const [ filter, setFilter ] = useState("all");

    useEffect(() => {
        fetch(
            process.env.REACT_APP_URL_FETCH_TODOS, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"user_id":"1"})
            }
        )
        .then(data => data.json())
        .then(response_todos => setTodos(JSON.parse(response_todos.message)));
    }, []);

    function todosFiltered() {
        switch (filter) {
            case "all":
                return todos;
            case "active":
                return todos.filter(todo => todo.status_id === 1);
            case "completed":
                return todos.filter(todo => todo.status_id === 2);
            default:
                return todos;
        }
    }

    return (
        <TodosContext.Provider value={{todos, setTodos, idForTodo, setIdForTodo, filter, setFilter, todosFiltered}}>
        <div className="todo-app">
            <TodoForm />
            <SwitchTransition mode="out-in">
                <CSSTransition key={ todos.length > 0 } timeout={ 300 } classNames="slide-vertical" unmountOnExit>
                    { todos.length > 0 ? <TodoList /> : <NoTodos /> }
                </CSSTransition>
            </SwitchTransition>
        </div>
        </TodosContext.Provider>
    );
}

export default App;
