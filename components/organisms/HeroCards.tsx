import styled from "styled-components";
import { DeityCard } from "../molecules";

const HeroCardsContainer = styled.div`
  position: relative;
  min-width: 420px;
  height: 700px;
  display: inline-block;
`;

const FirstCardContainer = styled.div`
  position: absolute;
  transform: rotate(12deg);
  transform-origin: bottom right;
  top: 50px;
  right: 80px;
`;

const SecondCardContainer = styled.div`
  position: absolute;
  bottom: 0px;
  transform: rotate(-14deg);
  transform-origin: bottom left;
  top: 250px;
  left: 110px;
`;

export const HeroCards = () => {
  return (
    <HeroCardsContainer>
      <FirstCardContainer>
        <DeityCard
          tier="C"
          name="Melpomene"
          owner="Luksta"
          image="/deities/melpomene.png"
          rank={83}
          founded={6}
          collected={21}
        />
      </FirstCardContainer>
      <SecondCardContainer>
        <DeityCard
          tier="S"
          name="Poseidon"
          owner="Luksta"
          image="/deities/poseidon.png"
          rank={8}
          founded={18}
          collected={132}
        />
      </SecondCardContainer>
    </HeroCardsContainer>
  );
};

export default HeroCards;

/*
     <DeityCard
        tier="C"
        name="Melpomene"
        owner="Luksta"
        image="/deities/melpomene.png"
        rank={8}
        founded={18}
        collected={132}
      />

*/
