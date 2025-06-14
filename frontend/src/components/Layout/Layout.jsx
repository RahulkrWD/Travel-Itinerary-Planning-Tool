import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      }}
    >
      <Navbar />
      <main
        className="flex-grow-1"
        style={{
          paddingTop: "100px",
          paddingBottom: "2rem",
        }}
      >
        <div className="container">
          <Outlet />
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
