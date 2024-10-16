import React from 'react';
import { Routes, Route } from "react-router-dom";
import Guest from './components/Guest';
import Register from './components/Register';
import Members from './components/Members';
import Admin from './components/Admin';
import NotificationBar from './components/notification/NotificationBar';
import UserSettings from './components/UserSettings';
import NotFound from './components/NotFound';
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { Roles } from "./constants";
import NavBar from './components/NavBar';
import RegisterAdmin from './components/RegisterAdmin';


function App() {
  
  return (
    <>
      <NavBar />
      <NotificationBar />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Guest />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
        </Route>
        
        <Route element={<ProtectedLayout 
          allowedRoles={[
            Roles.Member,
            Roles.Admin,
              ]}/> }>
          <Route path="/members" element={<Members />} />

        </Route>
        <Route element={<ProtectedLayout 
          allowedRoles={[ Roles.Admin ]}/> }>
          <Route path="/user-settings" element={<UserSettings />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
