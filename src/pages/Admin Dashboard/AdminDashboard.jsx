// pages/Admin Dashboard/AdminDashboard.jsx
import React from "react";
import HeaderActions from "./components/HeaderActions";

const AdminDashboard = () => {
  return (
    <div className="p-6 mt-[60px]">
      <HeaderActions />
      <div className="flex justify-center items-center h-[400px] text-2xl text-center">
        <h2>Welcome To Admin Dashboard</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;
