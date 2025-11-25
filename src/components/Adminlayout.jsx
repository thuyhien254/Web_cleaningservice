import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";

const AdminLayout = () => {
  return (
    <>
      <NavbarAdmin />
      <div style={{ marginTop: "100px", padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
