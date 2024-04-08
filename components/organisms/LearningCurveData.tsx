import styled from "styled-components";
import { LearningCurveDataProps } from "../utils/interfaces";

const SectionTitle = styled.h2`
  margin-bottom: 1em;
`;

export const LearningCurveData = ({
  title,
  children,
}: LearningCurveDataProps) => {
  return (
    <div>
      <SectionTitle>{title}</SectionTitle>

      <div>{children}</div>
    </div>
  );
};
