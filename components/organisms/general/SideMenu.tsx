import styled from "styled-components";
import { Button } from "../../molecules";
import { UserMenu } from "../user";
import Link from "next/link";

const SideMenuContainer = styled.div`
  position: relative;
  padding: 32px;
  //display: flex;
  //justify-content: center;
  //flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  width: 100%;
  --code-font-size: 14px;
  --code-line-height: 1.4;
  --scroll-bar-color: #c5c5c5;
  --scroll-bar-bg-color: #f6f6f6;
`;

const Spacing = styled.div`
  margin-top: 1em;
`;

const SuperSpacing = styled.div`
  margin-top: 5em;
`;

const ButtonText = styled.b``;

const WTF = styled.span`
  font-style: italic;
  font-weight: 700;
`;

export const SideMenu = () => {
  return (
    <SideMenuContainer>
      <UserMenu />
      <SuperSpacing></SuperSpacing>
      <Button href="/" fullwidth color="black" variant="outlined">
        <ButtonText>Home</ButtonText>
      </Button>
      <Spacing />
      <Button href="/learning-curve" fullwidth color="black" variant="outlined">
        <ButtonText>Learning Curve</ButtonText>
      </Button>
      <Spacing />

      <Button href="/holy-shit" fullwidth color="black" variant="outlined">
        <WTF> Holy Shit!</WTF>
      </Button>
    </SideMenuContainer>
  );
};
