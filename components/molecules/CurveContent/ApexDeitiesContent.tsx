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

export const ApexDeitiesContent = () => {
  return (
    <div>
      <Paragraph>
        <Important>Apex Deities</Important> are NFTs mainly responsible for the
        founding of the <Important>Fellowships</Important>.
      </Paragraph>
      <Paragraph>
        Only holders of a Deity can found a <Important>Fellowship</Important>{" "}
        for an <Important>Artisan</Important>.
      </Paragraph>
      <Paragraph>
        When a Deity founds a fellowship, it will be{" "}
        <Important>soulbounded</Important> to that fellowship and will receive a
        fee from it.
      </Paragraph>
      <Paragraph>
        Additionally, every Deity will receive a portion of the{" "}
        <Important>system fee</Important> based on their tier.
      </Paragraph>
      <Paragraph>
        Deities have four tiers: <Important>S, A, B, C</Important>, which you
        can compare in the table at the bottom.
      </Paragraph>
      <Paragraph>
        Deities also have a leaderboard based on the amount of fee they have
        collected. This will directly influence the secondary market value of
        the Deity.
      </Paragraph>
      <Paragraph>
        <Important>
          For the first week of the ArtisanAlly only Deity holders can mint
          BackerBucks.
        </Important>
      </Paragraph>
    </div>
  );
};
