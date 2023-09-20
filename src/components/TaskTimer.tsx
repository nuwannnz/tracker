import { Pause, PlayArrow, Stop } from "@mui/icons-material";
import { Stack, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getTimeFragmentsFromSeconds } from "../helpers/time.helpers";

interface Props {
  initialSeconds: number;
  onLogTime: (seconds: number) => void;
  onSaveOngoingTime: (seconds: number) => void;
}
const TaskTimer: React.FC<Props> = ({
  initialSeconds,
  onLogTime,
  onSaveOngoingTime,
}) => {
  const intervalIdRef = useRef<number>();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    totalSeconds: 0,
  });

  useEffect(() => {
    if (initialSeconds) {
      const timeFragments = getTimeFragmentsFromSeconds(initialSeconds);
      setTime({
        ...timeFragments,
        totalSeconds: initialSeconds,
      });
    }
  }, []);

  const onStartClickHandler = () => {
    setIsStarted(true);
    intervalIdRef.current = setInterval(onTick, 1000) as unknown as number;
  };

  const onStopClickHandler = () => {
    clearInterval(intervalIdRef.current);
    onLogTime(time.totalSeconds);
    setTime({
      seconds: 0,
      minutes: 0,
      hours: 0,
      totalSeconds: 0,
    });
    setIsStarted(false);
  };

  const onPauseClickHandler = () => {
    if (isPaused) {
      onStartClickHandler();
    } else {
      clearInterval(intervalIdRef.current);
    }
    setIsPaused(!isPaused);
  };

  const onTick = () => {
    setTime(({ hours, minutes, seconds, totalSeconds }) => {
      seconds += 1;
      totalSeconds += 1;
      if (seconds > 59) {
        seconds = 0;
        minutes += 1;
      }
      if (minutes > 59) {
        minutes = 0;
        hours += 1;
      }
      if (seconds === 59) {
        onSaveOngoingTime(totalSeconds);
      }
      return {
        seconds,
        minutes,
        hours,
        totalSeconds,
      };
    });
  };

  return (
    <Stack direction="row" width="100%">
      {/* {!isStarted && (
        <Button
          variant="outlined"
          onClick={onStartClickHandler}
          sx={{ justifySelf: "center" }}
        >
          <Typography variant="button">Start timer</Typography>
          <PlayArrow />
        </Button>
      )} */}

      <Stack width="100%" alignItems="center">
        <Typography variant="h5" mb={3}>
          {`${`${time.hours}`.padStart(2, "0")}:${`${time.minutes}`.padStart(
            2,
            "0"
          )}:${`${time.seconds}`.padStart(2, "0")}`}
        </Typography>

        <Stack direction="row" spacing={2}>
          {!isStarted && (
            <Button
              variant="outlined"
              onClick={onStartClickHandler}
              sx={{ justifySelf: "center" }}
            >
              <Typography variant="button">Start timer</Typography>
              <PlayArrow />
            </Button>
          )}
          {isStarted && (
            <>
              <Button
                variant="outlined"
                sx={{ width: 120 }}
                onClick={onStopClickHandler}
              >
                <Typography variant="button">Stop</Typography>
                <Stop />
              </Button>
              <Button
                color="warning"
                variant="outlined"
                sx={{ width: 120 }}
                onClick={onPauseClickHandler}
              >
                <Stack direction="row">
                  {isPaused ? (
                    <>
                      <Typography variant="button">Resume</Typography>
                      <PlayArrow />
                    </>
                  ) : (
                    <>
                      <Typography variant="button">Pause</Typography>
                      <Pause />
                    </>
                  )}
                </Stack>
              </Button>{" "}
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TaskTimer;
