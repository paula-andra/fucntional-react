import { FC} from "react";

import { Row } from "../../../components/Row";

import { useTimer } from './use-timer';

export const TimerWithHook: FC<{
  startSeconds?: number;
}> = ({
  startSeconds = 0,
}) => {

  const seconds = useTimer(startSeconds);

  return <>
    <Row>-----Timer with hook-----</Row>
    <Row>Starting with {startSeconds} seconds</Row>
    <Row>Currently {seconds} seconds </Row>
  </>;
};