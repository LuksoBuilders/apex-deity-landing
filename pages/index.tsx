import type { NextPage } from "next";
import { Container } from "react-grid-system";
import { motion } from "framer-motion";

import {
  Hero,
  LearningCurve,
  CompareTable,
  Minting,
} from "../components/organisms";

const Home: NextPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Hero />

        <div style={{ marginTop: "2em" }}></div>
        <LearningCurve />

        <div style={{ marginTop: "2em" }}></div>

        <CompareTable />

        <div style={{ marginTop: "4em" }}></div>

        <Minting />

        <div style={{ marginTop: "4em" }}></div>
      </Container>
    </motion.div>
  );
};

export default Home;
