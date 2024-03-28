import styled from "styled-components";

import { Title } from "../atoms";

const LearningCurveInfoContainer = styled.div`
  margin-bottom: 2em;
`;

const LearningCurveDescription = styled.p`
  font-size: 18px;
  font-weight: 300;
  color: #252525;
`;

const SemiBold = styled.span`
  font-weight: 500;
  font-style: italic;
`;

export const LearningCurveInfo = () => {
  return (
    <LearningCurveInfoContainer>
      <Title>Learning Curve</Title>
      <LearningCurveDescription>
        <SemiBold>Apex Deities</SemiBold> is not just an art collection. They
        have lots of utilities, including <SemiBold>making money</SemiBold> and{" "}
        <SemiBold>voting power</SemiBold>. Because of that there’s a bit of
        learning curve. We suggest to read in order, but if you already know
        <SemiBold> ArtisanAlly</SemiBold> just jump into the{" "}
        <SemiBold>Apex Deities</SemiBold> section.
      </LearningCurveDescription>
    </LearningCurveInfoContainer>
  );
};
