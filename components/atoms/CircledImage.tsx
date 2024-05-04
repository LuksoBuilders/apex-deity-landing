import styled from "styled-components";

interface AvatarContainerProps {
  width?: string | undefined;
  height?: string | undefined;
  padding?: string | undefined;
  $squared: boolean;
}

const AvatarContainer = styled.div<AvatarContainerProps>`
  padding: ${({ padding }) => (padding ? padding : "2px")};
  border: 2px solid ${({ theme }) => theme.black};
  border-radius: ${({ $squared }) => ($squared ? "0px" : "100%")};
  height: ${({ height }) => (height ? height : "auto")};
  width: ${({ width }) => (width ? width : "auto")};
`;

interface AvatarImageProps {
  $squared: boolean;
}

const AvatarImage = styled.img<AvatarImageProps>`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: ${({ $squared }) => ($squared ? "0px" : "100%")};
`;

interface CircledImageProps {
  src: string;
  width?: string | undefined;
  height?: string | undefined;
  padding?: string | undefined;
  squared?: boolean;
}

export const CircledImage = ({
  src,
  width,
  height,
  padding,
  squared = false,
}: CircledImageProps) => {
  return (
    <AvatarContainer
      $squared={squared}
      width={width}
      padding={padding}
      height={height}
    >
      <AvatarImage $squared={squared} src={src} />
    </AvatarContainer>
  );
};
