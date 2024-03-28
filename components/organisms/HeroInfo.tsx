import styled from "styled-components";
import { Button } from "../molecules";

const HeroContainer = styled.div`
  padding-top: 5em;
  margin-bottom: 3em;
`;

const ApexDeityTitle = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 800;
`;

const HeroTitle = styled.h1`
  font-weight: 400;
  font-size: 48px;
  max-width: 350px;
`;

const MainDescription = styled.div`
  margin-top: 3em;
`;

const Description = styled.p`
  font-weight: 200;
  font-size: 18px;
`;

const TierDescription = styled.div`
  margin-top: 2em;
`;

const SemiBold = styled.span`
  font-weight: 600;
  font-style: italic;
`;

const ButtonsContainer = styled.div`
  //display: flex;
  //justify-content: space-between;
  margin-top: 2em;
`;

const ButtonHolder = styled.div`
  margin-right: 1em;
  margin-bottom: 1em;
  display: inline-block;
`;

export const HeroInfo = () => {
  return (
    <HeroContainer>
      <HeroTitle>
        <ApexDeityTitle>Apex Deities</ApexDeityTitle> give you godly power.
      </HeroTitle>
      <MainDescription>
        <Description>
          <SemiBold>Apex Deities</SemiBold> is a collection of 100 unique hand
          drawn Deities that have godly power over the
          <SemiBold> ArtisanAlly </SemiBold>
          platform.
        </Description>
      </MainDescription>
      <TierDescription>
        <Description>
          Apex Deities come in 4 tiers: <SemiBold>S</SemiBold>,
          <SemiBold> A</SemiBold>, <SemiBold> B</SemiBold>,
          <SemiBold> C</SemiBold>
        </Description>
      </TierDescription>

      <ButtonsContainer>
        <ButtonHolder>
          <Button href="#mint" color="primary" variant="contained">
            Mint a Deity
          </Button>
        </ButtonHolder>

        <Button href="#learn">Learn More</Button>
      </ButtonsContainer>
    </HeroContainer>
  );
};
