import { useNavigate, useParams } from 'react-router-dom';
import { VFC, createRef } from 'react';

import { Row } from '../../../../components/Row';

import { useUsers } from './UsersContext';

export const User: VFC = () => {
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const { getUser, updateOrCreateUser } = useUsers();

  const user = getUser(id!);

  const userFirstNameInputRef = createRef<HTMLInputElement>();
  const userLastNameInputRef = createRef<HTMLInputElement>();

  const updateUser = () => {
    const userFirstNameInput = userFirstNameInputRef.current;
    const userLastNameInput = userLastNameInputRef.current;
    updateOrCreateUser({ id, firstName: userFirstNameInput?.value, lastName: userLastNameInput?.value });
  };

  const firstNameLabelId = 'first-name';
  const lastNameLabelId = 'last-name';
  if (!user) {
    return <Row> No user with id {id} exists</Row>;
  }
  return (
    <>
      <Row>
        <label id={firstNameLabelId}>First name:</label>
        <input aria-labelledby={firstNameLabelId} defaultValue={user?.firstName ?? ''} ref={userFirstNameInputRef}/>

      </Row>
      <Row>
        <label id={lastNameLabelId}>Last name:</label>
        <input aria-labelledby={lastNameLabelId} defaultValue={user?.lastName ?? ''} ref={userLastNameInputRef}/>
      </Row>
      <Row>
        <button onClick={() => {
          updateUser();
          navigate('..');
        }}> Save
        </button>
      </Row>
    </>);
};
