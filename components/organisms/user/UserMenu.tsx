import { useState } from "react";
import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { Spacing, CenteredDiv } from "../../atoms";
import { Button, SidebarList } from "../../molecules";
import { UserUPBasicInfo } from "./UserUPBasicInfo";
import { UserDeitiesSidebarMenu } from "./UserDeitiesSidebarMenu";
import { UserFellowshipsSidebarMenu } from "./UserFellowshipsSidebarMenu";
import { useDeities } from "../../hooks/useDeities";

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

export const UserMenu = () => {
  const deities = useDeities([0, 78]);

  const [connected, setIsConnected] = useState(false);

  const loading = deities.loading;

  if (loading)
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );

  const userAddress = "";

  const availableSlots = Object.values(deities.data).reduce((pV, cV) => {
    return pV + cV.availableSlots;
  }, 0);

  return (
    <UserMenuContainer>
      {connected ? (
        <ConnectedMenuContainer>
          <UserUPBasicInfo userAddress={userAddress} />
          <Spacing spacing="3em" />
          <UserFellowshipsSidebarMenu />
          <Spacing spacing="3em" />
          <UserDeitiesSidebarMenu deities={Object.values(deities.data)} />
          <Button href="/found" fullwidth variant="contained" color="black">
            Found Fellowship {availableSlots > 0 ? `(${availableSlots})` : ""}
          </Button>
        </ConnectedMenuContainer>
      ) : (
        <div>
          <Button
            onClick={() => setIsConnected(true)}
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
