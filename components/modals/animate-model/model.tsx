"use client"; // This makes it a Client Component since it uses state and event handlers

import { useState } from "react";

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        setIsClosing(false);
    };

    const closeModal = () => {
        setIsClosing(true);
        // Delay hiding the modal until the animation finishes
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 100); // Matches the closing animation duration
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Open Modal Button */}
            <button
                onClick={openModal}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Edit Profile
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={closeModal} // Close when clicking outside
                >
                    <div
                        className={`bg-white p-6 rounded-lg w-80 text-center transform transition-transform duration-300 ease-out ${isClosing
                                ? "scale-0 duration-100 ease-in"
                                : "scale-100"
                            }`}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                        <p className="text-gray-600 mb-6">
                            This is the modal content.
                        </p>
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;