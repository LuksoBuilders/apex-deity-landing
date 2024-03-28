import styled from "styled-components";

const Paragraph = styled.p`
  font-weight: 300;
  font-size: 19px;
  color: #222;
  margin-bottom: 1em;
`;

const Important = styled.span`
  font-weight: 500;
`;

const SuperImportant = styled(Important)`
  color: ${({ theme }) => theme.primary};
`;

export const IncentivesContent = () => {
  return (
    <div>
      <Paragraph>
        The team behind <Important>ArtisanAlly</Important> and{" "}
        <Important>Apex Deities</Important> is{" "}
        <SuperImportant>Luksta Builders</SuperImportant>.
      </Paragraph>
      <Paragraph>
        We are the track winners of both <Important>Buildup 1</Important> and{" "}
        <Important>Buildup 2</Important> with <Important>DUP DAO</Important> and{" "}
        <Important>Luksta</Important>.
      </Paragraph>
      <Paragraph>
        Currently, we&apos;re working on two funding projects called{" "}
        <Important>Luksta</Important> and <Important>FundUP</Important>, both of
        which will have their own token.
      </Paragraph>
      <Paragraph>
        The idea of <Important>ArtisanAlly</Important> came to us when we were
        trying to figure out who we should <Important>AirDrop</Important> the{" "}
        <Important>$LUKSTA</Important> and <Important>$FundUP</Important> tokens
        to.
      </Paragraph>
      <Paragraph>
        The utility of those tokens and the airdrop details will be announced in
        later stages, but undoubtedly the airdrop will go to the users of{" "}
        <Important>ArtisanAlly</Important>.
      </Paragraph>
    </div>
  );
};
