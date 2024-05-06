import styled from "styled-components";
import { CircledImage } from "../../atoms";
import { UPBasicInfo } from "../../types";
import { Row, Col } from "react-grid-system";

const EndorsersListContainer = styled.div``;

const EndorserItemContainer = styled.div`
  border-bottom: 1px solid #e8e8e8;
  padding: 0.5em;
`;

const EndorserItemRank = styled.h2`
  display: flex;
  align-items: center;
  height: 100%;
`;

const EndorserItemImage = styled(CircledImage)`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

const EndorserName = styled.h3`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

const ContributionAmount = styled.h3`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

interface EndorsersListProps {}

export const EndorsersList = ({}: EndorsersListProps) => {
  const endorsers: Array<UPBasicInfo> = [
    {
      avatar:
        "https://api.universalprofile.cloud/image/bafybeiem5kdrxt3msaej26p5jjqckcvumgctedckgw7l2iexnjhxsebbqi?width=1000",
      name: "Beef",
      username: "@beef#2652",
      address: "0xD4dC66D8f857e901fa79f426da68E43f05223Eda",
    },
    {
      avatar:
        "https://api.universalprofile.cloud/image/bafybeibkqtmld76jprdrrc3mzyyceuxfdevy2lal54ovozp4lu2ra3sv2a?width=1000",
      name: "luksolabrat",
      username: "@luksolabrat#218F",
      address: "0x218F77FC44a3e36aee96438a461F0eb9e590E356",
    },
    {
      avatar:
        "https://api.universalprofile.cloud/image/QmSf9qaPfn1rCN6kzkkeWLRcqQP8m26oXyy9yrVa2iyZhN?width=1000?width=1000",
      name: "Ethalorian",
      username: "@ethalorian#26e7",
      address: "0xD4dC66D8f857e901fa79f426da68E43f05223Eda",
    },
  ];

  const renderEndorserItem = (
    endorser: UPBasicInfo,
    rank: number,
    amount: number
  ) => {
    return (
      <EndorserItemContainer>
        <Row>
          <Col md={3}>
            <EndorserItemRank>{rank}</EndorserItemRank>
          </Col>
          <Col md={3}>
            <EndorserItemImage
              src={endorser.avatar}
              width="50px"
              height="50px"
            />
          </Col>
          <Col md={3}>
            <EndorserName>{endorser.name}</EndorserName>
          </Col>
          <Col md={3}>
            <ContributionAmount>{amount}</ContributionAmount>
          </Col>
        </Row>
      </EndorserItemContainer>
    );
  };

  return (
    <EndorsersListContainer>
      {endorsers.map((endorser, i) => (
        <div key={endorser.name}>
          {renderEndorserItem(endorser, i + 1, 16 - 7 * i)}
        </div>
      ))}
    </EndorsersListContainer>
  );
};
