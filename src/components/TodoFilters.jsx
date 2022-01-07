import React from "react";
import PropTypes from "prop-types";

TodoFilters.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

function TodoFilters(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.setFilter("all");
        }}
        className={`button filter-button ${
          props.filter === "all" ? "filter-button-active" : ""
        }`}
      >
        All
      </button>
      <button
        onClick={() => {
          props.setFilter("active");
        }}
        className={`button filter-button ${
          props.filter === "active" ? "filter-button-active" : ""
        }`}
      >
        Active
      </button>
      <button
        onClick={() => {
          props.setFilter("completed");
        }}
        className={`button filter-button ${
          props.filter === "completed" ? "filter-button-active" : ""
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;
