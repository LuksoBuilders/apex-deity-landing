import styled from "styled-components";
import { CircledImage } from "../../atoms";
import { UPBasicInfo } from "../../types";
import { Row, Col } from "react-grid-system";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { BackerBuck, User } from "../../types/remoteTypes";
import { ipfsURLtoNormal } from "../../utils";
import Link from "next/link";
import { ethers } from "ethers";
import { RedSpan, CenteredDiv } from "../../atoms";
import { BounceLoader } from "react-spinners";

const BackersListContainer = styled.div``;

const BackerItemContainer = styled(Link)`
  display: block;
  border-bottom: 1px solid #e8e8e8;
  padding: 0.5em;
  transition: 200ms;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const BackerItemRank = styled.h2`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 1em;
`;

const BackerItemImage = styled(CircledImage)`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

const BackerName = styled.h3`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

const BackingAmount = styled.h3`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`;

function shortenEthereumAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

interface HighStatusProps {
  backerBucks: Array<BackerBuck>;
}

export const HighStatus = ({ backerBucks }: HighStatusProps) => {
  const { query } = useRouter();

  if (!backerBucks)
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );

  const leaderboard = backerBucks.map((backerBuck) => ({
    user: backerBuck.owner,
    points: Number(backerBuck.amount) + 5 * Number(backerBuck.contributions),
    name: backerBuck.owner.profile?.name
      ? backerBuck.owner.profile?.name
      : shortenEthereumAddress(backerBuck.owner.id),
    username: "",
    avatar: backerBuck.owner.profile?.profileImage?.[0]?.url
      ? ipfsURLtoNormal(backerBuck.owner.profile?.profileImage?.[0]?.url, 2)
      : "/deities/ToBeKnown.png",
    address: backerBuck.owner.id,
  }));

  const renderBackerItem = (
    avatar: string,
    name: string,
    address: string,
    rank: number,
    amount: number
  ) => {
    return (
      <BackerItemContainer href={`/user/${address}`}>
        <Row>
          <Col md={3}>
            <BackerItemRank>{rank}</BackerItemRank>
          </Col>
          <Col md={3}>
            <BackerItemImage src={avatar} width="50px" height="50px" />
          </Col>
          <Col md={3}>
            <BackerName>{name}</BackerName>
          </Col>
          <Col md={3}>
            <BackingAmount>
              <RedSpan>{amount} </RedSpan>
            </BackingAmount>
          </Col>
        </Row>
      </BackerItemContainer>
    );
  };

  return (
    <BackersListContainer>
      {leaderboard.map((item, i) => (
        <div key={String(item.name)}>
          {renderBackerItem(
            item.avatar,
            String(item.name),
            item.address,
            i + 1,
            item.points
          )}
        </div>
      ))}
    </BackersListContainer>
  );
};
