import { Add } from "@mui/icons-material";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/Task.types";

const TaskForm = () => {
  const { isInserting, createTask } = useTasks();

  const [taskTitle, setTaskTitle] = useState<string>("");

  const onAddClickHandler = async () => {
    const newTask: Task = {
      title: taskTitle,
      isCompleted: false,
      timestamp: Math.abs(Date.now() / 1000),
      onGoingTimerSeconds: 0,
      timeLogs: [],
    };
    await createTask(newTask);
    setTaskTitle("");
  };

  return (
    <Box>
      <Stack direction="row">
        <TextField
          name="taskTitle"
          sx={{ flex: 1 }}
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          disabled={!taskTitle || isInserting}
          onClick={onAddClickHandler}
        >
          {isInserting ? <CircularProgress /> : <Add />}
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm;
