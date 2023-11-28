import { motion } from 'framer-motion';

export const Blink = ({ children }: { children: JSX.Element }) => (
  <motion.div
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ type: 'spring', damping: 0 }}
  >
    {children}
  </motion.div>
);
