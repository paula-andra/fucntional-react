import { Buffer } from 'buffer';

import { FC, createContext, useContext, useState } from 'react';

export type UserProfileContextType = {
  userProfile?: string;
  setUserProfile: (token: string) => void
};

const UserProfileContext = createContext<UserProfileContextType>({
  setUserProfile: () => {
    throw 'not implemented';
  },
});
export const useUserProfile = () => useContext(UserProfileContext);

const { Provider } = UserProfileContext;

export const UserProfileProvider: FC = ({ children }) => {
  const [userProfile, setUserProfile] = useState<string | undefined>();
  const setToken = (token: string) => {
    const json = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    setUserProfile(json.name);
  };
  return <Provider value={{ userProfile, setUserProfile: setToken }}>{children}</Provider>;
};