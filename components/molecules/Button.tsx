import { ReactNode, ChangeEventHandler } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

export interface ButtonContainerProps {
  children: string | ReactNode;
  color?: "primary" | "black";
  variant?: "contained" | "outlined";
  href?: string;
  onClick?: Function;
  $fullwidth?: boolean;
  disabled?: boolean;
  size?: string;
}

const buttonStyles = css<ButtonContainerProps>`
  /* Your existing styles */

  /* New disabled styles */
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

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
  padding: ${({ size }) => (size === "standard" ? "8px" : "4px")};
  text-align: center;
  font-size: ${({ size }) => (size === "standard" ? "19px" : "17px")};
  font-weight: 500;
  cursor: pointer;
  transition: 200ms;
  ${buttonStyles}
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
  ${buttonStyles}

  &:hover {
    background-color: ${({ variant, color, theme }) =>
      variant === "contained"
        ? color === "primary"
          ? "#C81F49"
          : "#393939"
        : "#e8e8e8"};
  }
`;

export interface ButtonProps {
  children: string | ReactNode;
  color?: "primary" | "black";
  variant?: "contained" | "outlined";
  href?: string;
  onClick?: Function;
  size?: "small" | "standard";
  fullwidth?: boolean;
  fileUploader?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean; // 1. Add disabled prop
}

export const Button = ({
  children,
  color = "black",
  variant = "outlined",
  fullwidth,
  href,
  onClick,
  fileUploader = false,
  onChange,
  size = "standard",
  disabled = false,
}: ButtonProps) => {
  if (fileUploader) {
    return (
      <label>
        <ButtonContainer
          onClick={onClick}
          href={href}
          color={color}
          variant={variant}
          $fullwidth={fullwidth}
          disabled={disabled}
          size={size}
        >
          {children}
          <input
            disabled={disabled}
            type="file"
            style={{ display: "none" }}
            onChange={onChange}
          />
        </ButtonContainer>
      </label>
    );
  }

  if (href) {
    return (
      <ButtonLink
        onClick={onClick}
        href={href}
        color={color}
        variant={variant}
        $fullwidth={fullwidth}
        disabled={disabled}
        size={size}
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
      disabled={disabled}
      size={size}
    >
      {children}
    </ButtonContainer>
  );
};
