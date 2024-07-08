'use client'
import Image from "next/image";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiFillSun } from "react-icons/ai";
import { RiMoonFill } from "react-icons/ri";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete online JavaScript course", completed: false },
    { id: 2, text: "Jog around the park 3x", completed: false },
    { id: 3, text: "10 minutes meditation", completed: false },
    { id: 4, text: "Read for 1 hour", completed: false },
    { id: 5, text: "Pick up groceries", completed: false },
  ]);

  const [newTaskText, setNewTaskText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const addTask = () => {
    if (newTaskText.trim() === "") return;
    const newTask = {
      id: tasks.length + 1,
      text: newTaskText.trim(),
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start p-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} relative`}>
      {/* Background Image */}
      <div className="relative w-full h-[50vh]">
        <Image
          src={isDarkMode ? "/bg-desktop-dark.jpg" : "/bg-desktop-light.jpg"}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          layout="fill"
          objectFit="cover"
        />
        <div className="relative flex flex-col items-center justify-center h-full w-full">
          <div className="flex justify-between items-center w-[500px]">
            <h1 className="text-white text-4xl font-bold">TODO</h1>
            <button className="text-white text-4xl" onClick={toggleDarkMode}>
              {isDarkMode ? <RiMoonFill /> : <AiFillSun />}
            </button>
          </div>
          <div className="flex mt-4 w-[500px]">
            <input
              type="text"
              className="w-[400px] h-16 bg-white rounded-l-lg shadow-lg placeholder-gray-500 pl-4 outline-none"
              placeholder="Add a new task"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="w-[100px] h-16 bg-blue-500 text-white rounded-r-lg shadow-lg"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="w-full flex justify-center mt-[-75px] relative z-10">
        <div className={`bg-white ${isDarkMode ? 'bg-gray-900 text-white' : ''} w-[500px] shadow-lg rounded-lg p-4`}>
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between border-b py-4 ${isDarkMode ? 'border-gray-700' : ''}`}
              >
                <input
                  type="checkbox"
                  id={`checkbox${task.id}`}
                  className="custom-checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <label
                  htmlFor={`checkbox${task.id}`}
                  className={`ml-2 ${task.completed ? "line-through text-gray-400" : ""}`}
                >
                  {task.text}
                </label>
                <button
                  className="text-red-500"
                  onClick={() => removeTask(task.id)}
                >
                  <RxCross2 />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <span>{tasks.filter((task) => !task.completed).length} items left</span>
            <div>
              <button className="mx-2 text-blue-500">All</button>
              <button className="mx-2 text-blue-500">Active</button>
              <button className="mx-2 text-blue-500">Completed</button>
            </div>
            <button
              className="text-blue-500"
              onClick={() => setTasks(tasks.filter((task) => !task.completed))}
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
