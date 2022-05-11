import { FC, createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { UserType } from '../types';

const getUserName = (user: UserType) => `${user.firstName} ${user.lastName}`;

type UserWithoutId = Omit<UserType, 'id'>;

const isUser = (user: any): user is UserType => {
  if (!user || typeof user !== 'object') {
    throw `UserWithoutId cannot represent non object ${user}`;
  }
  return 'id' in user;
};

export type UserContextType = {
  users: UserType[];
  updateOrCreateUser(user: UserType | UserWithoutId): void;
  removeUser(id: string): void;
  getUser(id: string): UserType | undefined;
};

const defaultContext: UserContextType = {
  users: [],
  updateOrCreateUser: () => {
    throw 'Not implemented';
  },
  removeUser: () => {
    throw 'Not implemented';
  },
  getUser: () => {
    throw 'Not implemented';
  },
};

const UserContext = createContext<UserContextType>(defaultContext);
export const useUsers = () => useContext(UserContext);

const { Provider } = UserContext;

export const UsersProvider: FC = ({ children }) => {

  const [userMappings, setUserMappings] = useState<{ [id: string]: UserType }>({});
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    setUsers(
      Object.values(userMappings)
        .sort((user1, user2) => getUserName(user1).localeCompare(getUserName(user2))));
  }, [userMappings]);

  const updateOrCreateUser = (user: UserType | UserWithoutId) => {
    const newUser = { ...user, id: isUser(user) ? user.id : uuid() };
    setUserMappings(currentUsers => {
      return ({ ...currentUsers, [newUser.id]: newUser });
    });
  };

  const getUser = (id: string) => userMappings[id];
  const removeUser = (id: string) => {
    setUserMappings(currentUsers => {
      const copyOfCurrentUsers = { ...currentUsers };
      delete copyOfCurrentUsers[id];
      return copyOfCurrentUsers;
    });
  };

  return <Provider value={{ users, updateOrCreateUser, getUser, removeUser }}>
    {children}
  </Provider>;
};