import styled from "styled-components";
import { Title } from "../atoms";
import Image from "next/image";
import { Button } from "../molecules";

import { Row, Col } from "react-grid-system";

import { CountDown } from "./CountDown";

import { useExtention } from "../hooks/useExtension";

const Paragraph = styled.p`
  font-weight: 300;
  font-size: 36px;
  color: #222;
  margin-bottom: 2em;
  margin-top: 0em;
`;

function numberToBytes32(num: number): string {
  // Convert the number to hexadecimal string
  const hex = num.toString(16);

  // Pad the hexadecimal string with leading zeros to ensure it has an even length
  const paddedHex = hex.length % 2 === 0 ? hex : "0" + hex;

  // Convert the padded hexadecimal string to bytes32
  const bytes32 = "0x" + paddedHex.padStart(64, "0");

  return bytes32;
}

export const Minting = () => {
  const {
    isConnected,
    connectedAccount,
    connect,
    userBalances,
    availableBalances,
  } = useExtention();

  console.log(isConnected, connectedAccount, userBalances, availableBalances);

  console.log(numberToBytes32(2));

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
            <Paragraph>Minting will start soon, Fasten your belts:</Paragraph>
          </div>
          <CountDown />

          <div>
            <Button onClick={connect}>Connect</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
