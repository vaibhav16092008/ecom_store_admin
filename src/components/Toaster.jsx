"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const Toaster = ({ toasts, removeToast }) => {
  console.log("toasts, removeToast", toasts);
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem = ({ toast, removeToast }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.duration]);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, 300); // Match this with exit animation duration

      return () => clearTimeout(timer);
    }
  }, [isVisible, removeToast, toast.id]);

  const getBgColor = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`${getBgColor()} text-white rounded-lg shadow-lg overflow-hidden`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex-1">
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 hover:opacity-80 transition-opacity"
        >
          <X size={16} />
        </button>
      </div>
      {toast.duration && (
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{
            duration: (toast.duration || 5000) / 1000,
            ease: "linear",
          }}
          className="h-1 bg-white bg-opacity-50"
        />
      )}
    </motion.div>
  );
};

export default Toaster;
