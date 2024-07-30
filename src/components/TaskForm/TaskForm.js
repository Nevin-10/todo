// src/components/TaskForm/TaskForm.js
import React from "react";
import { MDBBtn, MDBInput, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdb-react-ui-kit";

export default function TaskForm({
  newTask,
  newMember,
  newSeverity,
  setNewTask,
  setNewMember,
  setNewSeverity,
  handleSaveClick,
  handleCancelClick
}) {
  return (
    <div className="p-3">
      <MDBInput
        label="Team Member"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        className="mb-3"
      />
      <MDBInput
        label="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="mb-3"
      />
      <MDBDropdown>
        <MDBDropdownToggle color="secondary" className="w-100 mb-3">
          {newSeverity.charAt(0).toUpperCase() + newSeverity.slice(1)} Severity
        </MDBDropdownToggle>
        <MDBDropdownMenu className="w-100">
          <MDBDropdownItem link onClick={() => setNewSeverity("red")}>High</MDBDropdownItem>
          <MDBDropdownItem link onClick={() => setNewSeverity("yellow")}>Medium</MDBDropdownItem>
          <MDBDropdownItem link onClick={() => setNewSeverity("green")}>Low</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
      <div className="d-flex justify-content-between">
        <MDBBtn color="success" onClick={handleSaveClick}>
          Save
        </MDBBtn>
        <MDBBtn color="danger" onClick={handleCancelClick}>
          Cancel
        </MDBBtn>
      </div>
    </div>
  );
}
