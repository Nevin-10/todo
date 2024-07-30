// src/components/TaskActions/TaskActions.js
import React from "react";

export default function TaskActions({ onEditClick, onDeleteClick }) {
  return (
    <>
      <button 
        type="button" 
        className="btn btn-primary me-2" 
        onClick={onEditClick}
      >
        Edit
      </button>
      <button 
        type="button" 
        className="btn btn-danger" 
        onClick={onDeleteClick}
      >
        Delete
      </button>
    </>
  );
}
