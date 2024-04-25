import { useState } from "react";
import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { Spacing, CenteredDiv } from "../../atoms";
import { Button, SidebarList } from "../../molecules";
import { UserUPBasicInfo } from "./UserUPBasicInfo";
import { UserDeitiesSidebarMenu } from "./UserDeitiesSidebarMenu";
import { useDeities } from "../../hooks/useDeities";

const UserMenuContainer = styled.div`
  width: 100%;
`;

const ConnectedMenuContainer = styled.div``;

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
          <UserDeitiesSidebarMenu deities={Object.values(deities.data)} />
          <Button href="/found" fullwidth variant="contained" color="black">
            Found Fellowship {availableSlots > 0 ? `(${availableSlots})` : ""}
          </Button>
        </ConnectedMenuContainer>
      ) : (
        <div>
          <Button
            onClick={() => setIsConnected(true)}
            href="#mint"
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
