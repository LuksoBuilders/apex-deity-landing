import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top: 1em;
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

export const Header = () => {
  return (
    <Container>
      <Logo href="/">ArtisanAlly</Logo>

      <Menu>
        <Button href="/holy-shit">Holy Shit</Button>
      </Menu>
    </Container>
  );
};
