"use client";
import { useState } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type, duration = 3000) => {
    const newToast = {
      id: new Date(),
      message,
      type,
      duration,
    };

    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toast = {
    success: (message, duration) => addToast(message, "success", duration),
    error: (message, duration) => addToast(message, "error", duration),
    warning: (message, duration) => addToast(message, "warning", duration),
    info: (message, duration) => addToast(message, "info", duration),
  };

  return { toasts, toast, removeToast };
};
