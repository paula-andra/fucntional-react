import { VFC } from 'react';
import { Link } from 'react-router-dom';

import { Row } from '../../components/Row';

export const Home: VFC = () => {
  return <>
    <Row><Link to={'/example'}> Example</Link></Row>
    <Row><Link to={'/users'}> Users</Link></Row>
  </>;
};