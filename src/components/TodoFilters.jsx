import React, { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoFilters() {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <div>
      <button
        onClick={() => {
          setFilter("all");
        }}
        className={`button filter-button ${
          filter === "all" ? "filter-button-active" : ""
        }`}
      >
        All
      </button>
      <button
        onClick={() => {
          setFilter("active");
        }}
        className={`button filter-button ${
          filter === "active" ? "filter-button-active" : ""
        }`}
      >
        Active
      </button>
      <button
        onClick={() => {
          setFilter("completed");
        }}
        className={`button filter-button ${
          filter === "completed" ? "filter-button-active" : ""
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;
