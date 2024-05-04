import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header } from "./Header";
import { SideMenu } from "./SideMenu";

const menuWidth = 390;

const AppContainer = styled.div`
  position: relative;
`;

const SidePanel = styled.div`
  min-height: 100vh;
  background-image: url("/background.png");
  background-size: 600px 2546px;
  border-right: 1px solid #c8c8c8;
`;

const SidePanelOverlay = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;

  background-color: rgba(136, 136, 136, 0.2);
`;

const MainPanel = styled.div`
  //  padding: 1em 2em;
  margin-left: ${menuWidth}px;
`;

interface ContentPanel {
  $isMenuOpen: boolean;
}

const Content = styled.div<ContentPanel>`
  padding: 1em 2em;
  position: absolute;
  top: 80px;
  transition: 200ms;
  width: ${({ $isMenuOpen }) =>
    $isMenuOpen ? `calc(100% - ${menuWidth}px)` : "100%"};
  //overflow-y: auto; /* Enable vertical scrolling if content exceeds viewport */
  //max-height: calc(100vh - 2em); /* Adjust height to fit viewport */
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <AppContainer>
      <motion.div
        initial={{
          position: `fixed`,
          top: 0,
          bottom: 0,
          left: isMenuOpen ? 0 : -1 * menuWidth,
          width: ` ${menuWidth}px`,
        }}
        animate={{
          position: `fixed`,
          top: 0,
          bottom: 0,
          left: isMenuOpen ? 0 : -1 * menuWidth,
          width: ` ${menuWidth}px`,
        }}
        transition={{ duration: 0.2 }}
      >
        <SidePanel>
          <SidePanelOverlay>
            <SideMenu />
          </SidePanelOverlay>
        </SidePanel>
      </motion.div>
      <motion.div
        initial={{ marginLeft: !isMenuOpen ? -1 * menuWidth : 0 }}
        animate={{ marginLeft: !isMenuOpen ? -1 * menuWidth : 0 }}
        transition={{ duration: 0.2 }}
      >
        <MainPanel>
          <Header
            isMenuOpen={isMenuOpen}
            onMenuButton={() => setIsMenuOpen(!isMenuOpen)}
          />
          <Content $isMenuOpen={isMenuOpen}>{children}</Content>
        </MainPanel>
      </motion.div>
    </AppContainer>
  );
};
