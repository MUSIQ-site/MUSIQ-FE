import { motion } from 'framer-motion';

const bottomUpVatiants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 2,
      bounce: 0.2,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const sequencyVariants = {
  start: {
    opacity: 0,
    y: 20,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export const FadeInFromBottom = ({ children }: { children: JSX.Element[] }) => (
  <motion.div variants={bottomUpVatiants} initial="start" animate="end">
    {children.map((item: JSX.Element) => (
      <motion.div variants={sequencyVariants} key={item.type}>
        {item}
      </motion.div>
    ))}
  </motion.div>
);
