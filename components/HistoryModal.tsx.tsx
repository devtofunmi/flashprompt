// components/HistoryModal.tsx
import React from "react";

interface HistoryModalProps {
  sessionHistory: string[];
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ sessionHistory, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[350px] md:w-lg shadow-lg relative">
        <button className="absolute top-2 right-3 text-gray-500 hover:text-indigo-500" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Prompt History</h2>
        {sessionHistory.length === 0 ? (
          <p className="text-gray-500">No history yet.</p>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-y-auto text-sm text-gray-700">
            {sessionHistory.map((item, idx) => (
              <li key={idx} className="bg-gray-100 p-3 rounded-xl">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;
