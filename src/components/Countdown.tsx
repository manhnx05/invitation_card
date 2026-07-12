import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface CountdownProps {
  targetDateStr?: string; // default to '2026-07-19T10:30:00'
  title?: string;
}

export default function Countdown({
  targetDateStr = '2026-07-19T10:30:00',
  title = 'Lễ Thành Hôn sẽ diễn ra sau'
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDateStr) - +new Date();
      let timeLeftData = { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isOver: false
        };
      }
      return timeLeftData;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateStr]);

  if (timeLeft.isOver) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-wedding-gold/30 bg-wedding-cream p-6 shadow-md max-w-md"
        >
          <span className="text-3xl font-script text-wedding-gold block mb-2">Quang Hiếu & Việt Anh</span>
          <p className="text-sm font-sans tracking-widest text-wedding-burgundy uppercase font-semibold">
            Ngày Chung Đôi Đã Đến! 🎉
          </p>
          <p className="text-xs text-gray-500 mt-2 font-sans">
            Cảm ơn quý vị đã dành thời gian chia vui cùng gia đình chúng tôi.
          </p>
        </motion.div>
      </div>
    );
  }

  const timeBlocks = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds }
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 my-4">
      {/* Premium Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center gap-4 mb-3 opacity-80">
          <div className="h-[1px] w-10 md:w-16 bg-gradient-to-r from-transparent to-wedding-gold" />
          <Calendar className="w-4 h-4 text-wedding-gold" />
          <div className="h-[1px] w-10 md:w-16 bg-gradient-to-l from-transparent to-wedding-gold" />
        </div>
        <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-wedding-burgundy font-semibold font-sans">
          {title}
        </span>
      </div>

      {/* Countdown Blocks */}
      <div className="flex justify-center gap-3 md:gap-5 w-full">
        {timeBlocks.map((block, index) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center justify-center w-[76px] h-[100px] md:w-[90px] md:h-[120px] rounded-t-full rounded-b-2xl border border-wedding-gold/30 bg-white/80 backdrop-blur-sm shadow-[0_8px_30px_rgba(179,138,85,0.12)] group hover:-translate-y-2 transition-transform duration-500 overflow-hidden"
          >
            {/* Elegant Inner Arch */}
            <div className="absolute inset-1.5 md:inset-2 rounded-t-full rounded-b-xl border border-wedding-gold/15 pointer-events-none" />
            
            {/* Subtle Gradient Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-wedding-cream/0 to-wedding-cream/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Time Value */}
            <span className="text-2xl md:text-4xl font-serif text-wedding-burgundy z-10 leading-none mt-2">
              {String(block.value).padStart(2, '0')}
            </span>
            
            {/* Divider Line */}
            <div className="w-6 h-[1px] bg-wedding-gold/40 my-2 md:my-3 z-10 transition-all duration-500 group-hover:w-8 group-hover:bg-wedding-burgundy/40" />
            
            {/* Label */}
            <span className="text-[9px] md:text-[11px] text-gray-500 uppercase tracking-widest font-sans font-medium z-10">
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
