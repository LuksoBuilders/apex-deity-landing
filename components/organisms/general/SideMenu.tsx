import styled from "styled-components";
import { Button } from "../../molecules";
import { UserMenu } from "../user";

const SideMenuContainer = styled.div`
  padding-top: 78px;
  padding: 32px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Spacing = styled.div`
  margin-top: 1em;
`;

const SuperSpacing = styled.div`
  margin-top: 5em;
`;

const WTF = styled.span`
  font-style: italic;
  font-weight: 700;
`;

export const SideMenu = () => {
  return (
    <SideMenuContainer>
      <UserMenu />
      <SuperSpacing></SuperSpacing>
      <Button href="#mint" color="black" variant="outlined">
        Home
      </Button>
      <Spacing />
      <Button href="#mint" color="black" variant="outlined">
        <WTF>What's this??!!</WTF>
      </Button>
      <Spacing />

      <Button href="#mint" color="black" variant="outlined">
        <WTF> Holy Shit!</WTF>
      </Button>
    </SideMenuContainer>
  );
};
