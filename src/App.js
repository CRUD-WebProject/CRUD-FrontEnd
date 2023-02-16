import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/Mainpage';
import LoginPage from './pages/Loginpage';
import ViewPage from './pages/Viewpage';
import WritePage from './pages/Writepage';
import UpdatePage from './pages/Updatepage';
import UserPage from './pages/Userpage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<LoginPage />}></Route>
          <Route path={`/main`} element={<MainPage />}></Route>
          <Route path={`/view/:id`} element={<ViewPage />}></Route>
          <Route path={`/write`} element={<WritePage />}></Route>
          <Route path={`/update/:id`} element={<UpdatePage />}></Route>
          <Route path={`/info`} element={<UserPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
