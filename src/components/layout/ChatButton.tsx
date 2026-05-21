import { motion } from 'motion/react';
import zaloIcon from '@/assets/Icon_of_Zalo.png';

export default function ChatButton() {
  return (
    <motion.a
      href="https://zalo.me/0368081193"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Zalo"
      className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full bg-[#0068ff] px-4 py-3 text-white shadow-lg shadow-[#0068ff]/30"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[#0068ff]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <img src={zaloIcon} alt="Zalo" width={28} height={28} className="relative z-10" />
      <span className="relative z-10 hidden text-sm font-semibold sm:inline">Chat ngay</span>
    </motion.a>
  );
}
