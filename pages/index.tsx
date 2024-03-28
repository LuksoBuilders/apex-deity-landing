import type { NextPage } from "next";
import { Container } from "react-grid-system";

import {
  Hero,
  LearningCurve,
  CompareTable,
  Minting,
} from "../components/organisms";

const Home: NextPage = () => {
  return (
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
  );
};

export default Home;
