import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { tasksDB } from "../config/firebase";
import { useContext, useEffect, useState } from "react";
import { Task } from "../types/Task.types";
import { TaskContext } from "../contexts/TaskContext";

export function useTasks() {
  const { tasks, setTasks } = useContext(TaskContext);
  const [isInserting, setIsInserting] = useState<boolean>(false);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const querySnapshot = await getDocs(collection(tasksDB, "tasks"));
    const tasks: Task[] = querySnapshot.docs
      .sort(
        (docA, docB) =>
          parseInt(docB.get("timestamp")) - parseInt(docA.get("timestamp"))
      )
      .map((doc) => ({
        id: doc.id,
        title: doc.get("title"),
        isCompleted: doc.get("isCompleted"),
        timestamp: doc.get("timestamp"),
        onGoingTimerSeconds: doc.get("onGoingTimerSeconds"),
        timeLogs: doc.get("timeLogs") ?? [],
      }));
    setTasks(tasks);
  };

  const createTask = async (task: Task) => {
    setIsInserting(true);
    const taskRef = await addDoc(collection(tasksDB, "tasks"), { ...task });
    const createdTaskSnapshot = await getDoc(taskRef);
    const createdTask: Task = {
      id: createdTaskSnapshot.id,
      title: createdTaskSnapshot.get("title"),
      isCompleted: createdTaskSnapshot.get("isCompleted"),
      timestamp: createdTaskSnapshot.get("timestamp"),
      onGoingTimerSeconds: createdTaskSnapshot.get("onGoingTimerSeconds"),
      timeLogs: createdTaskSnapshot.get("timeLogs"),
    };
    console.log("task => ", createdTask);
    setTasks([createdTask, ...tasks]);
    setIsInserting(false);
  };

  const updateTask = async (taskDoc: Task) => {
    const taskId = taskDoc.id as string;
    delete taskDoc.id;
    await updateDoc(doc(tasksDB, "tasks", taskId), {
      ...taskDoc,
    });
    taskDoc.id = taskId;
    setTasks(tasks.map((task) => (task.id === taskDoc.id ? taskDoc : task)));
  };

  const deleteTask = async (taskId: string) => {
    await deleteDoc(doc(tasksDB, "tasks", taskId));
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return { tasks, isInserting, createTask, updateTask, deleteTask };
}
