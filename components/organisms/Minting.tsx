import styled from "styled-components";
import { Title } from "../atoms";
import Image from "next/image";

import { Row, Col } from "react-grid-system";

const Paragraph = styled.p`
  font-weight: 300;
  font-size: 19px;
  color: #222;
  margin-bottom: 3em;
  margin-top: 3em;
`;

const SocialLink = styled.a`
  border: 2px solid black;
  height: 90px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  //padding: 1em;
  margin-right: 1em;
`;

const LinksContainer = styled.div`
  display: flex;
`;

export const Minting = () => {
  return (
    <div>
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
          <Paragraph>
            Minting haven’t started yet but it will start soon. Subscribe to our
            discord or twitter to get notified.
          </Paragraph>
          <LinksContainer>
            <SocialLink
              href="https://twitter.com/LukstaOnLukso"
              target="_blank"
            >
              <Image
                width={60}
                height={60}
                unoptimized={true}
                alt={"erato"}
                src={"/icons/twitter-icon.png"}
              />
            </SocialLink>
            <SocialLink href="https://discord.gg/cxKpYV6e" target="_blank">
              <Image
                width={60}
                height={60}
                unoptimized={true}
                alt={"erato"}
                src={"/icons/discord-icon.png"}
              />
            </SocialLink>
          </LinksContainer>
        </Col>
      </Row>
    </div>
  );
};
