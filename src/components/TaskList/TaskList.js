import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn
} from "mdb-react-ui-kit";
import TaskRow from "../TaskRow/TaskRow";
import TaskForm from "../TaskForm/TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [newMember, setNewMember] = useState("");
  const [newSeverity, setNewSeverity] = useState("green");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("https://todol.azurewebsites.net/blog/getAll")
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error fetching tasks:", error));
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsCreating(false);
    setIsEditing(false);
    setNewTask("");
    setNewMember("");
    setNewSeverity("green");
  };

  const handleSaveClick = () => {
    const taskData = {
      name: newMember,
      entry: newTask,
      severity: newSeverity,
      done: false
    };

    fetch("https://todol.azurewebsites.net/blog/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskData)
    })
    .then(response => {
      if (response.ok) {
        return 1
      }
      throw new Error("Network response was not ok.");
    })
    .then(data => {
      setTasks([...tasks, data]); // Add the new task to the list
      handleCancelClick(); // Clear the form after saving
      fetchTasks();
    })
    .catch(error => console.error("Error saving task:", error));
  };

  const handleDeleteClick = (taskId) => {
    fetch(`https://todol.azurewebsites.net/blog/delete/${taskId}`, {
      method: "POST"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        // Filter out the deleted task from the tasks array
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch(error => console.error("Error deleting task:", error));
  };

  const handleEditClick = (task) => {
    setIsEditing(true);
    setIsCreating(true);
    setCurrentTaskId(task.id);
    setNewTask(task.entry);
    setNewMember(task.name);
    setNewSeverity(task.severity);
  };

  const handleToggleDone = (taskId, doneStatus) => {
    fetch(`https://todol.azurewebsites.net/blog/done/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ done: doneStatus })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      // Update the task status locally
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, done: doneStatus } : task
      );
      setTasks(updatedTasks);
    })
    .catch(error => console.error("Error updating task status:", error));
  };

  return (
    <section className="gradient-custom-2 vh-100">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol md="12" xl="10">
            <MDBCard>
              <MDBCardHeader className="p-3">
                <h5 className="mb-0">To do list</h5>
              </MDBCardHeader>
              <div className="scrollbar" style={{ position: "relative", height: "400px", overflowY: "auto" }}>
                <MDBTable className="mb-0">
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Team Member</th>
                      <th scope="col">Task</th>
                      <th scope="col">Severity</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {tasks.map((task) => (
                      <TaskRow
                        key={task.id} // Ensure each TaskRow has a unique key
                        task={task}
                        onDeleteClick={() => handleDeleteClick(task.id)}
                        onToggleDone={handleToggleDone} // Pass the function to TaskRow
                      />
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
              {isCreating && (
                <TaskForm
                  newTask={newTask}
                  newMember={newMember}
                  newSeverity={newSeverity}
                  setNewTask={setNewTask}
                  setNewMember={setNewMember}
                  setNewSeverity={setNewSeverity}
                  handleSaveClick={handleSaveClick}
                  handleCancelClick={handleCancelClick}
                />
              )}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {!isCreating && (
        <MDBBtn
          floating
          className="position-absolute bottom-0 end-0 m-4"
          color="primary"
          style={{width:'100px'}}
          onClick={handleCreateClick}
        >
          Add Task
        </MDBBtn>
      )}
    </section>
  );
}
