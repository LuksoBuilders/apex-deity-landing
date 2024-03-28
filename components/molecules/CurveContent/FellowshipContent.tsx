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

export const FellowshipContent = () => {
  return (
    <div>
      <Paragraph>
        Fellowship is the start of the journey for an{" "}
        <Important>Artisan </Important> in the ArtisanAlly.
      </Paragraph>
      <Paragraph>
        Every universal profile can be an <Important>Artisan</Important> and get
        a <Important>Fellowship</Important> for themselves. But only one
        fellowship is possible for each Universal Profile.
      </Paragraph>
      <Paragraph>
        If an <Important>Artisan</Important> wishes to issue a personal token,
        first an <Important> Apex Deity</Important> must found the{" "}
        <Important>Fellowship</Important> for it.
      </Paragraph>

      <Paragraph>
        After a Fellowship is founded it will be{" "}
        <Important>soul bonded</Important> to both the artisan{" "}
        <Important>Universal Profile</Important> and the founder{" "}
        <Important>Deity</Important>.
      </Paragraph>

      <Paragraph>
        Then, Artisan&apos;s backers can mint <Important>Backer Buck</Important>{" "}
        to show their support.
      </Paragraph>
    </div>
  );
};
