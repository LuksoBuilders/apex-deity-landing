import styled from "styled-components";
import { useTimer } from "react-timer-hook";
import { ShittableTextProps } from "../../utils/interfaces";

const MainText = styled.span``;

const Identifier = styled.span`
  font-size: 14px;
  font-weight: 300;
`;

export const ShittableText = ({
  expiryTimestamp,
  refetch,
}: ShittableTextProps) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: expiryTimestamp,
    onExpire: () => refetch(),
  });

  return (
    <MainText>
      {hours}
      <Identifier>H</Identifier> {minutes}
      <Identifier>M</Identifier> {seconds}
      <Identifier>S</Identifier>
    </MainText>
  );
};
