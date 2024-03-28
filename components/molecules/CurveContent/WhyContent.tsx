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

export const WhyContent = () => {
  return (
    <div>
      <Paragraph>
        We’re a builder group on Lukso, and we’re planning to build long term.
      </Paragraph>
      <Paragraph>
        For building long term you first need to sustain your finances.
      </Paragraph>
      <Paragraph>
        So we decided to build two projects that helps to sustain finance of
        building, called <Important>Luksta</Important> and{" "}
        <Important>FundUP</Important>. One for fundraising and one for grant
        system.
      </Paragraph>
      <Paragraph>
        These two dapps help projects that have an MVP and small community to
        get money to sustain.
      </Paragraph>
      <Paragraph>
        But what about the projects that are just starting and does not have an
        MVP or a community? That's why we're building{" "}
        <Important>ArtisanAlly</Important>.
      </Paragraph>
    </div>
  );
};

/*
 */
