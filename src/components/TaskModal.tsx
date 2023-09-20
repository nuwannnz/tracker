import { Box, Button, Checkbox, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Task } from "../types/Task.types";
import { Close } from "@mui/icons-material";
import TaskTimer from "./TaskTimer";
import { TimeLog } from "../types/Time.types";
import { formatSecondsToTime } from "../helpers/time.helpers";

import "./TaskModal.css";
import { useTasks } from "../hooks/useTasks";

interface Props {
  isOpen: boolean;
  selectedTask: Task;
  onClose: () => void;
}
const TaskModal: React.FC<Props> = ({ isOpen, selectedTask, onClose }) => {
  const { updateTask } = useTasks();

  const [task, setTask] = useState(selectedTask);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);

  useEffect(() => {
    setTotalSeconds(
      task.timeLogs.reduce((seconds, prevLog, i) => {
        return (seconds += prevLog.seconds);
      }, 0)
    );
  }, [task.timeLogs]);

  useEffect(() => {
    setTask(selectedTask);
  }, [selectedTask]);

  const onLogTimeHandler = async (seconds: number) => {
    const timeLog: TimeLog = {
      seconds,
      date: Date.now(),
    };
    task.timeLogs = [timeLog, ...task.timeLogs];
    task.onGoingTimerSeconds = 0;
    await updateTask(task);
  };

  const onSaveOngoingTime = async (seconds: number) => {
    task.onGoingTimerSeconds = seconds;
    await updateTask(task);
  };

  const onTitleBlurHandler = async () => {
    await updateTask(task);
  };

  const onIsCompletedChangeHandler = async () => {
    const updatedTask = {
      ...task,
      isCompleted: !task.isCompleted,
    };
    setTask(updatedTask);
    await updateTask(updatedTask);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="task-modal">
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Stack direction="row" width="100%">
            <Checkbox
              checked={task.isCompleted}
              onChange={onIsCompletedChangeHandler}
            />
            <input
              value={task.title}
              className="task-modal-title-input"
              onChange={(e) =>
                setTask({
                  ...task,
                  title: e.target.value,
                })
              }
              onBlur={(e) => onTitleBlurHandler()}
            />
          </Stack>

          <Button variant="text" onClick={onClose}>
            <Close />
          </Button>
        </Stack>

        <Stack width="100%" alignItems="center" mb={3}>
          <Typography variant="caption">Total time</Typography>
          <Typography variant="h3">
            {formatSecondsToTime(totalSeconds)}
          </Typography>
        </Stack>

        <TaskTimer
          initialSeconds={task.onGoingTimerSeconds}
          onLogTime={onLogTimeHandler}
          onSaveOngoingTime={onSaveOngoingTime}
        />

        <Box maxHeight="70vh" overflow="auto">
          <Stack mt={2} spacing={1}>
            {task.timeLogs.map((timeLog, i) => (
              <Stack
                key={i}
                className="timer-record"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2">
                  {new Date(timeLog.date).toDateString()}
                </Typography>
                <Typography variant="body1">
                  {formatSecondsToTime(timeLog.seconds)}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
