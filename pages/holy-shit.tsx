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
  HolyShitInfo,
  FarmingSection,
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
        <div style={{ marginTop: "2em" }}></div>
        <HolyShitInfo />
        <div style={{ marginTop: "2em" }}></div>
        <FarmingSection />
        <div style={{ marginTop: "4em" }}></div>

        <Links />

        <div style={{ marginTop: "4em" }}></div>
      </Container>
    </motion.div>
  );
};

export default Home;
