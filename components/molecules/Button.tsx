import { ReactNode } from "react";
import styled from "styled-components";
import Link from "next/link";

export interface ButtonProps {
  children: string | ReactNode;
  color?: "primary" | "black";
  variant?: "contained" | "outlined";
  href?: string;
  onClick?: Function;
  fullwidth?: boolean;
}

export interface ButtonContainerProps {
  children: string | ReactNode;
  color?: "primary" | "black";
  variant?: "contained" | "outlined";
  href?: string;
  onClick?: Function;
  $fullwidth?: boolean;
}

const ButtonContainer = styled.a<ButtonContainerProps>`
  background-color: ${({ variant, color, theme }) =>
    variant === "contained"
      ? color === "primary"
        ? theme.primary
        : "#1E1E1E"
      : "white"};

  border-style: solid;
  border-width: ${({ variant, theme }) =>
    variant === "contained" ? "2px" : "2px"};
  border-color: ${({ variant, color, theme }) =>
    color === "primary" ? theme.primary : "#1E1E1E"};

  color: ${({ variant, color, theme }) =>
    variant === "contained"
      ? color === "primary"
        ? "white"
        : "white"
      : color === "primary"
      ? theme.primary
      : "#1E1E1E"};

  display: inline-block;
  min-width: ${({ $fullwidth }) => ($fullwidth ? "100%" : "200px")};
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

const ButtonLink = styled(Link)<ButtonContainerProps>`
  background-color: ${({ variant, color, theme }) =>
    variant === "contained"
      ? color === "primary"
        ? theme.primary
        : "#1E1E1E"
      : "white"};

  border-style: solid;
  border-width: ${({ variant, theme }) =>
    variant === "contained" ? "2px" : "2px"};
  border-color: ${({ variant, color, theme }) =>
    color === "primary" ? theme.primary : "#1E1E1E"};

  color: ${({ variant, color, theme }) =>
    variant === "contained"
      ? color === "primary"
        ? "white"
        : "white"
      : color === "primary"
      ? theme.primary
      : "#1E1E1E"};

  display: inline-block;
  min-width: ${({ $fullwidth }) => ($fullwidth ? "100%" : "200px")};
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
  fullwidth,
  href,
  onClick,
}: ButtonProps) => {
  if (href) {
    return (
      <ButtonLink
        onClick={onClick}
        href={href}
        color={color}
        variant={variant}
        $fullwidth={fullwidth}
      >
        {children}
      </ButtonLink>
    );
  }
  return (
    <ButtonContainer
      onClick={onClick}
      href={href}
      color={color}
      variant={variant}
      $fullwidth={fullwidth}
    >
      {children}
    </ButtonContainer>
  );
};
