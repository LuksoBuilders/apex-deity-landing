import { useState, useEffect } from "react";
import { ethers } from "ethers";

import styled from "styled-components";
import { Title } from "../atoms";
import Image from "next/image";
import { Button } from "../molecules";

import { Row, Col } from "react-grid-system";

import { CountDown } from "./CountDown";
import { MintSelector, CountDownBox } from "../molecules";

import { useExtension } from "../hooks/useExtension";
import { bytes32ToNumber, categorizeTokens, numberToBytes32 } from "../utils/helpers";

const Paragraph = styled.p`
  font-weight: 300;
  font-size: 36px;
  color: #222;
  margin-bottom: 2em;
  margin-top: 0em;
`;

const MintSelectorContainer = styled.div`
  margin-bottom: 0.5em;
`;

const ConnectButton = styled.div`
  height: 80px;
  border: 2px solid black;
  background-color: #191919;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  transition: 200ms;
  cursor: pointer;
  font-size: 24px;
  &:hover {
    background-color: #393939;
  }
`;

const MintButton = styled.div`
  height: 80px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  transition: 200ms;
  cursor: pointer;
  font-size: 24px;
  &:hover {
    background-color: #c81f49;
  }
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0.5em;
`;

const BalanceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
`;

export const Minting = () => {
  const [sTierAmount, setSTierAmount] = useState(0);
  const [aTierAmount, setATierAmount] = useState(0);
  const [bTierAmount, setBTierAmount] = useState(0);
  const [cTierAmount, setCTierAmount] = useState(0);
  const [minting, setMinting] = useState(false);

  const resetAmounts = () => {
    setSTierAmount(0);
    setATierAmount(0);
    setBTierAmount(0);
    setCTierAmount(0);
  };

  const one = numberToBytes32(1);
  console.log(one);
  console.log(bytes32ToNumber(one));

  const {
    isConnected,
    connectedAccount,
    connect,
    userBalances,
    availableBalances,
    mint,
  } = useExtension();

  const basePrice = ethers.utils.parseEther("1"); //ethers.utils.parseEther("0.0001");

  const totalAmount = sTierAmount + aTierAmount + bTierAmount + cTierAmount;

  const totalPrice = basePrice.mul(
    sTierAmount * 100 + aTierAmount * 75 + bTierAmount * 50 + cTierAmount * 25
  );

  const totalPriceFormatted = ethers.utils.formatEther(totalPrice);

  const userTrueBalances = categorizeTokens(userBalances);

  return (
    <div id="mint">
      <Title>Minting</Title>
      <div style={{ marginTop: "3em" }}></div>
      <Row>
        <Col md={4}>
          <Image
            style={{ marginTop: "0px" }}
            width={300}
            height={461}
            unoptimized={true}
            alt={"erato"}
            src={"/deities/athena.png"}
          />
        </Col>
        <Col md={8}>
          <div>
            {connectedAccount && (
              <div>
                <UserRow>
                  <div>Your Balances:</div>
                  <div>{connectedAccount}</div>
                </UserRow>
                <BalanceRow>
                  <CountDownBox amount={userTrueBalances.S} identifier="S" />
                  <CountDownBox amount={userTrueBalances.A} identifier="A" />
                  <CountDownBox amount={userTrueBalances.B} identifier="B" />
                  <CountDownBox amount={userTrueBalances.C} identifier="C" />
                </BalanceRow>
              </div>
            )}

            <MintSelectorContainer>
              <MintSelector
                tier="S"
                available={availableBalances[0]}
                value={sTierAmount}
                setValue={setSTierAmount}
              />
            </MintSelectorContainer>
            <MintSelectorContainer>
              <MintSelector
                tier="A"
                available={availableBalances[1]}
                value={aTierAmount}
                setValue={setATierAmount}
              />
            </MintSelectorContainer>
            <MintSelectorContainer>
              <MintSelector
                tier="B"
                available={availableBalances[2]}
                value={bTierAmount}
                setValue={setBTierAmount}
              />
            </MintSelectorContainer>
            <MintSelectorContainer>
              <MintSelector
                tier="C"
                available={availableBalances[3]}
                value={cTierAmount}
                setValue={setCTierAmount}
              />
            </MintSelectorContainer>
          </div>

          <div>
            {!connectedAccount ? (
              <ConnectButton onClick={connect}>
                Connect your UP to Start Minting
              </ConnectButton>
            ) : (
              <MintButton
                onClick={async () => {
                  if (totalAmount > 0 && !minting) {
                    setMinting(true);
                    await mint(
                      [sTierAmount, aTierAmount, bTierAmount, cTierAmount],
                      totalPrice
                    );
                    resetAmounts();
                    setMinting(false);
                  }
                }}
              >
                {minting
                  ? `Minting ...`
                  : `Mint ${totalAmount} Deity for ${totalPriceFormatted} $LYX`}
              </MintButton>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
