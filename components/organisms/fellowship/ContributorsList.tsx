import styled from "styled-components";
import { CircledImage } from "../../atoms";
import { UPBasicInfo } from "../../types";
import { Row, Col } from "react-grid-system";

const ContributorsListContainer = styled.div``;

const ContributorItemContainer = styled.div`
  border-bottom: 1px solid #e8e8e8;
  padding: 0.5em;
`;

const ContributorItemRank = styled.h2`
  display: flex;
  align-items: center;
  height: 100%;
`;

const ContributorItemImage = styled(CircledImage)`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

const ContributorName = styled.h3`
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

interface ContributorsListProps {}

export const ContributorsList = ({}: ContributorsListProps) => {
  const contributors: Array<UPBasicInfo> = [
    {
      avatar:
        "https://api.universalprofile.cloud/image/QmSf9qaPfn1rCN6kzkkeWLRcqQP8m26oXyy9yrVa2iyZhN?width=1000?width=1000",
      name: "Ethalorian",
      username: "@ethalorian#26e7",
      address: "0xD4dC66D8f857e901fa79f426da68E43f05223Eda",
    },
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
  ];

  const renderContributorItem = (
    contributor: UPBasicInfo,
    rank: number,
    amount: number
  ) => {
    return (
      <ContributorItemContainer>
        <Row>
          <Col md={3}>
            <ContributorItemRank>{rank}</ContributorItemRank>
          </Col>
          <Col md={3}>
            <ContributorItemImage
              src={contributor.avatar}
              width="50px"
              height="50px"
            />
          </Col>
          <Col md={3}>
            <ContributorName>{contributor.name}</ContributorName>
          </Col>
          <Col md={3}>
            <ContributionAmount>{amount}</ContributionAmount>
          </Col>
        </Row>
      </ContributorItemContainer>
    );
  };

  return (
    <ContributorsListContainer>
      {contributors.map((contributor, i) => (
        <div key={contributor.name}>
          {renderContributorItem(contributor, i + 1, 16 - 7 * i)}
        </div>
      ))}
    </ContributorsListContainer>
  );
};
