import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Calendar, MessageSquareQuote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Greeting } from '../types';

interface WishingWallProps {
  greetings: Greeting[];
  onLike: (id: string) => void;
}

export default function WishingWall({ greetings, onLike }: WishingWallProps) {
  // Simple floating hearts state per comment card click
  const [clickPositions, setClickPositions] = useState<{ id: string; x: number; y: number; key: number }[]>([]);

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    onLike(id);
    
    // Create a new floating heart at the clicked position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newHeart = {
      id,
      x,
      y,
      key: Date.now() + Math.random()
    };
    
    setClickPositions((prev) => [...prev, newHeart]);
    
    // Clear heart after animation finishes
    setTimeout(() => {
      setClickPositions((prev) => prev.filter((h) => h.key !== newHeart.key));
    }, 1000);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    } catch {
      return '';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <span className="text-wedding-gold font-script text-3xl block mb-2">Bức Tường Chúc Phúc</span>
        <h3 className="text-xl font-serif text-wedding-burgundy font-semibold">Lời Chúc Từ Khách Quý</h3>
        <p className="text-xs text-gray-400 mt-1 font-sans">
          Nơi gửi gắm những lời chúc ngọt ngào nhất tới đôi uyên ương Quang Hiếu &amp; Việt Anh.
        </p>
      </div>

      {greetings.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-xl border border-wedding-gold/15 shadow-sm max-w-md mx-auto">
          <MessageSquareQuote className="w-8 h-8 text-wedding-gold/40 mx-auto mb-2" />
          <p className="text-xs text-gray-400 font-sans">
            Chưa có lời chúc nào. Hãy là người đầu tiên chúc mừng hạnh phúc đôi bạn trẻ nhé!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar p-1">
          <AnimatePresence mode="popLayout">
            {greetings.map((greet) => (
              <motion.div
                key={greet.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#fefdfb] rounded-xl border border-wedding-gold/15 p-4.5 shadow-sm hover:shadow-md transition-all relative group flex flex-col justify-between"
              >
                {/* Background decorative flower outline */}
                <div className="absolute right-2 bottom-2 text-wedding-gold/5 pointer-events-none select-none">
                  <Heart className="w-16 h-16 fill-current" />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-wedding-charcoal font-sans">
                        {greet.name}
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold font-sans uppercase tracking-wider ${
                        greet.guestOf === 'groom'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {greet.guestOf === 'groom' ? 'Nhà Trai' : 'Nhà Gái'}
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-400 font-sans flex items-center gap-0.5">
                      <Calendar className="w-2.5 h-2.5" />
                      {formatDate(greet.timestamp)}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-sans leading-relaxed italic pr-2 relative z-10 whitespace-pre-line">
                    "{greet.message}"
                  </p>
                </div>

                {/* Like Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    id={`btn-like-${greet.id}`}
                    onClick={(e) => handleLikeClick(e, greet.id)}
                    className="relative px-3 py-1 bg-white hover:bg-rose-50/50 rounded-full border border-wedding-gold/20 hover:border-rose-200 text-gray-500 hover:text-rose-600 text-[10px] font-sans font-semibold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Heart className={`w-3 h-3 ${greet.likes > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>Thích ({greet.likes})</span>

                    {/* Render click animated floating hearts */}
                    {clickPositions
                      .filter((pos) => pos.id === greet.id)
                      .map((pos) => (
                        <motion.span
                          key={pos.key}
                          initial={{ opacity: 1, scale: 1, x: pos.x - 12, y: pos.y - 12 }}
                          animate={{ opacity: 0, scale: 1.5, y: pos.y - 60, rotate: [-10, 10, -10] }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="absolute pointer-events-none text-rose-500 text-xs font-bold"
                        >
                          ❤️
                        </motion.span>
                      ))}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
