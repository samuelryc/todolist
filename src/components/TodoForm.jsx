import React, { useContext, useState } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoForm() {
    const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext);
    const [ todoInput, setTodoInput ] = useState("");

    function handleInput(event) {
        setTodoInput(event.target.value);
    }

    function addTodo(event) {
        event.preventDefault();

        if (todoInput.trim().length === 0) {
            return;
        }

        setTodos(
            [
                ...todos,
                {
                    id: idForTodo,
                    title: todoInput,
                    status_id: 1
                }
            ]
        );

        fetch(
            process.env.REACT_APP_URL_CREATE_TODO, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "user_id" : 1 + "",
                        "title" : todoInput
                    }
                )
            }
        )
        .then(data => data.json())
        .then(response_todos => ""); // need to handle if API does not respond correctly

        setIdForTodo(previousIdForTodo => idForTodo + 1);
        setTodoInput("");
    }

    return (
        <form action="#" onSubmit={addTodo}>
            <input
                type="text"
                value={todoInput}
                onChange={handleInput}
                className="todo-input"
                placeholder="What do you need to do?"
            />
        </form>
    );
}

export default TodoForm;
