import styled from "styled-components";
import { ImMenu } from "react-icons/im";
import { BiCollapseHorizontal } from "react-icons/bi";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  //margin-top: 1em;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  font-size: 2em;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const Menu = styled.div``;

const Button = styled.a`
  font-size: 1.3em;
  font-weight: 300;
`;

const MenuButton = styled.div`
  border: 2px solid ${({ theme }) => theme.primary};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  cursor: pointer;
  transition: 200ms;
  position: relative;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const MenuIcon = styled(ImMenu)`
  font-size: 2em;
  color: ${({ theme }) => theme.primary};
  position: absolute;
  top: 6px;
  right: 7px;
`;

const CollapseButton = styled(BiCollapseHorizontal)`
  font-size: 2em;
  color: ${({ theme }) => theme.primary};
  position: absolute;
  top: 7px;
  right: 7px;
`;

export interface HeaderProps {
  isMenuOpen: boolean;
  onMenuButton: () => void;
}

export const Header = ({ isMenuOpen, onMenuButton }: HeaderProps) => {
  return (
    <Container>
      <MenuButton onClick={() => onMenuButton()}>
        <motion.div
          initial={{ opacity: 0 }} // Initial opacity
          animate={{ opacity: isMenuOpen ? 0 : 1 }} // Target opacity based on isOpen state
          transition={{ duration: 0.05, delay: !isMenuOpen ? 0.05 : 0 }} // Transition duration
        >
          <MenuIcon />
        </motion.div>
        <motion.div
          initial={{ opacity: 1 }} // Initial opacity
          animate={{ opacity: isMenuOpen ? 1 : 0 }} // Target opacity based on isOpen state
          transition={{ duration: 0.05, delay: isMenuOpen ? 0.05 : 0 }} // Transition duration
        >
          <CollapseButton />
        </motion.div>
      </MenuButton>
      <Logo href="/">ArtisanAlly</Logo>

      <div></div>
    </Container>
  );
};
