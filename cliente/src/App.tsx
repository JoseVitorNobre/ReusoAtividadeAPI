import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListCourses from "./pages/ListCourse";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListCourses />} />
        <Route path="/add" element={<AddCourse />} />
        <Route path="/edit/:id" element={<EditCourse />} />
      </Routes>
    </Router>
  );
};

export default App;
