import React, { createContext, useState } from "react";
import { Task } from "../types/Task.types";

interface TaskContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}
export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {},
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
