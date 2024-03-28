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

export const EndorsementContent = () => {
  return (
    <div>
      <Paragraph>
        Holders of backer bucks can <Important>Activate</Important> their coins
        by an action called <Important>Endorsement</Important>.
      </Paragraph>
      <Paragraph>
        When you endorse your tokens, in addition to the value provided by the
        fellowship <Important>Artisan</Important>, your profile will also be
        displayed on a leaderboard within the fellowship. This will help
        increase your visibility.
      </Paragraph>
      <Paragraph>
        In addition to that, there is a leaderboard for the top{" "}
        <Important>Fellows</Important> from which users can gain visibility.
      </Paragraph>
      <Paragraph>
        When endorsing, you can select another profile that is not the owner of
        BackerBucks. This has many technical benefits, including the possibility
        of <Important>renting</Important> your tokens.
      </Paragraph>
      <Paragraph>
        Endorsements are <Important>reversible</Important> actions and you can
        undo it to take your BackerBucks back.
      </Paragraph>
    </div>
  );
};

/*
 */
