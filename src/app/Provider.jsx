'use client';
import React, { createContext, useState, useEffect } from 'react';

const SideBarContext = createContext();

const SidebarProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark));
    }, []);

    const [tasks, setTasks] = useState(() => {
        if (typeof window !== "undefined") {
          const savedTasks = localStorage.getItem("tasks");
          return savedTasks ? JSON.parse(savedTasks) : [
            { id: 1, text: "Complete online JavaScript course", completed: false },
            { id: 2, text: "Jog around the park 3x", completed: false },
            { id: 3, text: "10 minutes meditation", completed: false },
            { id: 4, text: "Read for 1 hour", completed: false },
            { id: 5, text: "Pick up groceries", completed: false },
          ];
        }
        return [];
      });

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
          id: Date.now(), // Use timestamp as id to ensure uniqueness
          text: newTaskText.trim(),
          completed: false,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTaskText("");
      };

  return (
    <SideBarContext.Provider value={{ val, setVal, cartItems, setCartItems }}>
      {children}
    </SideBarContext.Provider>
  );
};

export { SideBarContext, SidebarProvider };
