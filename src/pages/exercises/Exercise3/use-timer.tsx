import { useEffect, useState } from 'react';

export const useTimer = (startSeconds: number) => {
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => {
    setSeconds(startSeconds);
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [startSeconds]);

  return seconds;
};