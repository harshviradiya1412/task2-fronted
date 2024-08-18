import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./ApiDemo/Pages/Register";
import Login from "./ApiDemo/Pages/Login";
import StudentInfo from "./ApiDemo/Pages/StudentInfo";
import Update from "./ApiDemo/Pages/Update";
import Navbar from "./Component/Navbar";
import SimpleCrud from "./SimpleDemo/SimpleCrud";

const App = () => {
  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("loginData");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        <Route
          path="/student-list"
          element={isLoggedIn ? <StudentInfo /> : <Navigate to="/" />}
        />
        <Route
          path="/student-update/:id"
          element={isLoggedIn ? <Update /> : <Navigate to="/" />}
        />
        <Route path="/simple" element={<SimpleCrud />} />
      </Routes>
    </>
  );
};

export default App;
