import React from 'react';

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
    if (!isOpen) return null;

    const handleCancel = () => {
        onCancel(false); // Pass false when canceled
    };

    const handleConfirm = () => {
        onConfirm(true); // Pass true when confirmed
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>

                {message && <p className="text-gray-600 mb-6">{message}</p>}

                {children && <div className="mb-6">{children}</div>}

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`px-4 py-2 text-white rounded-md shadow-sm text-sm font-medium ${confirmColor}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBox;