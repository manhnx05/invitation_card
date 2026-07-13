import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function WeddingDate() {
  const daysOfWeek = ['T.Hai', 'T.Ba', 'T.Tư', 'T.Năm', 'T.Sáu', 'T.Bảy', 'C.Nhật'];
  const emptyDays = [null, null]; // July 1st 2026 is Wednesday (index 2)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Approximate lunar dates for visual detail matching traditional Vietnamese calendars
  const getLunarDate = (day: number) => {
    let lunarDay = day + 16;
    if (lunarDay > 30) {
      lunarDay -= 30;
    }
    if (day === 1) return `17/5`;
    if (day === 15) return `1/6`;
    return `${lunarDay}`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 z-10 relative">
      {/* 1. Stylized Date Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center gap-4 md:gap-8 mb-10"
      >
        <div className="text-xs md:text-sm font-sans tracking-[0.2em] uppercase text-wedding-burgundy font-semibold w-24 text-right">
          Chủ Nhật
        </div>
        
        <div className="flex flex-col items-center justify-center border-l border-r border-wedding-gold/40 px-6 md:px-10">
          <span className="text-5xl md:text-7xl font-serif text-wedding-burgundy font-bold leading-none mb-2 tracking-tight">
            19
          </span>
          <span className="text-xs md:text-sm font-sans tracking-[0.3em] text-wedding-gold-dark font-semibold">
            2026
          </span>
        </div>

        <div className="text-xs md:text-sm font-sans tracking-[0.2em] uppercase text-wedding-burgundy font-semibold w-24 text-left">
          Tháng 7
        </div>
      </motion.div>

      {/* 2. Calendar Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-[340px] bg-white rounded-xl shadow-lg overflow-hidden border border-wedding-gold/20"
      >
        {/* Header */}
        <div className="bg-wedding-burgundy/5 border-b border-wedding-gold/20 py-3 text-center">
          <span className="font-serif text-xl text-wedding-burgundy font-bold uppercase tracking-widest">Tháng 7</span>
        </div>
        
        {/* Grid Header */}
        <div className="grid grid-cols-7 bg-wedding-gold/20 gap-[1px] border-b border-wedding-gold/20">
          {daysOfWeek.map((day, idx) => (
            <div key={day} className={`bg-[#fdfbf7] text-[9px] md:text-[10px] py-2 font-bold font-sans uppercase tracking-wider text-center ${idx === 6 ? 'text-rose-600' : 'text-wedding-gold-dark'}`}>
              {day}
            </div>
          ))}
        </div>
        
        {/* Grid Body */}
        <div className="grid grid-cols-7 bg-wedding-gold/20 gap-[1px]">
          {emptyDays.map((_, idx) => (
            <div key={`empty-${idx}`} className="bg-white min-h-[48px]" />
          ))}
          
          {daysInMonth.map((day) => {
            const isWeddingDay = day === 19;
            const isSun = (day + 2) % 7 === 6; // 1st is Wed
            
            return (
              <div key={day} className={`bg-white min-h-[48px] p-1 flex flex-col items-center justify-center relative ${isWeddingDay ? 'bg-wedding-burgundy/5' : ''}`}>
                {isWeddingDay ? (
                  <>
                    <Heart className="absolute w-8 h-8 text-wedding-burgundy fill-wedding-burgundy/20 animate-pulse" strokeWidth={1.5} />
                    <span className="relative z-10 text-wedding-burgundy font-bold font-serif text-lg leading-none">
                      {day}
                    </span>
                    <span className="relative z-10 text-[8px] text-wedding-burgundy/70 mt-0.5">{getLunarDate(day)}</span>
                  </>
                ) : (
                  <>
                    <span className={`font-serif text-base leading-none ${isSun ? 'text-rose-600' : 'text-wedding-charcoal'}`}>
                      {day}
                    </span>
                    <span className="text-[8px] text-gray-400 mt-0.5">{getLunarDate(day)}</span>
                  </>
                )}
              </div>
            );
          })}
          
          {/* Fill remaining empty cells for perfect grid */}
          {Array.from({ length: 35 - (daysInMonth.length + emptyDays.length) }).map((_, idx) => (
             <div key={`end-empty-${idx}`} className="bg-white min-h-[48px]" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
