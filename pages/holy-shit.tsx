import type { NextPage } from "next";
import { Container } from "react-grid-system";
import { motion } from "framer-motion";

import {
  Hero,
  LearningCurve,
  CompareTable,
  Minting,
  Links,
  Header,
} from "../components/organisms";

const Home: NextPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Header />
      </Container>
    </motion.div>
  );
};

export default Home;
