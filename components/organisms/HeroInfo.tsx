import styled from "styled-components";
import { Button } from "../molecules";

const HeroContainer = styled.div`
  padding-top: 0em;
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
  line-height: 1.4em;
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
        <ApexDeityTitle>ArtisanAlly</ApexDeityTitle> will find your early
        adoptors.
      </HeroTitle>
      <MainDescription>
        <Description>
          By creating a <SemiBold>Fellowship</SemiBold> you can issue a faith
          token for your
          <SemiBold> Early Adoptors</SemiBold>.
        </Description>
      </MainDescription>
      <TierDescription>
        <Description>
          <SemiBold>BackerBucks</SemiBold> price goes up{" "}
          <SemiBold>Exponentially</SemiBold> and creates an urgency.
        </Description>
      </TierDescription>
      <TierDescription>
        <Description>
          First step of a creative project is{" "}
          <SemiBold>selling a promise</SemiBold>. We help you do that while
          eating breakfast.
        </Description>
      </TierDescription>
    </HeroContainer>
  );
};
