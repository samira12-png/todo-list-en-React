import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export default function TodoReactBootstrap() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Apprendre React", completed: false },
    { id: 2, text: "Faire une démo", completed: false },
  ]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const resetForm = () => {
    setText("");
    setEditId(null);
  };

  const addTask = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask = { id: Date.now(), text: trimmed, completed: false };
    setTasks((t) => [newTask, ...t]);
    resetForm();
  };

  const startEdit = (task) => {
    setText(task.text);
    setEditId(task.id);
  };

  const updateTask = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks((t) => t.map((tk) => (tk.id === editId ? { ...tk, text: trimmed } : tk)));
    resetForm();
  };

  const deleteTask = (id) => {
    setTasks((t) => t.filter((tk) => tk.id !== id));
    if (editId === id) resetForm();
  };

  const toggleComplete = (id) => {
    setTasks((t) => t.map((tk) => (tk.id === id ? { ...tk, completed: !tk.completed } : tk)));
  };

  return (
    <div className="container py-4" style={{ minHeight: "100vh" }}>
      <style>{`
        .baby-pink {
          background: linear-gradient(135deg, #ffeef8 0%, #ffd9ec 100%);
        }
        .card-pink {
          background: rgba(255, 240, 249, 0.9);
          border: 1px solid rgba(255, 182, 193, 0.6);
        }
        .task-completed {
          background-color: #e74c3c !important; /* rouge */
          color: white !important;
          text-decoration: line-through;
        }
        .task-normal:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm card-pink">
            <div className="card-body baby-pink p-4">
              <h3 className="card-title text-center" style={{ color: "#d63384" }}>
                Todo List 
              </h3>

              <div className="d-flex gap-2 my-3">
                <input
                  className="form-control"
                  placeholder="Ajouter une tâche..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") (editId ? updateTask() : addTask());
                  }}
                />

                {editId ? (
                  <button className="btn btn-warning" onClick={updateTask}>
                    Update
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={addTask}>
                    Add
                  </button>
                )}
              </div>

              <ul className="list-group">
                {tasks.length === 0 && (
                  <li className="list-group-item text-center text-muted">Aucune tâche.</li>
                )}

                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`list-group-item d-flex justify-content-between align-items-center mb-2 task-normal ${
                      task.completed ? "task-completed" : ""
                    }`}
                    style={{ cursor: "pointer", borderRadius: 8 }}
                    onClick={() => toggleComplete(task.id)}
                  >
                    <div style={{ flex: 1 }}>
                      <span>{task.text}</span>
                    </div>

                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(task);
                        }}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(task.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
