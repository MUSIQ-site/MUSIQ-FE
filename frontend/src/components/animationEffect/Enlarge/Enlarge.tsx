import { motion } from 'framer-motion';
import styled from 'styled-components';

const EnlargeConatiner = styled(motion.div)`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
  transition: all 0.1ms;
  /* position: relative; */

  &:hover {
    filter: brightness(95%);
    cursor: pointer;
  }
`;

export const Enlarge = ({ children }: { children: JSX.Element }) => (
  <EnlargeConatiner
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 1 }}
    transition={{ duration: 0.05 }}
  >
    {children}
  </EnlargeConatiner>
);
