import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { RenderResult } from '@testing-library/react-hooks/src/types';

import { useTimer } from './use-timer';

beforeAll(() => {
    jest.useFakeTimers('modern');
  },
);

const testHookCountsStartingWithCurrentSeconds = (result: RenderResult<number>, startSeconds: number, times: number) => {
  let currentSeconds = startSeconds;

  while (currentSeconds < startSeconds + times) {
    act(() => {
      jest.advanceTimersByTime(1001);
    });
    expect(result.current).toEqual(++currentSeconds);
  }
};

test('starts with initialized number of seconds', () => {
  const { result } = renderHook(() => useTimer(1));

  expect(result.current).toBe(1);
});

test('starts with the initialized number of seconds and counts every second', () => {
  const { result } = renderHook(() => useTimer(5));

  testHookCountsStartingWithCurrentSeconds(result, 5, 10);
});

test('resets the timer when changing the start seconds', () => {
  const { result, rerender } = renderHook((initialSeconds) => useTimer(initialSeconds), {initialProps: 5});


  expect(result.current).toBe(5);

  testHookCountsStartingWithCurrentSeconds(result, 5, 5);

  rerender(2);

  expect(result.current).toBe(2);

  testHookCountsStartingWithCurrentSeconds(result, 2, 10);
});