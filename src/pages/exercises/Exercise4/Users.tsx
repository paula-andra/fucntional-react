import { Route, Routes } from 'react-router-dom';

import { Row } from '../../../components/Row';

import { useUsers } from './components/UsersContext';
import { UserList } from './components/UserList';
import { User } from './components/User';

export const Users = () => {
  const { users } = useUsers();
  return <>
    <Row>{users.length} users</Row>
    <Routes>
      <Route path={``} element={<UserList/>}/>
      <Route path={`:id`} element={<User/>}/>
    </Routes>
  </>;
};