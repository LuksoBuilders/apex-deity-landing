import type { NextPage } from "next";
import { Container } from "react-grid-system";
import { motion } from "framer-motion";
import { MainLayout } from "../components/organisms";
import { Spacing } from "../components/atoms";

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

const HolyShit: NextPage = () => {
  return (
    <MainLayout>
      <Spacing spacing="0em"></Spacing>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <div style={{ marginTop: "2em" }}></div>
          <HolyShitInfo />
          <div style={{ marginTop: "2em" }}></div>
          <FarmingSection />
          <div style={{ marginTop: "4em" }}></div>

          <Links />

          <div style={{ marginTop: "4em" }}></div>
        </Container>
      </motion.div>
    </MainLayout>
  );
};

export default HolyShit;
