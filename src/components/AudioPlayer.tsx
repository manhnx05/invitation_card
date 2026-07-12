import { useState, useEffect } from 'react';
import { Music, VolumeX, Disc3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Create a global audio instance so it can be controlled synchronously from anywhere
export const globalAudio = new Audio('/audio/music.mp3');
globalAudio.loop = true;
globalAudio.volume = 0.4;

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(!globalAudio.paused);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handlePlayEvent = () => {
      setIsPlaying(true);
      setShowToast(false);
    };
    const handlePauseEvent = () => setIsPlaying(false);

    globalAudio.addEventListener('play', handlePlayEvent);
    globalAudio.addEventListener('pause', handlePauseEvent);
    
    // Catch-up in case it started before mount
    setIsPlaying(!globalAudio.paused);

    // Show toast reminder to play music if not playing yet
    const timer = setTimeout(() => {
      if (globalAudio.paused) {
        setShowToast(true);
      }
    }, 4000);

    return () => {
      globalAudio.removeEventListener('play', handlePlayEvent);
      globalAudio.removeEventListener('pause', handlePauseEvent);
      clearTimeout(timer);
    };
  }, []);

  const togglePlay = () => {
    if (globalAudio.paused) {
      globalAudio.play().catch(error => {
        console.log('Autoplay was prevented by browser.', error);
      });
    } else {
      globalAudio.pause();
    }
  };


  return (
    <div className="flex flex-col items-center justify-center my-8 z-10 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-12 whitespace-nowrap rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-wedding-burgundy shadow-sm border border-wedding-gold/20 flex items-center gap-2"
          >
            <Music className="w-3.5 h-3.5 animate-pulse" />
            <span>Phát nhạc I Do?</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Music Vinyl Record */}
      <motion.button
        id="btn-toggle-music"
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center focus:outline-none group"
        title={isPlaying ? 'Tắt nhạc nền' : 'Mở nhạc nền'}
      >
        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#111] shadow-2xl flex items-center justify-center relative border-[4px] md:border-[6px] border-[#222] ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
          {/* Vinyl grooves */}
          <div className="absolute inset-2 md:inset-3 rounded-full border border-gray-600/30 pointer-events-none" />
          <div className="absolute inset-5 md:inset-6 rounded-full border border-gray-600/30 pointer-events-none" />
          <div className="absolute inset-8 md:inset-10 rounded-full border border-gray-600/30 pointer-events-none" />
          
          {/* Center Label */}
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-wedding-burgundy border-2 border-wedding-gold flex items-center justify-center z-10 shadow-inner">
            <span className="text-[10px] md:text-sm text-white font-script font-bold tracking-widest uppercase">I Do</span>
          </div>
          
          {/* Center Hole */}
          <div className="absolute w-2.5 h-2.5 rounded-full bg-white z-20 shadow-inner" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 via-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Play/Pause overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center z-30 transition-opacity">
             <span className="text-white text-xs md:text-sm uppercase tracking-widest font-bold">Play</span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
