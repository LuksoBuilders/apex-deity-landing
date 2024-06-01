import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import { motion } from "framer-motion";

import { HeroCards } from "./HeroCards";
import { HeroInfo } from "./HeroInfo";
import { Metrics } from "./general";

const HeroContainer = styled.div`
  margin-top: 100px;
  padding-bottom: 50px;
`;

const HeroCardsContainer = styled.div`
  text-align: center;
`;

export const Hero = () => {
  return (
    <div>
      <HeroContainer>
        <Row>
          <Col md={6}>
            <HeroInfo />
          </Col>
          <Col md={6}>
            <HeroCardsContainer>
              <div>
                <HeroCards />
              </div>
            </HeroCardsContainer>
          </Col>
        </Row>
        <Metrics />
      </HeroContainer>
    </div>
  );
};
