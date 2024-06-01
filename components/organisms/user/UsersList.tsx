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

interface UsersListProps {
  users: Array<User>;
}

export const UsersList = ({ users }: UsersListProps) => {
  const { query } = useRouter();

  if (!users)
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );

  const backers = users
    .map((user) => ({
      ...user,
      worth: user.backerBucks.reduce((pV: ethers.BigNumber, cV) => {
        return pV.add(
          ethers.BigNumber.from(cV.amount).mul(
            ethers.BigNumber.from(cV.fellowship.currentPrice)
          )
        );
      }, ethers.BigNumber.from("0")),
    }))
    .filter((user) => user.worth.gt(0))
    .sort((a, b) => {
      const aA = Number(Number(ethers.utils.formatEther(a.worth)).toFixed(3));
      const bB = Number(Number(ethers.utils.formatEther(b.worth)).toFixed(3));
      return bB - aA;
    })
    .map((user) => {
      return {
        amount: Number(Number(ethers.utils.formatEther(user.worth)).toFixed(1)),
        name: user.profile?.name
          ? user.profile?.name
          : shortenEthereumAddress(user.id),
        username: "",
        avatar: user.profile?.profileImage?.[0]?.url
          ? ipfsURLtoNormal(user.profile?.profileImage?.[0]?.url, 2)
          : "/deities/ToBeKnown.png",
        address: user.id,
      };
    });

  console.log(
    users
      .map((user) => ({
        ...user,
        worth: user.backerBucks.reduce((pV: ethers.BigNumber, cV) => {
          return pV.add(
            ethers.BigNumber.from(cV.amount).mul(
              ethers.BigNumber.from(cV.fellowship.currentPrice)
            )
          );
        }, ethers.BigNumber.from("0")),
      }))
      .find((user) => user.id === "0xe0c0084a7d1e8aa4d12c418118e2b4492268c8fe")
  );

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
            <BackingAmount>
              <RedSpan>{amount} $LYX</RedSpan>
            </BackingAmount>
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
