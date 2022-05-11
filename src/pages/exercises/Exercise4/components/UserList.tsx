import { Link } from 'react-router-dom';
import { VFC, createRef } from 'react';

import { Row } from '../../../../components/Row';

import { useUsers } from './UsersContext';

export const UserList: VFC = () => {
  const { users, updateOrCreateUser, removeUser } = useUsers();

  const userFirstNameInputRef = createRef<HTMLInputElement>();
  const userLastNameInputRef = createRef<HTMLInputElement>();

  const addUser = () => {
    const userFirstNameInput = userFirstNameInputRef.current;
    const userLastNameInput = userLastNameInputRef.current;
    updateOrCreateUser({ firstName: userFirstNameInput?.value, lastName: userLastNameInput?.value });
    if (userFirstNameInput) userFirstNameInput.value = '';
    if (userLastNameInput) userLastNameInput.value = '';
  };

  const firstNameLabelId = 'first-name';
  const lastNameLabelId = 'last-name';
  return (
    <>
      <Row>
        <label id={firstNameLabelId}>First name:</label>
        <input aria-labelledby={firstNameLabelId} ref={userFirstNameInputRef}/>

      </Row>
      <Row>
        <label id={lastNameLabelId}>Last name:</label>
        <input aria-labelledby={lastNameLabelId} ref={userLastNameInputRef}/>
      </Row>
      <Row>
        <button onClick={addUser}>Add user
        </button>
      </Row>
      {users.map((user) => {
        return (<Row key={user.id}>
            <Link to={`${user.id}`}>
              {`${user.firstName ?? ''} ${user.lastName ?? ''}`}
            </Link>
            <button onClick={() => removeUser(user.id)}>Remove user</button>
          </Row>
        );
      })}
    </>);
};
