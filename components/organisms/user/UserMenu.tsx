import styled from "styled-components";
import { Button } from "../../molecules";
import { useState } from "react";
import { UserUPBasicInfo } from "./UserUPBasicInfo";

const UserMenuContainer = styled.div`
  width: 100%;
`;

const ConnectedMenuContainer = styled.div``;

export const UserMenu = () => {
  const [connected, setIsConnected] = useState(false);

  const userAddress = "qwed";

  return (
    <UserMenuContainer>
      {connected ? (
        <ConnectedMenuContainer>
          <UserUPBasicInfo userAddress={userAddress} />
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
