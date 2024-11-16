// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TopProjects from "./pages/Top project/TopProjects"; // Pastikan ini sudah ada
import Login from "./pages/Auth/Login"; // Pastikan ini sudah ada
import AdminDashboard from "./pages/Admin Dashboard/AdminDashboard";
import RuteGallery from "./pages/Admin Dashboard/components/Gallery";
import RuteTopProject from "./pages/Admin Dashboard/components/TopProject";
import Start from "./pages/Start/index";
import RPL1 from "./pages/Start/slug/RPL-1";
import RPL2 from "./pages/Start/slug/RPL-2";
import PPLG1 from "./pages/Start/slug/PPLG-1";
import PPLG2 from "./pages/Start/slug/PPLG-2";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-project" element={<TopProjects />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/rute-gallery" element={<RuteGallery />} />
        <Route path="/rute-project" element={<RuteTopProject />} />
        <Route path="/start" element={<Start />} />
        <Route path="rpl-1" element={<RPL1 />}>
          <Route path="gallery" element={<RPL1 />} />
          <Route path="top-project" element={<RPL1 />} />
        </Route>
        <Route path="rpl-2" element={<RPL2 />}>
          <Route path="gallery" element={<RPL2 />} />
          <Route path="top-project" element={<RPL2 />} />
        </Route>
        <Route path="pplg-1" element={<PPLG1 />}>
          <Route path="gallery" element={<PPLG1 />} />
          <Route path="top-project" element={<PPLG1 />} />
        </Route>
        <Route path="pplg-2" element={<PPLG2 />} >
        <Route path="gallery" element={<PPLG2 />} />
        <Route path="top-project" element={<PPLG2 />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
