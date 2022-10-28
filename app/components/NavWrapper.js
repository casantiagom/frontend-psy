import React from "react";
import { AuthProvider } from "../contexts/AuthContext.js";
import Navbar from "./Navbar.js";
const NavWrapper = () => {
  return (
    <AuthProvider>
      <Navbar />
    </AuthProvider>
  );
};

export default NavWrapper;
