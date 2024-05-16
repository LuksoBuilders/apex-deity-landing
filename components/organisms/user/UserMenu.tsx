import { useState } from "react";
import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { Spacing, CenteredDiv } from "../../atoms";
import { Button, SidebarList } from "../../molecules";
import { UserUPBasicInfo } from "./UserUPBasicInfo";
import { useDeities } from "../../hooks/useDeities";
import { useQuery, gql } from "@apollo/client";
import { useExtention } from "../../hooks/useExtension";
import {
  Deity,
  Slot,
  Fellowship,
  User,
  BackerBuck,
} from "../../types/remoteTypes";

import { UserDeitiesSidebarMenu } from "./UserDeitiesSidebarMenu";
import { UserFellowshipsSidebarMenu } from "./UserFellowshipsSidebarMenu";
import { UserBackerBucksSidebarMenu } from "./UsersBackerBucksSidebarMenu";

const GET_DEITIES = gql`
  query userDeities($userAddress: String!) {
    userDeities(userAddress: $userAddress) {
      id
      level
      metadata {
        assets {
          fileType
          url
          verificationData
          verificationFunction
        }
        attributes {
          key
          type
          value
        }
        description
        images {
          height
          url
          verificationData
          verificationFunction
          width
        }
        links {
          title
          url
        }
        mythology
        name
        story
      }
      owner {
        id
      }
      portfolio {
        id
      }
      slots {
        id
        index
        usedAt
      }
      tier
      tokenIdNumber
      withdrawable
      xp
    }
  }
`;

const GET_FELLOWSHIPS = gql`
  query userFellowships($userAddress: String!) {
    userFellowships(userAddress: $userAddress) {
      address
      name
      symbol
      metadata
      info {
        assets {
          url
        }
        attributes {
          key
          type
          value
        }
        description
        images {
          url
        }
        links {
          title
          url
        }
      }
      artisan {
        id
      }
      founder {
        id
        tier
        metadata {
          name
        }
      }
      currentPrice
      initialPrice
      priceGrowth
      totalSupply
    }
  }
`;

const GET_USER = gql`
  query User($userAddress: String!) {
    user(userAddress: $userAddress) {
      id
      backerBucks {
        id
        fellowship {
          id
          name
          symbol
          metadata
          info {
            images {
              url
            }
          }
          currentPrice
        }
        owner {
          id
        }
        amount
      }
    }
  }
`;
const UserMenuContainer = styled.div`
  width: 100%;
  //position: relative;
  //top: 0px;
  //background-color: green;
`;

const ConnectedMenuContainer = styled.div`
  //height: 1000px;
  //position: absolute;
  //background-color: red;
`;

interface ConnectedMenuProps {
  userAddress: string;
}

export const ConnectedMenu = ({ userAddress }: ConnectedMenuProps) => {
  const UserDeities = useQuery(GET_DEITIES, {
    variables: {
      userAddress: userAddress,
    },
  });

  const UserFellowships = useQuery(GET_FELLOWSHIPS, {
    variables: {
      userAddress: userAddress,
    },
  });

  const UserQuery = useQuery(GET_USER, {
    variables: {
      userAddress: userAddress,
    },
  });

  if (!UserDeities.data || !UserFellowships.data || !UserQuery.data)
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );

  const deities: Array<Deity> = UserDeities.data?.userDeities;
  const availableSlots = deities.reduce((pV, deity) => {
    return (
      pV +
      deity.slots.filter(
        (slot) =>
          Number(slot.usedAt) * 1000 < Number(new Date()) - 7 * 24 * 3600 * 1000
      ).length
    );
  }, 0);
  const fellowships: Array<Fellowship> = UserFellowships.data.userFellowships;

  const user: User = UserQuery.data.user;

  console.log(user);

  return (
    <ConnectedMenuContainer>
      <UserUPBasicInfo userAddress={userAddress} />
      <Spacing spacing="3em" />
      <UserFellowshipsSidebarMenu fellowships={fellowships} />
      <Spacing spacing="3em" />

      <UserBackerBucksSidebarMenu backerBucks={user.backerBucks} />
      <Spacing spacing="3em" />
      <UserDeitiesSidebarMenu deities={deities} />
      {[deities].length > 0 ? (
        <Button
          disabled={availableSlots === 0}
          href="/found"
          fullwidth
          variant="contained"
          color="black"
        >
          Found Fellowship {availableSlots > 0 ? `(${availableSlots})` : ""}
        </Button>
      ) : null}
    </ConnectedMenuContainer>
  );
};

export const UserMenu = () => {
  //const deities = useDeities([0, 78]);

  const { connectedAccount, connect } = useExtention();
  const [connected, setIsConnected] = useState(false);

  //const loading = deities.loading;

  const userAddress = "";

  const availableSlots = 5; /*Object.values(deities.data).reduce((pV, cV) => {
    return pV + cV.availableSlots;
  }, 0);*/

  return (
    <UserMenuContainer>
      {connectedAccount ? (
        <ConnectedMenu userAddress={connectedAccount} />
      ) : (
        <div>
          <Button
            onClick={() => connect()}
            color="black"
            variant="contained"
            fullwidth
          >
            Connect
          </Button>
        </div>
      )}
    </UserMenuContainer>
  );
};
