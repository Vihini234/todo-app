import { useState } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className={`app-shell ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="toolbar">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mode-toggle"
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>

      <h1 className="title">Smart Todo List</h1>

      <div className="input-row">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="task-input"
        />

        <button onClick={addTask} className="add-btn">
          Add
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className="task-item">
            <span className="task-text">{t}</span>
            <button onClick={() => deleteTask(index)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}