import styled from "styled-components";
import { CircledImage } from "../../atoms";
import { Row, Col } from "react-grid-system";
import { useState, useEffect, useRef } from "react";
import { Button } from "../../molecules";

const DeityInfoContainer = styled.div``;

interface DeityImageHolderProps {
  $height: string;
}

const DeityImageHolder = styled.div<DeityImageHolderProps>`
  border: 2px solid #383838;
  width: 100%;
  height: ${({ $height }) => $height};
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DeityId = styled.span`
  margin-left: 0.5em;
  color: #383838;
  font-weight: 400;
`;

const DeityTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1em;
`;

const DeityMainInfo = styled.h2`
  font-size: 32px;
  font-weight: 800;
  font-style: italic;
`;

const DeitySecondaryInfoSection = styled.div`
  position: absolute;
  bottom: 0;
`;

const DeitySecondaryInfo = styled.h4`
  font-size: 21px;
  margin-top: 0.5em;
`;

const DeityRankHolder = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border: 2px solid #383838;
  background-color: white;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -30px;
  right: 10px;
  color: white;
  border-radius: 1000px;
  font-weight: 700;
  font-style: italic;
  background: ${({ theme }) => theme.primary};
`;

interface DeityInfoProps {}

export const DeityInfo = ({}: DeityInfoProps) => {
  const imageHolderRef = useRef<HTMLDivElement>(null);
  const [imageHolderWidth, setImageHolderWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (imageHolderRef.current) {
        const width = imageHolderRef.current.offsetWidth;
        setImageHolderWidth(width);

        const resizeObserver = new ResizeObserver((entries) => {
          // Loop through the entries
          for (let entry of entries) {
            if (imageHolderRef.current) {
              const width = imageHolderRef.current.offsetWidth;
              setImageHolderWidth(width);
            }

            // Check if width changed
            if (entry.contentRect.width !== entry.contentRect.width) {
              // Width changed, do something
            }
          }
        });

        // Start observing the target element
        resizeObserver.observe(imageHolderRef.current);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const deity = {
    id: 0,
    tier: "s",
    name: "Zeus",
    image:
      "https://artisanally.io/_next/image?url=%2Fdeities%2Fzeus.png&w=256&q=75",
    level: 5,
    xp: 153,
    availableSlots: 2,
    slots: 9,
    fellowships: 18,
    rank: 2,
    harvestableAmount: 121,
  };

  return (
    <DeityInfoContainer>
      <Row>
        <Col md={4}>
          <DeityImageHolder
            ref={imageHolderRef}
            $height={`${imageHolderWidth}px`}
          >
            <img src={deity.image} height="100%" />
            <DeityRankHolder>{deity.rank}</DeityRankHolder>
          </DeityImageHolder>
        </Col>
        <Col md={8}>
          <DeityTopRow>
            <DeityMainInfo>
              {deity.tier.toUpperCase()}. {deity.name}{" "}
              <DeityId>#{deity.id}</DeityId>
            </DeityMainInfo>
            <Button color="primary" variant="contained">
              Withdraw 100 $LYX
            </Button>
          </DeityTopRow>

          <DeitySecondaryInfoSection>
            <DeitySecondaryInfo>Slots: 2/9</DeitySecondaryInfo>
            <DeitySecondaryInfo>XP: 100</DeitySecondaryInfo>
            <DeitySecondaryInfo>Level: 15</DeitySecondaryInfo>
          </DeitySecondaryInfoSection>
        </Col>
      </Row>
    </DeityInfoContainer>
  );
};
