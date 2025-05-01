'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoritesModal from '@/components/FavoriteModal';
import HistoryModal from '@/components/HistoryModal.tsx';

const categories = ["coding", "content", "startup"];

const LandingPage = () => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
  const saved = localStorage.getItem('favorites');
  if (saved) {
    setFavorites(JSON.parse(saved));
  }
}, []);

  const [sessionHistory, setSessionHistory] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const getPrompt = async (selectedCategory?: string) => {
    setLoading(true);
    setCopied(false);
    try {
      const url = selectedCategory ? `/api/prompts?category=${selectedCategory}` : '/api/prompts';
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setPrompt(data.prompt);
        setCategory(data.category);
        setSessionHistory((prev) => [data.prompt, ...prev]);
      } else {
        toast.error(data.error || "Failed to fetch prompt");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      toast.success("Copied to clipboard!");
      setCopied(true);
    }
  };

  useEffect(() => {
    // This runs only on the client
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const saveToFavorites = () => {
    if (!isClient) return; // Guard
  
    if (!favorites.includes(prompt)) {
      const updated = [...favorites, prompt];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
      toast.success("Saved to favorites!");
    } else {
      toast.info("Already in favorites.");
    }
  };
  

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-4 relative">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className='absolute top-4 left-4'>
        <h1 className="text-xl font-bold text-gray-900">
          FlashPrompt<span className="text-indigo-600">.</span>
        </h1>
      </div>

      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-24 md:mt-48 text-center leading-tight">
  Generate <span className="text-indigo-600">Brilliant AI Prompts</span>
  <br className="hidden sm:block" /> Instantly, Not Eventually
</h1>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto text-lg">
          Generate powerful AI prompts for coding, content, and startup ideas — instantly.
        </p>
      </motion.div>

      <div className="flex flex-col items-center gap-4 mb-6 w-full max-w-md">
        <button
          onClick={() => getPrompt()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-md transition"
        >
          {loading ? "Loading..." : "Get Random Prompt"}
        </button>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => getPrompt(cat)}
              className="px-4 py-2 bg-white cursor-pointer border border-indigo-300 text-indigo-600 rounded-full text-sm hover:bg-indigo-50 transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {prompt && (
        <motion.div
          className="bg-white max-w-xl w-full p-6 rounded-2xl shadow-xl border border-gray-200 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full capitalize">
              {category}
            </span>
          </div>
          <p className="text-gray-800 mb-4 whitespace-normal break-words animate-typing border-r-2 border-gray-300 inline-block w-full sm:w-auto">
            {prompt}
          </p>

          <div className="flex gap-4">
            <button onClick={copyToClipboard} className="text-sm  cursor-pointer text-indigo-600 hover:underline font-medium">
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={saveToFavorites} className="text-sm cursor-pointer  text-pink-600 hover:underline font-medium">
              ❤️ Save
            </button>
          </div>
        </motion.div>
      )}

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button onClick={() => setShowFavorites(true)} className="text-sm cursor-pointer text-pink-600 hover:underline font-medium">
          View Favorites ({favorites.length})
        </button>
        <button onClick={() => setShowHistory(true)} className="text-sm cursor-pointer text-indigo-600 hover:underline font-medium">
          View History
        </button>
      </div>

      {showFavorites && (
        <FavoritesModal
          favorites={favorites}
          onClose={() => setShowFavorites(false)}
          setFavorites={setFavorites}
        />
      )}

      {showHistory && (
        <HistoryModal
          sessionHistory={sessionHistory}
          onClose={() => setShowHistory(false)}
        />
      )}

    {/* Footer */}
    <footer className="w-full text-sm text-gray-400 text-center py-4 mt-auto relative bottom-0">
    Built with 🖤 by{' '}
    <a
      href="https://devtofunmi.netlify.app"
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 hover:underline"
    >
      Tofunmi
    </a>
  </footer>


  <style>{`
  .typewriter {
    display: inline;
    overflow-wrap: break-word;
    white-space: normal;
    border-right: 2px solid #ccc;
    animation: typing 3s steps(40, end) forwards, blink .8s infinite;
  }

  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes blink {
    50% { border-color: transparent; }
  }
`}</style>

    </main>
  );
};

export default LandingPage;
