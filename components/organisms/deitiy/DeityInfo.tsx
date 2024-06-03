import styled from "styled-components";
import { RedSpan } from "../../atoms";
import { Row, Col } from "react-grid-system";
import { useState, useEffect, useRef } from "react";
import { Button } from "../../molecules";
import { Deity } from "../../types/remoteTypes";
import { ipfsURLtoNormal, isWeekSinceUsed } from "../../utils";
import { ethers } from "ethers";
import Link from "next/link";
import { useExtention } from "../../hooks/useExtension";
import { useApolloClient } from "@apollo/client";

const DeityInfoContainer = styled.div``;

interface DeityImageHolderProps {
  $height: string;
}

const DeityMain = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

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
  font-size: 28px;
  font-weight: 800;
  font-style: italic;
`;

const DeitySecondRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeitySecondaryInfoSection = styled.div`
  //position: absolute;
  //bottom: 0;
`;

const DeitySecondaryInfo = styled.h4`
  font-size: 21px;
  margin-top: 0.5em;
  font-weight: 400;
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

const DeityStories = styled.div`
  margin-top: 3em;
`;

const DeityParagraph = styled.p`
  margin-top: 1em;
  font-size: 1.1em;
`;

const ActorCard = styled(Link)`
  border: 1px solid #e8e8e8;
  display: inline-block;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    border: 1px solid #a8a8a8;
  }
`;

const ActorImageHolder = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  padding: 0.5em;

  border-bottom: 1px solid #e8e8e8;
`;

const ActorImage = styled.img`
  height: 100%;
`;

const ActorInfoContainer = styled.div`
  padding: 0.25em 0.5em;
`;

const ActorTitle = styled.h5`
  font-size: 15px;
  font-weight: 300;
`;

const ActorName = styled.h6`
  font-size: 15px;
`;

interface DeityInfoProps {
  deity: Deity;
}

export const DeityInfo = ({ deity }: DeityInfoProps) => {
  const { connectedAccount, harvestDeity } = useExtention();
  const client = useApolloClient();

  const [harvesting, setHarvesting] = useState(false);
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

  console.log(deity);

  const isAnythingToWithdraw = ethers.utils
    .parseEther(deity.withdrawable)
    .gt(0);

  console.log(isAnythingToWithdraw);

  const availableSlots = deity.slots
    .map((slot) => new Date(Number(slot.usedAt) * 1000))
    .map((usedAts) => isWeekSinceUsed(usedAts))
    .filter((isAWeekAfter) => isAWeekAfter);

  return (
    <DeityInfoContainer>
      <Row>
        <Col md={4}>
          <DeityImageHolder
            ref={imageHolderRef}
            $height={`${imageHolderWidth}px`}
          >
            <img
              src={ipfsURLtoNormal(deity.metadata.images[0]?.[0].url, 0)}
              height="100%"
            />
            <DeityRankHolder>?</DeityRankHolder>
          </DeityImageHolder>
        </Col>
        <Col md={8}>
          <DeityMain>
            <DeityTopRow>
              <DeityMainInfo>
                {deity.tier.toUpperCase()}. {deity.metadata.name}{" "}
                <DeityId>#{deity.tokenIdNumber}</DeityId>
              </DeityMainInfo>
              {connectedAccount.toLowerCase() ===
              deity.owner.id.toLowerCase() ? (
                <Button
                  disabled={
                    harvesting ||
                    ethers.utils.parseEther(deity.withdrawable).eq(0)
                  }
                  onClick={async () => {
                    try {
                      setHarvesting(true);
                      await harvestDeity(Number(deity.tokenIdNumber));
                      client.resetStore();
                      setHarvesting(false);
                    } catch (err) {
                      setHarvesting(false);
                    }
                  }}
                  color="primary"
                  variant="contained"
                >
                  {harvesting
                    ? "Harvesting ..."
                    : `Harvest 
                  ${Number(
                    ethers.utils.formatEther(deity.withdrawable)
                  ).toFixed(3)} 
                  $LYX`}
                </Button>
              ) : null}
            </DeityTopRow>

            <DeitySecondRow>
              <DeitySecondaryInfoSection>
                <DeitySecondaryInfo>
                  Mythology: <RedSpan>{deity.metadata.mythology}</RedSpan>
                </DeitySecondaryInfo>
                <DeitySecondaryInfo>
                  Slots:{" "}
                  <RedSpan>
                    {availableSlots.length}/{deity.slots.length}
                  </RedSpan>
                </DeitySecondaryInfo>
                <DeitySecondaryInfo>
                  XP: <RedSpan>{deity.xp}</RedSpan>
                </DeitySecondaryInfo>
                <DeitySecondaryInfo>
                  Level: <RedSpan>{deity.level}</RedSpan>
                </DeitySecondaryInfo>
              </DeitySecondaryInfoSection>

              <ActorCard href={`/user/${deity.owner.id}`}>
                <ActorImageHolder>
                  <ActorImage
                    src={
                      deity.owner?.profile.profileImage?.[0].url
                        ? ipfsURLtoNormal(
                            deity.owner?.profile.profileImage?.[0].url
                          )
                        : ""
                    }
                  />
                </ActorImageHolder>
                <ActorInfoContainer>
                  <ActorTitle>Owner</ActorTitle>
                  <ActorName>{deity.owner.profile.name}</ActorName>
                </ActorInfoContainer>
              </ActorCard>
            </DeitySecondRow>
          </DeityMain>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <DeityStories>
            <DeityParagraph>{deity.metadata.description}</DeityParagraph>
            <DeityParagraph>{deity.metadata.story}</DeityParagraph>
          </DeityStories>
        </Col>
      </Row>
    </DeityInfoContainer>
  );
};
