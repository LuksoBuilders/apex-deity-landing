import { ReactNode } from "react";
import styled from "styled-components";

const SectionTitle = styled.h2`
  margin-bottom: 1em;
`;

export interface LearningCurveDataProps {
  title: string;
  children?: ReactNode;
}

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
