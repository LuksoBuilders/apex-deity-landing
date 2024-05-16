import { useState, useEffect } from "react";
import styled from "styled-components";

interface LabelProps {
  $isFocused: boolean;
  $isError: boolean;
}

const TextFieldContainer = styled.div<LabelProps>`
  position: relative;
  min-height: 56px;
  border: ${(props) =>
    props.$isError
      ? `2px solid ${props.theme.error}`
      : props.$isFocused
      ? "2px solid #393939"
      : "2px solid #393939"};
  margin-top: 20px;
  border-radius: 0px;
  box-shadow: ${(props) =>
    props.$isError ? `3px 3px ${props.theme.error}` : "3px 3px #393939"};
`;

const TextFieldLabel = styled.label<LabelProps>`
  position: absolute;
  border: ${(props) =>
    props.$isError && props.$isFocused
      ? `1px solid ${props.theme.error}`
      : props.$isFocused
      ? "1px solid #393939"
      : "0px"};
  background: ${(props) =>
    props.$isError && props.$isFocused
      ? `${props.theme.error}`
      : props.$isFocused
      ? "#393939"
      : "white"};
  color: ${(props) => (props.$isFocused ? "white" : "#696969")};
  top: ${(props) => (props.$isFocused ? "-20px" : "8px")};
  left: ${(props) => (props.$isFocused ? "20px" : "0px")};
  font-size: ${(props) => (props.$isFocused ? "1em" : "1.2em")};
  transition: all 0.3s;
  padding: 0.2em 1em;
  border-radius: 100px;
  font-weight: ${(props) => (props.$isFocused ? "200" : "200")};
`;

const TextFieldInput = styled.input`
  width: 100%;
  height: 100%;
  //position: absolute;
  font-size: 1em;
  font-weight: lighter;
  padding: 1em 1.5em;
  padding-top: 1.3em;
  outline: none;
  box-sizing: border-box;
  border: none;
  border-radius: 0px;
`;

const TextFieldArea = styled.textarea`
  width: 100%;
  //position: absolute;
  font-size: 1.2em;
  font-weight: lighter;
  padding: 1em 1.5em;
  outline: none;
  box-sizing: border-box;
  border: none;
  border-radius: 0px;
  height: 150px;
  resize: none;
`;

const HelperText = styled.p<LabelProps>`
  color: ${(props) => (props.$isError ? props.theme.error : "#383838")};
  position: absolute;
  bottom: -36px;
`;

interface TextFieldProps {
  color?: "primary" | "black";
  value: string;
  label: string;
  onChange: Function;
  error?: boolean;
  helperText?: string;
  multiline?: boolean;
}

export const TextField = ({
  value,
  label,
  onChange,
  error = false,
  helperText,
  multiline = false,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setIsFocused(true);
    }
  }, [value]);

  return (
    <TextFieldContainer
      $isError={error}
      $isFocused={isFocused || Boolean(value)}
    >
      {multiline ? (
        <TextFieldArea
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
          rows={10}
        />
      ) : (
        <TextFieldInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
        />
      )}
      <TextFieldLabel
        $isError={error}
        onClick={() => setIsFocused(true)}
        $isFocused={isFocused || Boolean(value)}
      >
        {label}
      </TextFieldLabel>

      {helperText && (
        <HelperText $isFocused={isFocused || Boolean(value)} $isError={error}>
          {helperText}
        </HelperText>
      )}
    </TextFieldContainer>
  );
};

export default TextField;
