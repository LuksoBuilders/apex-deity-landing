import styled from "styled-components";

interface CountDownProps {
  identifier: string;
  amount: number;
}

const Container = styled.div`
  border: 3px solid black;

  width: 150px;
  height: 150px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Amount = styled.h1`
  font-weight: 600;
  font-size: 56px;
`;

const Identifier = styled.p`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 30px;
  font-weight: 200;
  color: ${({ theme }) => theme.primary};
`;

export const CountDownBox = ({ identifier, amount }: CountDownProps) => {
  return (
    <Container>
      <Amount>{amount}</Amount> <Identifier>{identifier}</Identifier>
    </Container>
  );
};
