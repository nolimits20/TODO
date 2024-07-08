'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [isDarkMode, setIsDarkMode] = useState(() =>{
    if(typeof window !== "undefined"){
      const saved = localStorage.getItem("darkMode")
      return saved === "true"
    }
    return false
  })

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

  useEffect(()=>{
    localStorage.setItem("darkMode", isDarkMode)
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start p-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} relative`}>
      {/* Background Image */}
      <div className="relative w-full h-[35vh]">
        <Image
          src={isDarkMode ? "/bg-desktop-dark.jpg" : "/bg-desktop-light.jpg"}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Input and Toggle */}
      <div className="relative flex flex-col items-center justify-center w-full px-4 sm:px-0 -mt-[25vh]">
        <div className="flex justify-between items-center w-full sm:w-[500px]">
          <h1 className="text-white text-4xl font-bold tracking-widest">TODO</h1>
          <button className="text-white text-4xl" onClick={toggleDarkMode}>
            {isDarkMode ? <RiMoonFill /> : <AiFillSun />}
          </button>
        </div>
        <div className="flex mt-4 w-full sm:w-[500px]">
          <input
            type="text"
            className="w-full sm:w-[400px] h-12 bg-white rounded-l-lg shadow-lg placeholder-gray-500 pl-4 outline-none"
            placeholder="Create a new todo..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="w-32 sm:w-[100px] h-12 bg-blue-700 text-white rounded-r-lg shadow-lg"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="w-full flex justify-center mt-4 sm:mt-[20px] relative z-10 px-4 sm:px-0">
        <div className={`bg-white ${isDarkMode ? 'bg-gray-900 text-white' : ''} w-full sm:w-[500px] shadow-lg rounded-lg p-4`}>
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between border-b py-3 ${isDarkMode ? 'border-gray-700' : ''}`}
              >
                <input
                  type="checkbox"
                  id={`checkbox${task.id}`}
                  className="custom-checkbox rounded-full"
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
                  className="text-red-500 font-bold text-lg"
                  onClick={() => removeTask(task.id)}
                >
                  <RxCross2 />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-row sm:flex-row justify-between items-center mt-4 text-sm">
            <span>{tasks.filter((task) => !task.completed).length} items left</span>
            <button
              className="text-blue-500 mt-2 sm:mt-0"
              onClick={() => setTasks(tasks.filter((task) => !task.completed))}
            >
              Clear Completed
            </button>
          </div>
          <div className="flex justify-center mt-4 sm:mt-0 bg-white sm:bg-transparent ${isDarkMode ? 'bg-gray-900 text-white' : ''} rounded-lg p-2 sm:p-0">
            <button className="mx-2 text-blue-500">All</button>
            <button className="mx-2 text-blue-500">Active</button>
            <button className="mx-2 text-blue-500">Completed</button>
          </div>
        </div>
      </div>
    </main>
  );
}
