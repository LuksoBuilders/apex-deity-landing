import type { NextPage } from "next";
import { Container } from "react-grid-system";
import { motion } from "framer-motion";

import {
  Header,
  Hero,
  LearningCurve,
  CompareTable,
  Minting,
  Links,
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
        <Hero />

        <div style={{ marginTop: "2em" }}></div>

        <Minting />

        <div style={{ marginTop: "4em" }}></div>

        <CompareTable />

        <div style={{ marginTop: "4em" }}></div>
        <LearningCurve />

        <Links />

        <div style={{ marginTop: "4em" }}></div>
      </Container>
    </motion.div>
  );
};

export default Home;
