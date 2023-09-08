import React from "react";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex w-screen h-screen border-2 ">
      <div>
        <Sidebar />
      </div>
      <div>Dashboard</div>
    </div>
  );
};

export default Dashboard;
