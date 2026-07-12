import { useState } from 'react';
import { CreditCard, Check, Copy, Heart, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GiftCorner() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSide, setActiveSide] = useState<'groom' | 'bride'>('groom');

  const accounts = [
    {
      id: 'groom',
      title: 'Chú Rể Quang Hiếu',
      bankName: 'Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)',
      accountNumber: '1023456789',
      accountName: 'NGUYEN QUANG HIEU',
      branch: 'Chi nhánh Hà Tĩnh',
      qrUrl: 'https://img.vietqr.io/image/VCB-1023456789-compact2.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc%20Quang%20Hieu%20Viet%20Anh'
    },
    {
      id: 'bride',
      title: 'Cô Dâu Việt Anh',
      bankName: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)',
      accountNumber: '2024567890',
      accountName: 'NGUYEN THI VIET ANH',
      branch: 'Chi nhánh Hà Tĩnh',
      qrUrl: 'https://img.vietqr.io/image/BIDV-2024567890-compact2.png?amount=200000&addInfo=Chuc%20mung%20hanh%20phuc%20Quang%20Hieu%20Viet%20Anh'
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-wedding-gold/20 p-6 md:p-8 shadow-xl relative overflow-hidden wedding-card-glow">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wedding-gold-light via-wedding-gold to-wedding-gold-light" />
        
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-full bg-wedding-gold/10 flex items-center justify-center mx-auto mb-2">
            <CreditCard className="w-5 h-5 text-wedding-gold" />
          </div>
          <h3 className="text-xl font-serif text-wedding-burgundy font-semibold">Gửi Quà Mừng Cưới</h3>
          <p className="text-xs text-gray-400 mt-1 font-sans">
            Ngày vui trọn vẹn khi có lời chúc phúc, nếu bạn ở xa hoặc muốn chúc mừng qua tài khoản ngân hàng.
          </p>
        </div>

        {/* Toggle switch for Groom / Bride accounts */}
        <div className="flex bg-wedding-cream/60 rounded-xl p-1 mb-6 border border-wedding-gold/10 max-w-xs mx-auto">
          <button
            id="btn-gift-groom"
            onClick={() => setActiveSide('groom')}
            className={`flex-1 py-2 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
              activeSide === 'groom'
                ? 'bg-wedding-gold text-white shadow-sm'
                : 'text-wedding-gold-dark hover:text-wedding-gold'
            }`}
          >
            Mừng Chú Rể
          </button>
          <button
            id="btn-gift-bride"
            onClick={() => setActiveSide('bride')}
            className={`flex-1 py-2 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
              activeSide === 'bride'
                ? 'bg-wedding-gold text-white shadow-sm'
                : 'text-wedding-gold-dark hover:text-wedding-gold'
            }`}
          >
            Mừng Cô Dâu
          </button>
        </div>

        {/* Account Details */}
        <AnimatePresence mode="wait">
          {accounts.map((acc) => {
            if (acc.id !== activeSide) return null;
            return (
              <motion.div
                key={acc.id}
                initial={{ opacity: 0, x: activeSide === 'groom' ? -15 : 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeSide === 'groom' ? 15 : -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-[#fefdfb] border border-wedding-gold/20 rounded-xl p-5 flex flex-col md:flex-row gap-6 items-center justify-between">
                  <div className="space-y-3.5 flex-1 w-full">
                    <span className="text-xs font-bold text-wedding-burgundy block font-sans tracking-wide">
                      TÀI KHOẢN MỪNG CƯỚI: {acc.title.toUpperCase()}
                    </span>

                    <div className="space-y-2 text-xs font-sans">
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Ngân hàng</span>
                        <span className="font-semibold text-wedding-charcoal block">{acc.bankName}</span>
                      </div>

                      <div className="flex items-center justify-between gap-2 border-t border-wedding-gold/10 pt-2.5">
                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase">Số tài khoản</span>
                          <span className="font-mono text-base font-bold text-wedding-burgundy block">{acc.accountNumber}</span>
                        </div>
                        <button
                          id={`btn-copy-${acc.id}`}
                          onClick={() => handleCopy(acc.id, acc.accountNumber)}
                          className="px-2.5 py-1 bg-wedding-cream hover:bg-wedding-gold/10 rounded-lg text-[10px] font-sans font-bold text-wedding-gold-dark border border-wedding-gold/20 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === acc.id ? (
                            <>
                              <Check className="w-3 h-3 text-green-600" />
                              <span className="text-green-600">Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Sao chép</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="border-t border-wedding-gold/10 pt-2.5">
                        <span className="text-gray-400 block text-[10px] uppercase">Chủ tài khoản</span>
                        <span className="font-bold text-wedding-charcoal block tracking-wider uppercase">{acc.accountName}</span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-2 border border-wedding-gold/15 rounded-lg shadow-sm">
                      <img
                        src={acc.qrUrl}
                        alt={`QR Code ${acc.title}`}
                        referrerPolicy="no-referrer"
                        className="w-32 h-32 md:w-36 md:h-36 object-contain"
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-sans mt-2 tracking-wider flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-wedding-gold" /> Quét mã để gửi quà mừng
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Note info */}
        <div className="mt-5 p-3.5 bg-amber-50/50 border border-amber-100 rounded-xl flex gap-2.5 items-start">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-800 leading-relaxed font-sans">
            QR code được tích hợp sẵn thông tin chuyển khoản chính xác của cô dâu và chú rể kèm nội dung lời chúc mừng cưới tự động để quý khách thuận tiện sử dụng.
          </p>
        </div>
      </div>
    </div>
  );
}
