import React, { ReactNode } from "react";

interface PokemonModalProps {
  onClose: () => void;
  children: ReactNode;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 shadow-md relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default PokemonModal;
