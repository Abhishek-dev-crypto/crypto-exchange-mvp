"use client";

import { useState } from "react";

const ConnectModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white font-bold text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">Connect Wallet</h2>
        <p className="text-white">Please connect your wallet to continue.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConnectModal;
