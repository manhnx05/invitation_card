import { useState } from 'react';
import { MailOpen, Heart, User } from 'lucide-react';
import { motion } from 'motion/react';
import { globalAudio } from './AudioPlayer';

interface EnvelopeProps {
  onOpen: (guestName: string) => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenEnvelope = () => {
    // Start music synchronously on user interaction
    globalAudio.play().catch(e => console.log('Autoplay prevented:', e));
    setIsOpening(true);
    // Smooth transition
    setTimeout(() => {
      onOpen('Quý khách');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-wedding-cream flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Delicate floating background petals / designs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-wedding-gold/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-wedding-burgundy/5 blur-3xl animate-pulse" />
        {/* Abstract botanical outlines */}
        <svg className="absolute -top-10 -right-10 w-64 h-64 text-wedding-gold/10" fill="currentColor" viewBox="0 0 100 100">
          <path d="M50 0 C60 20, 80 40, 100 50 C80 60, 60 80, 50 100 C40 80, 20 60, 0 50 C20 40, 40 20, 50 0 Z" />
        </svg>
        <svg className="absolute -bottom-20 -left-10 w-80 h-80 text-wedding-gold/10" fill="currentColor" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, y: -50 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg text-center z-10"
      >
        {/* Monogram or Wedding Icon */}
        <div className="mb-6 inline-flex flex-col items-center">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full border border-wedding-gold/30 flex items-center justify-center bg-white shadow-sm mb-3"
          >
            <span className="text-3xl font-script text-wedding-gold select-none">H & A</span>
          </motion.div>
          <h2 className="text-base font-sans tracking-widest uppercase text-wedding-burgundy font-semibold">
            Wedding Invitation
          </h2>
        </div>

        {/* Outer Envelope Wrapper */}
        <motion.div
          animate={isOpening ? { y: -20, scale: 0.98, opacity: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="relative bg-white border border-wedding-gold/20 rounded-2xl p-6 md:p-10 shadow-2xl wedding-card-glow max-w-md mx-auto"
        >
          {/* Envelope Header Graphic */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-2 bg-gradient-to-r from-transparent via-wedding-gold/30 to-transparent" />

          <div className="mb-6 mx-auto rounded-t-xl md:rounded-xl overflow-hidden border-2 border-wedding-gold/10 shadow-sm relative max-w-sm">
            <img src="/assets/img9.jpg" alt="Quang Hiếu & Việt Anh" className="w-full h-auto block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-wedding-charcoal mb-2 font-medium tracking-wide">
            Thiệp Cưới Online
          </h1>
          <p className="text-lg md:text-xl font-script text-wedding-gold mb-8">
            Quang Hiếu &amp; Việt Anh
          </p>

          <div className="space-y-6">
            <p className="text-sm md:text-base text-gray-500 font-sans tracking-wide leading-relaxed px-4">
              Trân trọng kính mời Quý khách mở thiệp để xem chi tiết lời mời từ chúng tôi.
            </p>

            {/* Open Button styled as a traditional Wax Seal */}
            <div className="pt-4">
              <motion.button
                id="btn-open-envelope"
                onClick={handleOpenEnvelope}
                disabled={isOpening}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group inline-flex items-center justify-center"
              >
                {/* Wax Seal Circle */}
                <div className="w-20 h-20 rounded-full bg-wedding-burgundy flex flex-col items-center justify-center text-white shadow-lg border-2 border-wedding-gold/50 group-hover:bg-wedding-burgundy-dark transition-colors duration-300 relative z-10">
                  {isOpening ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="border-2 border-t-transparent border-white w-6 h-6 rounded-full"
                    />
                  ) : (
                    <>
                      <Heart className="w-5 h-5 text-wedding-gold-light animate-pulse mb-0.5" />
                      <span className="text-xs tracking-widest uppercase font-semibold text-wedding-gold-light font-sans">MỞ THIỆP</span>
                    </>
                  )}
                </div>
                {/* Outer shadow waves */}
                <div className="absolute inset-0 rounded-full bg-wedding-burgundy/10 scale-110 animate-ping opacity-40 pointer-events-none group-hover:scale-125 transition-all duration-700" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Small Invitation Signoff */}
        <p className="text-xs text-gray-400 font-sans tracking-widest uppercase mt-8">
          Hà Tĩnh, 2026 • Kỷ Niệm Ngày Chung Đôi
        </p>
      </motion.div>
    </div>
  );
}
