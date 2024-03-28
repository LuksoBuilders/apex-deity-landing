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

export const TimelineContent = () => {
  return (
    <div>
      <Paragraph>
        We're planning to initiate the minting of deities on{" "}
        <Important>April 1st</Important>.
      </Paragraph>
      <Paragraph>
        The reveal of deities and the launch of the initial version of
        ArtisanAlly will be on <Important>April 28th</Important>.
      </Paragraph>

      <Paragraph>
        We are working hard to make this vision a reality, and we're putting a
        deadline to hold ourselves accountable, so take these dates with a grain
        of salt.
      </Paragraph>
    </div>
  );
};
