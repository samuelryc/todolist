import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoCompleteAllTodos() {
    const { todos, setTodos } = useContext(TodosContext);

    function completeAllTodos() {
        const completedTodos = todos.map(
            todo => {
                todo.status_id = 2;
                return todo;
            }
        );

        setTodos(completedTodos);

        const todos_id = todos.map(
            todo => todo.id + ""
        );

        fetch(
            process.env.REACT_APP_URL_CHECK_ALL_TODOS, 
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
        <div>
            <div onClick={completeAllTodos} className="button">
                Check All
            </div>
        </div>
    );
}

export default TodoCompleteAllTodos;
