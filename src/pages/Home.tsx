import React, { useEffect, useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../hooks/useTasks";
import TaskItem from "../components/TaskItem";
import TaskModal from "../components/TaskModal";
import { Task } from "../types/Task.types";

const Home = () => {
  const { tasks } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <>
      <Container>
        <Stack direction="column">
          <Typography variant="h1">Tasks</Typography>

          <TaskForm />

          <Stack spacing={2} sx={{ mt: 2 }}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onSelect={(t) => setSelectedTask(t)}
              />
            ))}
          </Stack>
        </Stack>
      </Container>

      {selectedTask && (
        <TaskModal
          isOpen
          onClose={() => setSelectedTask(null)}
          selectedTask={selectedTask}
        />
      )}
    </>
  );
};

export default Home;
