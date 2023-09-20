import { Box, Button, Card, Checkbox, Stack, Typography } from "@mui/material";
import React from "react";
import { Task } from "../types/Task.types";
import { Delete } from "@mui/icons-material";
import { useTasks } from "../hooks/useTasks";
import { formatSecondsToTime } from "../helpers/time.helpers";

interface Props {
  task: Task;
  onSelect: (task: Task) => void;
}

const TaskItem: React.FC<Props> = ({ task, onSelect }) => {
  const { deleteTask, updateTask } = useTasks();
  return (
    <Box
      sx={{
        border: "1px solid #aaa",
        borderRadius: 2,
        cursor: "pointer",
      }}
      onClick={() => onSelect(task)}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center">
          <Checkbox
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              updateTask({ ...task, isCompleted: !task.isCompleted });
            }}
            checked={task.isCompleted}
            onChange={() =>
              updateTask({ ...task, isCompleted: !task.isCompleted })
            }
          />
          <Typography>{task.title}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Typography>
            {formatSecondsToTime(
              task.timeLogs.reduce(
                (seconds, prevLog) => seconds + prevLog.seconds,
                0
              )
            )}
          </Typography>
          <Button
            color="info"
            sx={{ justifySelf: "flex-end" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              deleteTask(task.id as string);
            }}
          >
            <Delete />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TaskItem;
