import React, { useContext, useMemo } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoItemsRemaining() {
    const { todos } = useContext(TodosContext);

    function remainingCalculation() {
        return todos.filter((todo) => todo.status_id !== 2).length;
    }

    const remaining = useMemo(remainingCalculation, [todos]);

    return <span>{remaining} {remaining === 1 ? 'item' : 'items'} remaining</span>;
}

export default TodoItemsRemaining;
