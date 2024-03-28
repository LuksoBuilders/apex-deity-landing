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

export const ArtisanAllyContent = () => {
  return (
    <div>
      <Paragraph>
        So if you’re familiar with <Important>friend.tech</Important> you kinda
        know the main idea of ArtisanAlly, but if you’re not:
      </Paragraph>
      <Paragraph>
        ”ArtisanAlly helps to create personal tokens for Universal Profiles
        which increase in price exponentially”
      </Paragraph>
      <Paragraph>
        But for being able to mint personal token for a Universal Profile, that
        Profile needs to have a <Important>Fellowship</Important>, we call the
        personal tokens
        <Important> BackerBucks</Important> and holders of those BackerBucks can
        use it to <Important> Endorse</Important> or{" "}
        <Important> Contribute</Important>.
      </Paragraph>
      <Paragraph>
        For spam protection and incentive alignment only an
        <Important> Apex Deities </Important> holder can create a{" "}
        <Important>Fellowship</Important>.
      </Paragraph>
    </div>
  );
};
