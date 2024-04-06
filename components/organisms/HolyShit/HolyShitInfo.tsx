import styled from "styled-components";
import { Row, Col } from "react-grid-system";
import Image from "next/image";

const Title = styled.h2`
  margin-bottom: 24px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 16px;
`;

const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Important = styled.b`
  font-weight: 600;
`;

export const HolyShitInfo = () => {
  return (
    <div>
      <Row>
        <Col md={6}>
          <Title>$HolyShit</Title>
          <Paragraph>
            Since memecoins are trendy, we decided to create our own meme coin
            within the system. It&apos;`s actually a shitcoin—literally.
            It&apos;`s called
            <Important> $HolyShit </Important> and can be created by deities if
            you have one.
          </Paragraph>

          <Paragraph>
            Each deity based on their class can create{" "}
            <Important>S-&gt;400</Important>,<Important>A-&gt;300</Important>,{" "}
            <Important>B-&gt;200</Important>, <Important>C-&gt;100</Important>{" "}
            $HolyShit <Important>per day</Important>. After you farmed your holy
            shits, your deities will going to rest for a day so they can get
            shit more tomorrow.
          </Paragraph>

          <Paragraph>
            After the $HolyShit supply exceeds <Important>1 million</Important>,
            no farming will be available. This will give those who have minted
            their ApexDeities earlier an advantage to farm more.
          </Paragraph>

          <Paragraph>
            $HolyShit can be used to <Important>purify</Important> burned
            BackerBucks. If you sacrifice 100 $HolyShit for a burned BackerBuck
            you can get that BackerBuck back. It&apos;s useful when you burned a
            BB earlier but then it value increased a lot. Since only 1 mil
            $Holyshit can ever exist{" "}
            <Important>only 10,000 BackerBuck can ever be purified</Important>.
          </Paragraph>
        </Col>
        <Col md={6}>
          <ImageContainer>
            <Image
              src="/HolyShit.png"
              width={320}
              height={320}
              alt="holy shit icon"
            />
          </ImageContainer>
        </Col>
      </Row>
    </div>
  );
};
