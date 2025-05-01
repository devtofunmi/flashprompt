// components/FavoritesModal.tsx
import React from "react";
import { toast } from "react-toastify";

interface FavoritesModalProps {
  favorites: string[];
  onClose: () => void;
  setFavorites: (favorites: string[]) => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({ favorites, onClose, setFavorites }) => {
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  const remove = (index: number) => {
    const updated = favorites.filter((_, i) => i !== index);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    toast.success("Removed");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[350px] md:w-lg shadow-lg relative">
        <button className="absolute cursor-pointer top-2 right-3 text-gray-500 hover:text-pink-500" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorites saved yet.</p>
        ) : (
          <ul className="space-y-4 max-h-80 overflow-y-auto text-sm">
            {favorites.map((fav, idx) => (
              <li key={idx} className="bg-pink-50 p-4 rounded-xl">
                {fav}
                <div className="flex gap-4 mt-2">
                  <button onClick={() => copy(fav)} className="text-pink-600 hover:underline text-xs">
                    Copy
                  </button>
                  <button onClick={() => remove(idx)} className="text-red-500 hover:underline text-xs">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;
