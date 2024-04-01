import { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import styled from "styled-components";

import { CountDownBox } from "../molecules/CountDownBox";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const CounterContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 500px;
`;

export const CountDown = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: new Date(1712073600000),
    onExpire: () => console.warn("onExpire called"),
  });

  return isClient ? (
    <Container>
      <CounterContainer>
        <CountDownBox identifier="H" amount={hours} />
        <CountDownBox identifier="M" amount={minutes} />
        <CountDownBox identifier="S" amount={seconds} />
      </CounterContainer>
    </Container>
  ) : (
    <></>
  );
};

export default CountDown;
