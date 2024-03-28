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

const StyledUl = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 1em;

  li {
    position: relative;
    padding-left: 20px;
    font-size: 19px;
    font-weight: 300;
  }

  li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border: 2px solid black;
    border-radius: 50%;
    background-color: white;
  }
`;

export const VotingPowerContent = () => {
  return (
    <div>
      <Paragraph>
        Based on the Deity tier, each deity has a specific amount of{" "}
        <Important>Voting Power</Important>. These Voting Powers will be used as
        a weight in the decision makings of the DAO.
      </Paragraph>
      <Paragraph>Here are the list of possible actions for the DAO:</Paragraph>
      <StyledUl>
        <li>Decision on the total fee of the system.</li>
        <li>Decision on the the base value of BackerBucks.</li>
        <li>Decision on the the increase rate of BackerBucks.</li>
        <li>Decision on upgrading the contracts.</li>
      </StyledUl>

      <Paragraph>
        There may be more actions that will be announced at later stages.
      </Paragraph>
    </div>
  );
};
