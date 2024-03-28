import { ReactNode } from "react";
import styled from "styled-components";

export interface ButtonProps {
  children: string | ReactNode;
  color?: "primary" | "black";
  variant?: "contained" | "outlined";
  href?: string;
  onClick?: Function;
}

const ButtonContainer = styled.a<ButtonProps>`
  background-color: ${({ variant, color, theme }) =>
    variant === "contained"
      ? color === "primary"
        ? theme.primary
        : "#191919"
      : "white"};

  border-style: solid;
  border-width: ${({ variant, theme }) =>
    variant === "contained" ? "2px" : "2px"};
  border-color: ${({ variant, color, theme }) =>
    color === "primary" ? theme.primary : "black"};

  color: ${({ variant, color, theme }) =>
    variant === "contained"
      ? color === "primary"
        ? "white"
        : "white"
      : color === "primary"
      ? theme.primary
      : "black"};

  display: inline-block;
  min-width: 200px;
  padding: 8px;
  text-align: center;
  font-size: 19px;
  font-weight: 500;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    background-color: ${({ variant, color, theme }) =>
      variant === "contained"
        ? color === "primary"
          ? "#C81F49"
          : "#393939"
        : "#e8e8e8"};
  }
`;

export const Button = ({
  children,
  color = "black",
  variant = "outlined",
  href,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonContainer
      onClick={onClick}
      href={href}
      color={color}
      variant={variant}
    >
      {children}
    </ButtonContainer>
  );
};
