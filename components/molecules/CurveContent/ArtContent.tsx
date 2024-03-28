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

export const ArtContent = () => {
  return (
    <div>
      <Paragraph>
        Even though art is not the main purpose of the{" "}
        <Important>Apex Deities</Important>, it&apos;s an important part of it.
      </Paragraph>
      <Paragraph>
        Each NFT represents a completely different{" "}
        <Important>cubism concept</Important> of a deity from ancient mythology.
      </Paragraph>
      <Paragraph>
        We have a long-term plan for cooperation with the talented artist behind
        the works and are planning to introduce his work to the{" "}
        <Important>Lusko Community</Important>.
      </Paragraph>
      <Paragraph>
        By buying a deity, you will obtain the copyright of the art pieces, and
        since they are complete concepts, you can create different kinds of art
        from them, such as <Important>paintings</Important> or even{" "}
        <Important>sculptures</Important>.
      </Paragraph>
      <Paragraph>
        With each NFT, an SVG of the art plus high-quality PNG files in
        different sizes will be provided, and each deity will contain a brief
        story of its mythology.
      </Paragraph>
    </div>
  );
};
