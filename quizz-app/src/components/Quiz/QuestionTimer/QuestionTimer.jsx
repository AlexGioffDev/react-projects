import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remaingTime, setRemaingTime] = useState(timeout);

  useEffect(() => {
    const timeOut = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timeOut);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaingTime((prev) => prev - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remaingTime}
      className={mode}
    />
  );
}
