import { useState } from 'react';

export const useCounter = (incrementStep: number) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + incrementStep);

  return { count, increment };
};