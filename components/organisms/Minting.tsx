import styled from "styled-components";
import { Title } from "../atoms";
import Image from "next/image";
import dynamic from "next/dynamic";

import { Row, Col } from "react-grid-system";

import { CountDown } from "./CountDown";

const Paragraph = styled.p`
  font-weight: 300;
  font-size: 36px;
  color: #222;
  margin-bottom: 2em;
  margin-top: 0em;
`;

export const Minting = () => {
  return (
    <div id="mint">
      <Title>Minting</Title>
      <div style={{ marginTop: "3em" }}></div>
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={461}
            unoptimized={true}
            alt={"erato"}
            src={"/deities/athena.png"}
          />
        </Col>
        <Col md={8}>
          <div>
            <Paragraph>Minting will start soon, fasten your belts:</Paragraph>
          </div>
          <CountDown //@ts-ignore
          />
        </Col>
      </Row>
    </div>
  );
};
