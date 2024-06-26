import styled from "styled-components";
import { useExtention } from "../../hooks/useExtension";
import { Row, Col } from "react-grid-system";
import { ethers } from "ethers";
import { DeityShitCard } from "./DeityShitCard";
import { useState } from "react";

import { Button } from "../../molecules";

const Container = styled.div``;

const ConnectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`;

const TotalSupplySection = styled.p`
  font-weight: 300;
  font-size: 24px;
`;

const HolyShitBalance = styled.p`
  font-weight: 300;
  font-size: 24px;
  margin-bottom: 1em;
`;

const ConnectionButton = styled.div`
  cursor: pointer;
  border: 2px solid black;
  padding: 16px 24px;
  font-size: 20px;
  font-weight: 600;
  transition: 200ms;
  &:hover {
    background-color: #e8e8e8;
  }
`;

const ConnectedWallet = styled.p``;

interface NumberRanges {
  S: Array<number>;
  A: Array<number>;
  B: Array<number>;
  C: Array<number>;
}

function categorizeTokens(numbers: number[]): NumberRanges {
  const ranges: NumberRanges = {
    S: [],
    A: [],
    B: [],
    C: [],
  };

  numbers.forEach((num) => {
    if (num >= 0 && num <= 24) {
      ranges.S.push(num);
    } else if (num >= 25 && num <= 49) {
      ranges.A.push(num);
    } else if (num >= 50 && num <= 74) {
      ranges.B.push(num);
    } else if (num >= 75 && num <= 99) {
      ranges.C.push(num);
    }
  });

  return ranges;
}

export const FarmingSection = () => {
  const [farming, setFarming] = useState<boolean>(false);

  const {
    connectedAccount,
    connect,
    totalShitsSupply,
    userBalances,
    shit,
    batchShit,
    lastShitTime,
    shitBalance,
  } = useExtention();

  const userTokens = categorizeTokens(userBalances);

  const shittableTokens = () => {
    return userBalances.filter((tokenId) => {
      const lst = lastShitTime.get(tokenId);

      const lastShitTimeDate = new Date(Number(lst) * 1000);

      const isCoolDowned =
        Number(new Date()) - Number(lastShitTimeDate) >= 24 * 3600 * 1000;

      return isCoolDowned;
    });
  };

  const totalPossibleShit = () => {
    return (
      shittableTokens()
        .map((tokenId) => Number(tokenId))
        //@ts-ignore
        .reduce((pV: number, cV: number) => {
          if (cV < 25) return pV + 400;
          if (cV < 50) return pV + 300;
          if (cV < 75) return pV + 200;
          if (cV < 100) return pV + 100;
        }, 0)
    );
  };

  return (
    <Container>
      <ConnectionRow>
        <TotalSupplySection>
          Total Minted HolyShits:{" "}
          <b>{ethers.utils.formatEther(totalShitsSupply)}</b>
        </TotalSupplySection>
        {connectedAccount ? (
          <ConnectedWallet>{connectedAccount}</ConnectedWallet>
        ) : (
          <ConnectionButton onClick={connect}>
            Connect to Farm your Shits
          </ConnectionButton>
        )}
      </ConnectionRow>

      {connectedAccount && userBalances.length > 0 ? (
        <Row>
          <Col md={12}>
            <HolyShitBalance>
              You HolyShit Balance:{" "}
              <b>{ethers.utils.formatEther(shitBalance)}</b>
            </HolyShitBalance>
          </Col>
          {userTokens.S.map((token) => (
            <Col md={4} key={token}>
              <DeityShitCard
                image="/deities/ToBeKnown.png"
                tier="S"
                name="ToBeKnown"
                owner={String(token)}
                shitAmount={400}
                lastShitTime={lastShitTime.get(token)}
                onShit={() => shit(token)}
              />
            </Col>
          ))}
          {userTokens.A.map((token) => (
            <Col md={4} key={token}>
              <DeityShitCard
                image="/deities/ToBeKnown.png"
                tier="A"
                name="ToBeKnown"
                owner={String(token)}
                shitAmount={300}
                lastShitTime={lastShitTime.get(token)}
                onShit={() => shit(token)}
              />
            </Col>
          ))}
          {userTokens.B.map((token) => (
            <Col md={4} key={token}>
              <DeityShitCard
                image="/deities/ToBeKnown.png"
                tier="B"
                name="ToBeKnown"
                owner={String(token)}
                shitAmount={200}
                lastShitTime={lastShitTime.get(token)}
                onShit={() => shit(token)}
              />
            </Col>
          ))}
          {userTokens.C.map((token) => (
            <Col md={4} key={token}>
              <DeityShitCard
                image="/deities/ToBeKnown.png"
                tier="C"
                name="ToBeKnown"
                owner={String(token)}
                shitAmount={100}
                lastShitTime={lastShitTime.get(token)}
                onShit={() => shit(token)}
              />
            </Col>
          ))}

          <Col md={12}>
            {totalPossibleShit() > 0 ? (
              <Button
                variant="contained"
                color="primary"
                fullwidth
                onClick={async () => {
                  try {
                    setFarming(true);
                    await batchShit(shittableTokens());
                    setFarming(false);
                  } catch (err) {
                    console.error(err);
                    setFarming(false);
                  }
                }}
              >
                {farming
                  ? "Farming ..."
                  : ` Your Deities can Shit a total ${totalPossibleShit()} $HolyShit.
                Farm now!`}
              </Button>
            ) : (
              <Button href="/" fullwidth>
                All of your deities are resting and can not shit. You can wait
                or mint new deities.
              </Button>
            )}
          </Col>
        </Row>
      ) : userBalances.length > 0 || !connectedAccount ? null : (
        <Row>
          <Col md={12}>
            <Button href="/" fullwidth>
              You don’t have any deity to farm HolyShit. Don’t worry though
              because they are still available. Click to mint.
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};
