import { ReactNode } from "react";
import styled from "styled-components";

interface CenteredContainerProps {
  height: string | undefined;
}

const CenteredContainer = styled.div<CenteredContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ height }) => (height ? height : "")}
`;

interface CenteredDivProps {
  children: ReactNode;
  height?: string | undefined;
}

export const CenteredDiv = ({ children, height }: CenteredDivProps) => {
  return <CenteredContainer height={height}>{children}</CenteredContainer>;
};
