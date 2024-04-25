import { useState, useEffect } from "react";
import styled from "styled-components";

interface LabelProps {
  $isFocused: boolean;
}

const TextFieldContainer = styled.div<LabelProps>`
  position: relative;
  height: 56px;
  border: ${(props) =>
    props.$isFocused ? "2px solid #393939" : "2px solid #393939"};
  margin-top: 20px;
  border-radius: 0px;
  box-shadow: 3px 3px #393939;
`;

const TextFieldLabel = styled.label<LabelProps>`
  position: absolute;
  border: ${(props) => (props.$isFocused ? "1px solid #393939" : "0px")};
  background: ${(props) => (props.$isFocused ? "#393939" : "white")};
  color: ${(props) => (props.$isFocused ? "white" : "#393939")};
  top: ${(props) => (props.$isFocused ? "-20px" : "4px")};
  left: ${(props) => (props.$isFocused ? "20px" : "0px")};
  font-size: ${(props) => (props.$isFocused ? "1em" : "1.4em")};
  transition: all 0.3s;
  padding: 0.2em 1em;
  border-radius: 100px;
  font-weight: 200;
`;

const TextFieldInput = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  font-size: 1em;
  font-weight: lighter;
  padding: 1em 1.5em;
  outline: none;
  box-sizing: border-box;
  border: none;
  border-radius: 0px;
`;

interface TextFieldProps {
  color?: "primary" | "black";
  value: string;
  label: string;
  onChange: Function;
}

export const TextField = ({
  color = "black",
  value,
  label,
  onChange,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setIsFocused(true);
    }
  }, [value]);

  return (
    <TextFieldContainer $isFocused={isFocused || Boolean(value)}>
      <TextFieldInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="email"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
      />
      <TextFieldLabel
        onClick={() => setIsFocused(true)}
        $isFocused={isFocused || Boolean(value)}
      >
        {label}
      </TextFieldLabel>
    </TextFieldContainer>
  );
};

export default TextField;
