'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });
  const [filter, setFilter] = useState('all'); // New state to manage the current filter

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

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

  // Filter tasks based on the current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-0 ${
        isDarkMode ? "bg-[hsl(235,21%,11%)]" : "bg-gray-100"
      } relative`}
    >
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
          <button className="text-white text-2xl" onClick={toggleDarkMode}>
            {isDarkMode ? <AiFillSun /> : <RiMoonFill />}
          </button>
        </div>
        <div className="flex mt-4 w-full sm:w-[500px]">
          <input
            type="text"
            className={`w-full sm:w-[400px] h-12 bg-white ${
              isDarkMode
                ? "bg-[hsl(235,24%,19%)] text-[hsl(234,11%,52%)]"
                : "text-[hsl(234,11%,52%)]"
            } rounded-l-lg shadow-lg placeholder-[hsl(234,11%,52%) font-bold] pl-4 outline-none`}
            placeholder="Create a new todo... "
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
        <div
          className={`bg-white  ${
            isDarkMode
              ? "bg-[hsl(235,24%,19%)] text-[hsl(234,11%,52%)]"
              : "text-[hsl(234,11%,52%)]"
          } w-full sm:w-[500px] shadow-lg rounded-lg p-3 font-bold`}
        >
          <ul>
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between border-b-[1.5px] w-full py-3 ${
                  isDarkMode ? "border-gray-700" : ""
                }`}
              >
                <input
                  type="checkbox"
                  id={`checkbox${task.id}`}
                  className="custom-checkbox rounded-full hover:cursor-pointer"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <label
                  htmlFor={`checkbox${task.id}`}
                  className={`ml-2 hover:cursor-pointer ${
                    task.completed
                      ? "line-through text-[hsl(236,9%,61%)]"
                      : ""
                  }`}
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
          <div
            className={`flex flex-row sm:flex-row justify-between items-center mt-4 text-sm ${
              isDarkMode
                ? "text-[hsl(234,14%,35%)]"
                : "text-[hsl(236,9%,61%)]"
            } `}
          >
            <span>
              {tasks.filter((task) => !task.completed).length} items left
            </span>
            <button
              className={`mt-2 sm:mt-0 text-blue-500 ${
                isDarkMode
                  ? "text-[hsl(233,14%,35%)]"
                  : "text-[hsl(236,9%,61%)]"
              } ${isDarkMode ? "hover:text-[hsl(220,98%,61%)]" : ""}`}
              onClick={() =>
                setTasks(tasks.filter((task) => !task.completed))
              }
            >
              Clear Completed
            </button>
          </div>
          <div
            className={`flex justify-center mt-4 sm:mt-0 bg-white sm:bg-transparent ${
              isDarkMode ? "bg-gray-900 text-white" : ""
            } rounded-lg p-2 sm:p-0`}
          >
            <button
              className={`mx-2 hover:text-[hsl(220,98%,61%)] ${
                isDarkMode
                  ? "text-[hsl(233,14%,35%)]"
                  : "text-[hsl(236,9%,61%)]"
              } ${isDarkMode ? "hover:text-[hsl(220,98%,61%)]" : ""}`}
              onClick={() => setFilter('all')} // Set filter to all
            >
              All
            </button>
            <button
              className={`mx-2 hover:text-[hsl(220,98%,61%)] ${
                isDarkMode
                  ? "text-[hsl(233,14%,35%)]"
                  : "text-[hsl(236,9%,61%)]"
              } ${isDarkMode ? "hover:text-[hsl(220,98%,61%)]" : ""}`}
              onClick={() => setFilter('active')} // Set filter to active
            >
              Active
            </button>
            <button
              className={`mx-2 hover:text-[hsl(220,98%,61%)] ${
                isDarkMode
                  ? "text-[hsl(233,14%,35%)]"
                  : "text-[hsl(236,9%,61%)]"
              } ${isDarkMode ? "hover:text-[hsl(220,98%,61%)]" : ""}`}
              onClick={() => setFilter('completed')} // Set filter to completed
            >
              Completed
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full mt-4 sm:mt-4 relative z-10 px-4 sm:px-0">
        <p className="text-sm text-gray-500 text-center">
          Drag and drop reorder list
        </p>
      </div>
    </main>
  );
}
