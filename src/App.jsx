import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, done: false }]);
    }
    setTask("");
  };

  const handleDelete = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  return (
    <div className="container">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title text-primary">
            📝 Ma TodoList
          </h3>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ajouter une tâche..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleAddTask}>
              {editIndex !== null ? "Modifier" : "Ajouter"}
            </button>
          </div>

          <ul className="list-group">
            {tasks.map((item, index) => (
              <li
                key={index}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  item.done ? "done" : ""
                }`}
              >
                <span
                  className="task-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleDone(index)}
                >
                  {item.text}
                </span>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(index)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
