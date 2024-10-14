import React from 'react';
import { Routes, Route } from "react-router-dom";
import Guest from './components/Guest';
import Register from './components/Register';
import Members from './components/Members';
import Admin from './components/Admin';
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";



function App() {
  
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Guest />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
        <Route element={<ProtectedLayout /> }>
          <Route path="/members" element={<Members />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
