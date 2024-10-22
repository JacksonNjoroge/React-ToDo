import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [doneTasks, setDoneTasks] = useState(() => {
    const savedDoneTasks = localStorage.getItem("doneTasks");
    return savedDoneTasks ? JSON.parse(savedDoneTasks) : [];
  });
  
  const [newTask, setNewTask] = useState('');

  // Update localStorage whenever tasks or doneTasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
  }, [doneTasks]);

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function handleAddTask() {
    if (newTask.trim() !== "") {
      setTasks(t => [...t, newTask]);
      setNewTask("");
    }
  }

  function handleDeleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleMarkAsDone(index) {
    const taskToMark = tasks[index];
    setDoneTasks(done => [...done, taskToMark]);
    handleDeleteTask(index);
  }

  function handleDeleteDoneTask(index) {
    const updatedDoneTasks = doneTasks.filter((_, i) => i !== index);
    setDoneTasks(updatedDoneTasks);
  }

  return (
    <>
      <div className="main">
        <div className="wrapper">
          <h1 className="header">Daily ToDo</h1>
          <div className="form-wrap">
            <input
              type="text"
              className="addText"
              value={newTask}
              onChange={handleInputChange}
              placeholder="New Activity..."
            />
            <button className="addBTN" onClick={handleAddTask}>
              Add Task
            </button>
          </div>

          <div className="todo-content">
            <div className="doing">
              <h1 className="heading">To Do</h1>
              <ul className="todo-items" id="todo-items">
                {tasks.map((task, index) => (
                  <li key={index} className="todoList">
                    <button className="doneBTN" onClick={() => handleMarkAsDone(index)}>
                      ✅ 
                    </button>
                    <span className="task">{task}</span>
                    <button className="deleteBTN" onClick={() => handleDeleteTask(index)}>
                      🗑️ 
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="done">
              <h1 className="heading">Done</h1>
              <ul className="todo-items" id="done-items">
                {doneTasks.map((task, index) => (
                  <li key={index} className="todoList">
                    <span className="task">{task}</span>
                    <button className="deleteBTN" onClick={() => handleDeleteDoneTask(index)}>
                      🗑️ 
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
