"use client";
import Toaster from "@/components/Toaster";
import React from "react";
import { useToast } from "@/hooks/useToast";

const ClientBody = ({ children }) => {
  const { toasts, removeToast } = useToast();

  return (
    <div>
      {/* <Toaster toasts={toasts} removeToast={removeToast} /> */}
      {children}
    </div>
  );
};

export default ClientBody;
