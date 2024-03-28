import styled from "styled-components";

const TitleTypography = styled.h1`
  margin-bottom: 0.25em;
`;

export interface TitleProps {
  children: string;
}

export const Title = ({ children }: TitleProps) => {
  return <TitleTypography>{children}</TitleTypography>;
};
