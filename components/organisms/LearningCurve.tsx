import { useState } from "react";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import Image from "next/image";
import { motion } from "framer-motion";

import { LearningCurveInfo } from "./LearningCurveInfo";
import LearningCurveNavigator from "./LearningCurveNavigator";
import { LearningCurveData } from "./LearningCurveData";
import { LearningCurveControls } from "./LearningCurveControls";

import {
  WhyContent,
  ArtisanAllyContent,
  FellowshipContent,
  BackerBuckContent,
  EndorsementContent,
  ContributeContent,
  ApexDeitiesContent,
  FeeDistributionContent,
  FoundingSlotsContent,
  VotingPowerContent,
  TimelineContent,
  IncentivesContent,
} from "../molecules";

export const LearningCurve = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  const curve = [
    {
      label: "Why",
      title: "Why ArtisanAlly?",
      content: <WhyContent />,
    },
    {
      label: "Artisan Ally",
      title: "What is ArtisanAlly?",
      content: <ArtisanAllyContent />,
    },
    {
      label: "Fellowship",
      title: "Fellowship, the space for Artisan",
      content: <FellowshipContent />,
    },
    {
      label: "Backer Buck",
      title: "Backer Buck",
      content: <BackerBuckContent />,
    },
    {
      label: "Endorsement",
      title: "Endorsement",
      content: <EndorsementContent />,
    },
    {
      label: "Contribute",
      title: "Contribute",
      content: <ContributeContent />,
    },
    {
      label: "Apex Deities",
      title: "Apex Deities",
      content: <ApexDeitiesContent />,
    },
    {
      label: "Fee Distribution",
      title: "How fee is distributed?",
      content: <FeeDistributionContent />,
    },
    {
      label: "Founding Slots",
      title: "What is Founding Slots?",
      content: <FoundingSlotsContent />,
    },
    {
      label: "Voting Power",
      title: "DAO and the Voting Power",
      content: <VotingPowerContent />,
    },
    {
      label: "Timeline",
      title: "Apex Deities Timeline",
      content: <TimelineContent />,
    },
    {
      label: "Incentives",
      title: "Additional Incentives",
      content: <IncentivesContent />,
    },
  ];

  return (
    <Row id="learn">
      <Col md={12}>
        <LearningCurveInfo />
      </Col>
      <Col md={3}>
        <LearningCurveNavigator
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          items={curve.map((item) => item.label)}
        />
        <div style={{ marginBottom: "3em" }}></div>
        <Image alt="zeus" width={200} height={251} src="/deities/zeus.png" />
      </Col>
      <Col md={9}>
        <div
          style={{
            overflow: "hidden",
            minHeight: 600,
          }}
        >
          {curve.map((item, i) => (
            <motion.div
              animate={{
                y: selectedItem === i ? 0 : selectedItem > i ? -1000 : 1000,
              }}
              transition={{ duration: 0.3 }}
              key={item.label}
              style={
                {
                  width: "100%",
                  height: selectedItem === i ? "auto" : "0px",
                } // Adjust height as needed
              }
            >
              <LearningCurveData title={String(item.title)}>
                {item.content}
              </LearningCurveData>
              <div style={{ marginTop: "4em" }}></div>
              <LearningCurveControls
                nextName={curve[i + 1]?.label}
                backName={curve[i - 1]?.label}
                onNext={() => setSelectedItem(i + 1)}
                onBack={() => setSelectedItem(i - 1)}
              />
            </motion.div>
          ))}
        </div>
      </Col>
    </Row>
  );
};
