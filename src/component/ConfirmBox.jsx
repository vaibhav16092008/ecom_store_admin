import React, { useEffect, useState } from 'react';

const ConfirmBox = ({
    isOpen,
    title = "Confirm Action",
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "bg-red-600 hover:bg-red-700",
    children
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => setIsMounted(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleCancel = () => {
        setIsVisible(false);
        setTimeout(() => {
            onCancel(false);
        }, 200);
    };

    const handleConfirm = () => {
        setIsVisible(false);
        setTimeout(() => {
            onConfirm(true);
        }, 200);
    };

    if (!isMounted) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop with blur transition */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleCancel}
            />

            {/* Modal content with scale transition */}
            <div
                className={`relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>

                {message && <p className="text-gray-600 text-wrap mb-6">{message}</p>}

                {children && <div className="mb-6">{children}</div>}

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={handleCancel}
                        className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`cursor-pointer px-4 py-2 text-white rounded-md shadow-sm text-sm font-medium ${confirmColor} transition-colors duration-200`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBox;