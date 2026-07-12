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
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto p-4">
      <div className="flex items-center gap-1.5 mb-4">
        <Clock className="w-4.5 h-4.5 text-wedding-gold animate-pulse" />
        <span className="text-xs tracking-widest uppercase text-wedding-burgundy font-semibold font-sans">
          {title}
        </span>
      </div>

      <div className="flex justify-center gap-3 md:gap-6 w-full mt-2">
        {timeBlocks.map((block, index) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center justify-center w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full border border-wedding-gold/40 bg-white shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
          >
            {/* Elegant inner ring */}
            <div className="absolute inset-1 rounded-full border border-wedding-gold/10 pointer-events-none" />
            
            {/* Soft decorative background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-wedding-cream to-white opacity-40 group-hover:bg-wedding-cream/80 transition-colors duration-500 pointer-events-none" />
            
            <span className="text-xl md:text-3xl font-bold font-serif text-wedding-burgundy z-10 leading-none">
              {String(block.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] md:text-[11px] text-wedding-gold uppercase tracking-widest font-bold mt-1 z-10">
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
