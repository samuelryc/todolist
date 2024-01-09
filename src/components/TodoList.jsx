import React, { useContext } from "react";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoClearCompleted from "./TodoClearCompleted";
import TodoCompleteAllTodos from "./TodoCompleteAllTodos";
import TodoFilters from "./TodoFilters";
import useToggle from "../hooks/useToggle";
import { TodosContext } from "../context/TodosContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function TodoList() {
    const { todosFiltered, setTodos, todos } = useContext(TodosContext);
    const [ isFeaturesOneVisible, setFeaturesOneVisible ] = useToggle();
    const [ isFeaturesTwoVisible, setFeaturesTwoVisible ] = useToggle();

    function deleteTodo(id) {
        setTodos([...todos].filter(todo => todo.id !== id));

        fetch(
            process.env.REACT_APP_URL_DELETE_TODO, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "todo_id" : id + ""
                    }
                )
            }
        )
        .then(data => data.json())
        .then(response_todos => ""); // need to handle if API does not respond correctly
    }

    function todoCompletionTrigger(id) {
        let todo_id = null;
        let action = "complete";

        const updatedTodos = todos.map(
            todo => {
                if (todo.id === id) {
                    todo_id = id;
                    switch (todo.status_id) {
                        case 1:
                            todo.status_id = 2;
                            break;
                        case 2:
                            todo.status_id = 1;
                            action = "active";
                            break;
                        default:
                            todo.status_id = 1;
                    }
                }

                return todo;
            }
        );

        setTodos(updatedTodos);

        let url = process.env.REACT_APP_URL_FINISH_TODO;

        if (action === "active") {
            url = process.env.REACT_APP_URL_ACTIVE_TODO;
        }

        fetch(
            url, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "todo_id" : todo_id + ""
                    }
                )
            }
        )
        .then(data => data.json())
        .then(response => ""); // need to handle if API does not respond correctly
    }

    function todoEditingTrigger(id) {
        const updatedTodos = todos.map(
            todo => {
                if (todo.id === id) {
                    todo.isEditing = !todo.isEditing;
                }

                return todo;
            }
        );

        setTodos(updatedTodos);
    }

    function updateTodo(event, id) {
        const updatedTodos = todos.map(
            todo => {
                if (todo.id === id) {
                    todo.isEditing = false;

                    if (event.target.value.trim().length === 0) {
                        return todo;
                    }

                    todo.title = event.target.value;
                }

                return todo;
            }
        );

        setTodos(updatedTodos);
    }

    return (
        <>
        <TransitionGroup component="ul" className="todo-list">
            {
                todosFiltered().map(
                    (todo, index) => 
                    (
                        <CSSTransition 
                            key={todo.id} 
                            timeout={300} 
                            classNames="slide-horizontal"
                        >
                            <li className="todo-item-container">
                                <div className="todo-item">
                                    <input
                                        type="checkbox"
                                        onChange={() => todoCompletionTrigger(todo.id)}
                                        checked={todo.status_id === 2 ? true : false}
                                    />
                                    {
                                        !todo.isEditing ? (
                                            <span
                                                className={`todo-item-label ${todo.status_id === 2 ? "line-through" : ""}`}
                                                onDoubleClick={() => todoEditingTrigger(todo.id)}
                                            >
                                                {todo.title}
                                            </span>
                                        ) : (
                                            <input
                                                type="text"
                                                className="todo-item-input"
                                                defaultValue={todo.content}
                                                onBlur={event => updateTodo(event, todo.id)}
                                                onKeyDown={
                                                    event => {
                                                        if (event.key === "Enter") {
                                                            updateTodo(event, todo.id);
                                                        } else if (event.key === "Escape") {
                                                            todoEditingTrigger(todo.id);
                                                        }
                                                    }
                                                }
                                                autoFocus
                                            />
                                        )
                                    }
                                </div>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="x-button"
                                >
                                    <svg
                                        className="x-button-icon"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                    </svg>
                                </button>
                            </li>
                        </CSSTransition>
                    )
                )
            }
        </TransitionGroup>

        <div className="toggles-container">
            <button onClick={setFeaturesOneVisible} className="button">Features One Toggle</button>
            <button onClick={setFeaturesTwoVisible} className="button">Features Two Toggle</button>
        </div>

        <CSSTransition
            in={isFeaturesOneVisible}
            timeout={300}
            classNames="slide-vertical"
            unmountOnExit
        >
            <div className="check-all-container">
                <TodoCompleteAllTodos />
                <TodoItemsRemaining />
            </div>
        </CSSTransition>

        <CSSTransition
            in={isFeaturesTwoVisible}
            timeout={300}
            classNames="slide-vertical"
            unmountOnExit
        >
            <div className="other-buttons-container">
                <TodoFilters />
                <div>
                    <TodoClearCompleted />
                </div>
            </div>
        </CSSTransition>
        </>
    );
}

export default TodoList;
