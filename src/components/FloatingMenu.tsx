import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Home, Heart, BookOpen, CalendarHeart, Image as ImageIcon, MessageCircleHeart, Gift } from 'lucide-react';

export default function FloatingMenu() {
  const [activeId, setActiveId] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  // Show menu only when scrolled down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Simple active section detection
      const sections = ['hero', 'couple', 'story', 'events', 'album', 'rsvp', 'gift'];
      let current = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            current = section;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', icon: Home, label: 'Đầu trang' },
    { id: 'couple', icon: Heart, label: 'Dâu Rể' },
    { id: 'story', icon: BookOpen, label: 'Chuyện Tình' },
    { id: 'events', icon: CalendarHeart, label: 'Sự kiện' },
    { id: 'album', icon: ImageIcon, label: 'Album' },
    { id: 'rsvp', icon: MessageCircleHeart, label: 'Lời chúc' },
    { id: 'gift', icon: Gift, label: 'Quà mừng' },
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-2"
    >
      <div className="bg-white/95 backdrop-blur-md border border-wedding-gold/20 shadow-xl rounded-full px-4 py-2 flex items-center justify-center gap-1 md:gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative flex flex-col items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all group ${
                isActive ? 'text-wedding-burgundy' : 'text-gray-400 hover:text-wedding-gold'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-wedding-burgundy/10 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-4 h-4 md:w-5 md:h-5 z-10 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="absolute -top-8 bg-black/75 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
