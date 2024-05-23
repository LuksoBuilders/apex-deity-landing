import styled from "styled-components";

interface RedSpanProps {
  fontWeight?: number;
}

export const RedSpan = styled.span<RedSpanProps>`
  color: ${({ theme }) => theme.primary};
  font-weight: ${({ fontWeight = 600 }) => fontWeight};
`;
