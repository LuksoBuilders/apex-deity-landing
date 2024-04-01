import styled from "styled-components";
import Image from "next/image";

const SocialLink = styled.a`
  border: 2px solid black;
  height: 90px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  //padding: 1em;
  margin-right: 1em;
`;

const LinksContainer = styled.div`
  display: flex;
`;

export const Links = () => {
  return (
    <LinksContainer>
      <SocialLink href="https://twitter.com/LukstaOnLukso" target="_blank">
        <Image
          width={60}
          height={60}
          unoptimized={true}
          alt={"erato"}
          src={"/icons/twitter-icon.png"}
        />
      </SocialLink>
      <SocialLink href="https://discord.gg/cxKpYV6e" target="_blank">
        <Image
          width={60}
          height={60}
          unoptimized={true}
          alt={"erato"}
          src={"/icons/discord-icon.png"}
        />
      </SocialLink>
    </LinksContainer>
  );
};
