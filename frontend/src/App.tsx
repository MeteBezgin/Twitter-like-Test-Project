import React from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Feed from "././components/Feed";
import { Navigate } from "react-router-dom";
import UserView from "./components/UserView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/home" element={<Feed />} />
      <Route path="/user/:id" element={<UserView />} />
    </Routes>
  );
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <NavBar>
        <App />
      </NavBar>
    </BrowserRouter>
  );
};

export default AppWrapper;
