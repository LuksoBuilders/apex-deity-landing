import styled from "styled-components";
import { Button } from "../../molecules";

const BackerBuckPanelContainer = styled.div`
  border: 1px solid #e8e8e8;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoCol = styled.div``;

const Info = styled.h3`
  font-weight: 400;
  font-size: 18px;
  padding: 1em;
`;

const InfoDivider = styled.div`
  border-bottom: 1px solid #e8e8e8;
`;

const Red = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const Minter = styled.div`
  display: flex;
  padding: 0.5em 1em;
`;

const SelectorButton = styled.div`
  border: 2px solid black;
  width: 27px;
  height: 27px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  transition: 2ms;
  &:hover {
    background-color: #e8e8e8;
  }
`;

const SelectorValue = styled.div`
  min-width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
`;

const MintSelector = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1em;
`;

const ActionsList = styled.div`
  display: flex;
  padding: 0.5em 1em;
`;

interface BackerBuckPanelProps {}

export const BackerBuckPanel = ({}: BackerBuckPanelProps) => {
  return (
    <BackerBuckPanelContainer>
      <InfoRow>
        <InfoCol>
          <Info>
            Total Supply: <Red>10 $ALY</Red>
          </Info>
        </InfoCol>
        <InfoCol>
          <Info>
            Current Mint Price: <Red>10 $LYX</Red>
          </Info>
        </InfoCol>
      </InfoRow>
      <InfoDivider />
      <InfoRow>
        <InfoCol>
          <Info>
            Your Balance: <Red>5 $ALY</Red>
          </Info>
        </InfoCol>
        <InfoCol>
          <Minter>
            <MintSelector>
              <SelectorButton>-</SelectorButton>
              <SelectorValue>10</SelectorValue>
              <SelectorButton>+</SelectorButton>
            </MintSelector>
            <Button disabled variant="contained" color="primary">
              Mint for {24.2} $LYX
            </Button>
          </Minter>
        </InfoCol>
      </InfoRow>
      <InfoDivider />
      <InfoRow>
        <InfoCol>
          <Info>
            Your Contributions: <Red>3 $ALY</Red>
          </Info>
        </InfoCol>
        <InfoCol>
          <ActionsList>
            <Button variant="outlined" color="black">
              Purify
            </Button>
            <Button variant="contained" color="black">
              Contribute
            </Button>
          </ActionsList>
        </InfoCol>
      </InfoRow>
      <InfoDivider />
      <InfoRow>
        <InfoCol>
          <Info>
            Your Endorsements: <Red>10 $ALY</Red>
          </Info>
        </InfoCol>
        <InfoCol>
          <ActionsList>
            <Button variant="outlined" color="black">
              Revoke
            </Button>
            <Button variant="contained" color="black">
              Endorse
            </Button>
          </ActionsList>
        </InfoCol>
      </InfoRow>
      <InfoDivider />
      <InfoRow>
        <InfoCol>
          <Info>
            Secondary Market <Red>(SOON)</Red>
          </Info>
        </InfoCol>
        <InfoCol>
          <ActionsList>
            <Button disabled variant="outlined" color="black">
              Sell
            </Button>
            <Button disabled variant="contained" color="black">
              Buy
            </Button>
          </ActionsList>
        </InfoCol>
      </InfoRow>
    </BackerBuckPanelContainer>
  );
};
