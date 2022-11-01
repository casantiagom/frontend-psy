"use client";
import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
import Likert from "react-likert-scale";
import Link from "next/link.js";

const Page = () => {
  let { currentUser } = useAuth();

  return (
    <div>
      <div className="text-center font-sans text-3xl my-10">
        Gracias {currentUser.displayName} por llenar el cuestionario!
      </div>
      <div className="text-center font-sans text-xl my-10">
        Cristobal se contactara contigo
      </div>
    </div>
  );
};

export default Page;
