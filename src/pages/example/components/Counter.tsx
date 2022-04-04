/* eslint-disable no-console */
import { VFC, useEffect, useState } from "react";

import { Row } from "../../../components/Row";

export const Counter: VFC<{
  initialValue?: number;
  increment?: number;
}> = ({
  initialValue = 0,
  increment = 1,
}) => {
  const [value, setValue] = useState(initialValue);
  // called on every rerender
  useEffect(() => {
    console.log(`I am called on every rerender: initial value ${initialValue} and increment ${increment}`);
  });

  // called only once, on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => console.log(`I am called only once, on mount: Started with initial value ${initialValue} and increment ${increment}`), []);


  // called whenever either initialValue or increment changed
  useEffect(() => {
    console.log(`I am called whenever the called whenever either initialValue or increment changed. Props changed: initial value ${initialValue} and increment ${increment}`);
    // return () => console.log(`Just doing some cleanup... Cancelling requests, clearing storages. Current values initial value ${initialValue} and increment ${increment}`);
  }, [initialValue, increment]);

  // // called whenever value changed
  // useEffect(() => console.log(`Value changed! Current value ${value} `), [value]);

  return <>
    <Row>Initial value : {initialValue}</Row>
    <Row>Current counter: {increment}</Row>
    <Row>Current value : {value}</Row>
    <Row>
      <button onClick={() => setValue((value) => value + increment)}>Increase value</button>
    </Row>
  </>;
};