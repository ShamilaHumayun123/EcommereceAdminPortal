import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="sherah-body-area">
      <Sidebar />
      <Header />
      {children}
    </div>
  );
}
