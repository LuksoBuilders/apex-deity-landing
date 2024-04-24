import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Header } from "./Header";
import { SideMenu } from "./SideMenu";

const menuWidth = 320;

const AppContainer = styled.div`
  position: relative;
`;

const SidePanel = styled.div`
  height: 100vh;
  background-image: url("background.png");
  background-size: 600px 2546px;
  border-right: 1px solid #c8c8c8;
`;

const SidePanelOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(136, 136, 136, 0.2);
`;

const MainPanel = styled.div`
  padding: 1em;
`;

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <AppContainer>
      <motion.div
        initial={{ left: -1 * menuWidth }}
        animate={{
          left: isMenuOpen ? 0 : -1 * menuWidth,
        }} // Target opacity based on isOpen state
        transition={{ duration: 0.2 }} // Transition duration
        style={{
          width: menuWidth,
          position: "absolute",
          left: -1 * menuWidth,
          background: "red",
        }}
      >
        <SidePanel>
          <SidePanelOverlay>
            <SideMenu />
          </SidePanelOverlay>
        </SidePanel>
      </motion.div>
      <motion.div
        initial={{ width: "100%" }}
        animate={{
          width: !isMenuOpen ? `100%` : `calc(100% - ${menuWidth}px)`,
        }} // Target opacity based on isOpen state
        transition={{ duration: 0.2 }} // Transition duration
        style={{ position: "absolute", right: 0 }}
      >
        <MainPanel>
          <Header
            isMenuOpen={isMenuOpen}
            onMenuButton={() => setIsMenuOpen(!isMenuOpen)}
          />
        </MainPanel>
      </motion.div>
    </AppContainer>
  );
};
