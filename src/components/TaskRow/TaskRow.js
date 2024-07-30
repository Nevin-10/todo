import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import './TaskRow.css'; // Import the CSS file

const TaskRow = ({ task, onEditClick, onDeleteClick, onToggleDone }) => {
  // Determine the class based on task severity
  const severityClass = {
    red: 'task-row-red',
    green: 'task-row-green',
    yellow: 'task-row-yellow',
    // Add other severities as needed
  }[task.severity] || ''; // Default to empty string if severity is unknown

  // Determine if the task is done
  const isDone = task.done;

  return (
    <tr className={`${severityClass} ${isDone ? 'task-row-done' : ''}`}>
      <td>{task.name}</td>
      <td>{task.entry}</td>
      <td>{task.severity}</td>
      <td className="task-actions">
       
        <MDBBtn color="danger" onClick={() => onDeleteClick(task.id)} className="task-delete-button">
          Delete
        </MDBBtn>
      </td>

      <td className='task-done'>
      {!isDone && (
          <input 
            type="checkbox" 
            checked={isDone}
            onChange={() => onToggleDone(task.id, !isDone)}
            className="task-checkbox"
          />
        )}
      </td>
    </tr>
  );
};

export default TaskRow;
