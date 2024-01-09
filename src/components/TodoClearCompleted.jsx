import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoClearCompleted() {
    const { todos, setTodos } = useContext(TodosContext);

    function clearCompleted() {
        let todos_id = todos.filter(
            todo => todo.status_id === 2
        );

        todos_id = todos_id.map(todo => todo.id + "");

        setTodos([...todos].filter(todo => todo.status_id !== 2));

        fetch(
            process.env.REACT_APP_URL_CLEAR_COMPLETED_TODOS, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "todos_id" : todos_id
                    }
                )
            }
        )
        .then(data => data.json())
        .then(response_todos => ""); // need to handle if API does not respond correctly
    }

    return (
        <button onClick={clearCompleted} className="button">
            Delete completed
        </button>
    );
}

export default TodoClearCompleted;
