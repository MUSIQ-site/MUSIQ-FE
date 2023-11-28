import { motion, AnimatePresence } from 'framer-motion';

const pageEffect = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export const MoveRightPage = ({ children }: { children: JSX.Element }) => (
  <AnimatePresence>
    <motion.div
      variants={pageEffect}
      initial="initial"
      animate="in"
      exit="out"
      transition={{ type: 'spring', duration: 0.5 }}
    />
  </AnimatePresence>
);
