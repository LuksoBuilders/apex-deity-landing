import styled from "styled-components";
import { CircledImage } from "../../atoms";
import { UPBasicInfo } from "../../types";
import { Row, Col } from "react-grid-system";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { BackerBuck } from "../../types/remoteTypes";
import { ipfsURLtoNormal } from "../../utils";
import Link from "next/link";

const GET_FELLOWSHIP = gql`
  query Fellowship($fellowshipId: String!) {
    fellowship(id: $fellowshipId) {
      id
      backerBucks {
        id
        amount
        owner {
          id
          profile {
            name
            profileImage {
              url
            }
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;

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

interface BackersListProps {}

function shortenEthereumAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const BackersList = ({}: BackersListProps) => {
  const { query } = useRouter();
  const { error, loading, data } = useQuery(GET_FELLOWSHIP, {
    variables: { fellowshipId: query.id },
  });

  console.log(error, loading, data);

  if (loading || error) {
    return <div></div>;
  }

  const backerBucks: Array<BackerBuck> = data.fellowship.backerBucks;

  console.log(backerBucks);

  const backers = backerBucks
    .map((bucks) => ({
      ...bucks,
      amount: Number(bucks.amount),
    }))
    .sort((a, b) => b.amount - a.amount)
    .filter((bucks) => bucks.amount)
    .map((buck) => {
      return {
        amount: buck.amount,
        name: buck.owner.profile?.name
          ? buck.owner.profile?.name
          : shortenEthereumAddress(buck.owner.id),
        username: "",
        avatar: buck.owner.profile?.profileImage?.[0]?.url
          ? ipfsURLtoNormal(buck.owner.profile?.profileImage?.[0]?.url, 2)
          : "/deities/ToBeKnown.png",
        address: buck.owner.id,
      };
    });

  /* console.log(newBackers);

  const backers: Array<UPBasicInfo> = [
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
  ];*/

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
            <BackingAmount>{amount}</BackingAmount>
          </Col>
        </Row>
      </BackerItemContainer>
    );
  };

  return (
    <BackersListContainer>
      {backers.map((backer, i) => (
        <div key={String(backer.name)}>
          {renderBackerItem(
            backer.avatar,
            String(backer.name),
            backer.address,
            i + 1,
            backer.amount
          )}
        </div>
      ))}
    </BackersListContainer>
  );
};
