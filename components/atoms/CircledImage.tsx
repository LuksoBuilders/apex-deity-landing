import styled from "styled-components";

interface AvatarContainerProps {
  width?: string | undefined;
  height?: string | undefined;
  padding?: string | undefined;
}

const AvatarContainer = styled.div<AvatarContainerProps>`
  padding: ${({ padding }) => (padding ? padding : "2px")};
  border: 2px solid ${({ theme }) => theme.black};
  border-radius: 100%;
  height: ${({ height }) => (height ? height : "auto")};
  width: ${({ width }) => (width ? width : "auto")};
`;

const AvatarImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

interface CircledImageProps {
  src: string;
  width?: string | undefined;
  height?: string | undefined;
  padding?: string | undefined;
}

export const CircledImage = ({
  src,
  width,
  height,
  padding,
}: CircledImageProps) => {
  return (
    <AvatarContainer width={width} padding={padding} height={height}>
      <AvatarImage src={src} />
    </AvatarContainer>
  );
};
