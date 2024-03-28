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

export const ContributeContent = () => {
  return (
    <div>
      <Paragraph>
        <Important>BackerBuck</Important> owners can burn their precious tokens
        to receive special rewards from the <Important>Artisan</Important>.
      </Paragraph>
      <Paragraph>
        This process of burning is called <Important>Contribution</Important>.
      </Paragraph>
      <Paragraph>
        Burning a BackerBuck reduces the total supply without changing the mint
        price, consequently increasing the value of the tokens.
      </Paragraph>
      <Paragraph>
        <Important>Contribution</Important> is irreversible; when someone
        performs it, they will lose their token. However, they will receive a{" "}
        <Important>Soul Bound</Important> token in their{" "}
        <Important>Universal Profile</Important>.
      </Paragraph>
      <Paragraph>
        In terms of visibility, contribution has a{" "}
        <Important>much higher</Important> impact across all leaderboards.
      </Paragraph>
    </div>
  );
};
