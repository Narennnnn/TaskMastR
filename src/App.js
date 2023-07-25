import './App.css';
import React, { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { TbClick } from 'react-icons/tb';

function App() {
  const [todolist, setNewTask] = useState([]);
  const [mimicTask, setTask] = useState('');

  const addNewTaskToList = () => {
    if (mimicTask.trim() !== '') {
      const task = {
        id: todolist.length === 0 ? 1 : todolist[todolist.length - 1].id + 1,
        name: mimicTask,
        completed: false, // Step 1: Add completed status to the task
      };
      const newList = [...todolist, task];
      setNewTask(newList);
      setTask('');
    }
  };

  const updateTask = (taskId) => {
    // Step 2: Toggle the completed status of the task
    const updatedList = todolist.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setNewTask(updatedList);
  };

  const SetnewTask = (event) => {
    setTask(event.target.value);
  };

  const deletask = (id) => {
    const newTodoList = todolist.filter((t) => {
      return t.id !== id;
    });
    setNewTask(newTodoList);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      addNewTaskToList();
    }
  };

  return (
    <div className="App">
      <div className="addTask">
        <input
          type="text"
          value={mimicTask}
          onChange={SetnewTask}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addNewTaskToList}>Add Task</button>
      </div>
      <div className="taskList">
        {todolist.map((task) => {
          return (
            <div key={task.id} className={`taskItem ${task.completed ? 'completedTask' : ''}`}>
              <p className="task">{task.name}</p>
              <button className="markDone" onClick={() => updateTask(task.id)}><TbClick /></button>
              <button className="cancelButton" onClick={() => deletask(task.id)}>
                <MdCancel />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
