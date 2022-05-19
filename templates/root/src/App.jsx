import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import ProjectPage from "./pages/Project";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/project" element={<ProjectPage />}></Route>
      </Routes>
    </Router>
  );
};
