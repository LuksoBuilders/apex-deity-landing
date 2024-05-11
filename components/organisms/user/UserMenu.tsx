import { useState } from "react";
import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { Spacing, CenteredDiv } from "../../atoms";
import { Button, SidebarList } from "../../molecules";
import { UserUPBasicInfo } from "./UserUPBasicInfo";
import { UserDeitiesSidebarMenu } from "./UserDeitiesSidebarMenu";
import { UserFellowshipsSidebarMenu } from "./UserFellowshipsSidebarMenu";
import { useDeities } from "../../hooks/useDeities";
import { useQuery, gql } from "@apollo/client";
import { useExtention } from "../../hooks/useExtension";
import { Deity, Slot } from "../../types/remoteTypes";

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
  const { data, loading, error } = useQuery(GET_DEITIES, {
    variables: {
      userAddress: "0x117e85ba40b00bf6647f60ebd023992932e2acb6",
    },
  });

  if (loading)
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );

  const deities: Array<Deity> = data.userDeities;
  const availableSlots = deities.reduce((pV, deity) => {
    return (
      pV +
      deity.slots.filter(
        (slot) =>
          Number(slot.usedAt) * 1000 < Number(new Date()) - 7 * 24 * 1000
      ).length
    );
  }, 0);

  return (
    <ConnectedMenuContainer>
      <UserUPBasicInfo userAddress={userAddress} />
      <Spacing spacing="3em" />
      <UserFellowshipsSidebarMenu />
      <Spacing spacing="3em" />
      <UserDeitiesSidebarMenu deities={deities} />
      <Button
        disabled={availableSlots === 0}
        href="/found"
        fullwidth
        variant="contained"
        color="black"
      >
        Found Fellowship {availableSlots > 0 ? `(${availableSlots})` : ""}
      </Button>
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
