import { FC } from 'react';
import './App.css';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import React from 'react';

import { Example } from './pages/example/Example';
import { Home } from './pages/home/Home';
import { Users } from './pages/users/Users';
import { UsersProvider } from './pages/users/components/UsersContext';

const App: FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <UsersProvider>
          <Routes>
            <Route path={`/example/*`} element={<Example/>}/>
            <Route path={`/users/*`} element={<Users/>}/>
            <Route path={`/home`} element={<Home/>}/>
            <Route path={`/*`} element={<Navigate to={'/home'}/>}/>
          </Routes>
        </UsersProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
