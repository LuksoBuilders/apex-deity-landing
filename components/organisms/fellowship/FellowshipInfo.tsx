import styled from "styled-components";
import { useRouter } from "next/router";
import { useFellowship } from "../../hooks/useFellowship";
import { Row, Col } from "react-grid-system";
import Link from "next/link";
import { ethers } from "ethers";

import { CircledImage } from "../../atoms";

const FellowshipInfoContainer = styled.div`
  width: 100%;
  position: relative;
`;

const NameAndSymbolContainer = styled.div`
  color: #383838;
  margin-bottom: 1em;
`;

const Name = styled.h1`
  font-size: 28px;
  font-weight: 800;
`;

const Symbol = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
`;

const ActorsContainer = styled.div`
  position: absolute;
  bottom: 0px;
`;

const ActorCard = styled(Link)`
  border: 1px solid #e8e8e8;
  display: inline-block;
  cursor: pointer;
  transition: 200ms;
  margin-right: 1em;
  &:hover {
    border: 1px solid #a8a8a8;
  }
`;

const ActorImageHolder = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  padding: 0.5em;

  border-bottom: 1px solid #e8e8e8;
`;

const ActorImage = styled.img`
  height: 100%;
`;

const ActorInfoContainer = styled.div`
  padding: 0.25em 0.5em;
`;

const ActorTitle = styled.h5`
  font-size: 15px;
  font-weight: 300;
`;

const ActorName = styled.h6`
  font-size: 15px;
`;

const RedInfoLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  font-weight: 400;
`;

const Info = styled.h4`
  font-weight: 300;
  font-size: 16px;
  margin-bottom: 4px;
`;

function shortenString(str: string) {
  if (str.length <= 8) {
    return str; // If the string is 8 characters or less, return the original string
  } else {
    // Extract first 4 characters
    const start = str.substring(0, 6);
    // Extract last 4 characters
    const end = str.substring(str.length - 6);
    // Create the shortened string with '...'
    return `${start}...${end}`;
  }
}

interface FellowshipInfoProps {}

const EXPLORER_ADDRESS =
  "https://explorer.execution.mainnet.lukso.network/address";

export const FellowshipInfo = ({}: FellowshipInfoProps) => {
  const { query } = useRouter();
  const { error, loading, data } = useFellowship(String(query.id));

  const fellowship = data;

  return (
    <FellowshipInfoContainer>
      <Row style={{ width: "100%" }}>
        <Col md={6}>
          <CircledImage width="100%" squared src={fellowship.logo} />
        </Col>
        <Col md={6}>
          <NameAndSymbolContainer>
            <Name>{fellowship.name}</Name> <Symbol>${fellowship.symbol}</Symbol>
          </NameAndSymbolContainer>
          <Info>
            Contract Address:{" "}
            <RedInfoLink
              target="_blank"
              href={`${EXPLORER_ADDRESS}/${fellowship.address}`}
            >
              {shortenString(fellowship.address)}
            </RedInfoLink>
          </Info>
          <Info>
            Endorsement Address:{" "}
            <RedInfoLink
              target="_blank"
              href={`${EXPLORER_ADDRESS}/${fellowship.endorsementAddress}`}
            >
              {shortenString(fellowship.endorsementAddress)}
            </RedInfoLink>
          </Info>{" "}
          <Info>
            Contribute Address:{" "}
            <RedInfoLink
              target="_blank"
              href={`${EXPLORER_ADDRESS}/${fellowship.contributeAddress}`}
            >
              {shortenString(fellowship.contributeAddress)}
            </RedInfoLink>
          </Info>
          <ActorsContainer>
            <ActorCard href={`/deities/${fellowship.artisan.address}`}>
              <ActorImageHolder>
                <ActorImage src={fellowship.artisan.avatar} />
              </ActorImageHolder>
              <ActorInfoContainer>
                <ActorTitle>Artisan</ActorTitle>
                <ActorName>{fellowship.artisan.name}</ActorName>
              </ActorInfoContainer>
            </ActorCard>
            <ActorCard href={`/deities/${fellowship.founder.id}`}>
              <ActorImageHolder>
                <ActorImage src={fellowship.founder.image} />
              </ActorImageHolder>
              <ActorInfoContainer>
                <ActorTitle>Founder</ActorTitle>
                <ActorName>{fellowship.founder.name}</ActorName>
              </ActorInfoContainer>
            </ActorCard>
          </ActorsContainer>
        </Col>
      </Row>
    </FellowshipInfoContainer>
  );
};
