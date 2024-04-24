import React from "react";
import styled from "styled-components";

interface SpacerProps {
  spacing: string;
}

const Spacer = styled.div<SpacerProps>`
  margin-top: ${(props) => props.spacing};
`;

interface SpacingProps {
  spacing: string;
}

export const Spacing: React.FC<SpacingProps> = ({ spacing }) => {
  return <Spacer spacing={spacing} />;
};

export default Spacing;
