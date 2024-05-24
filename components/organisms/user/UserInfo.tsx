import styled from "styled-components";
import { User } from "../../types/remoteTypes";
import { Row, Col } from "react-grid-system";
import { ipfsURLtoNormal } from "../../utils";
import { useState, useEffect, useRef } from "react";

const UserInfoContainer = styled.div``;

interface UserImageHolderProps {
  $height: string;
}

const UserImageHolder = styled.div<UserImageHolderProps>`
  border: 2px solid #383838;
  width: 100%;
  height: ${({ $height }) => $height};
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const UserRankHolder = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border: 2px solid #383838;
  background-color: white;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -30px;
  right: 10px;
  color: white;
  border-radius: 1000px;
  font-weight: 700;
  font-style: italic;
  background: ${({ theme }) => theme.primary};
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  flex-direction: column;
`;

const UserName = styled.a`
  font-size: 28px;
  font-weight: 800;
  font-style: italic;
  color: ${({ theme }) => theme.primary};
  text-decoration: underline;
`;

const UserDescription = styled.p`
  margin-top: 0.25em;
`;

const UserLink = styled.a`
  border: 2px solid #383838;
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  margin-right: 1em;
  padding: 0.25em 1em;
  display: inline-block;
  margin-top: 0.5em;
`;

interface UserInfoProps {
  user: User;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const imageHolderRef = useRef<HTMLDivElement>(null);
  const [imageHolderWidth, setImageHolderWidth] = useState(0);

  console.log(user);

  useEffect(() => {
    const handleResize = () => {
      if (imageHolderRef.current) {
        const width = imageHolderRef.current.offsetWidth;
        setImageHolderWidth(width);

        const resizeObserver = new ResizeObserver((entries) => {
          // Loop through the entries
          for (let entry of entries) {
            if (imageHolderRef.current) {
              const width = imageHolderRef.current.offsetWidth;
              setImageHolderWidth(width);
            }

            // Check if width changed
            if (entry.contentRect.width !== entry.contentRect.width) {
              // Width changed, do something
            }
          }
        });

        // Start observing the target element
        resizeObserver.observe(imageHolderRef.current);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <UserInfoContainer>
      <Row>
        <Col md={4}>
          <UserImageHolder
            ref={imageHolderRef}
            $height={`${imageHolderWidth}px`}
          >
            <img
              src={ipfsURLtoNormal(user.profile.profileImage[0]?.url, 2)}
              height="100%"
            />
            <UserRankHolder>?</UserRankHolder>
          </UserImageHolder>
        </Col>
        <Col md={8}>
          <InfoContainer>
            <div>
              <UserName
                href={`https://universalprofile.cloud/${user.id}?network=mainnet`}
                target="_blank"
              >
                {user.profile.name}
              </UserName>
              <UserDescription>{user.profile.description}</UserDescription>
            </div>
            <div>
              {user.profile.links.map((link) => (
                <UserLink href={link.url} target="_blank">
                  {link.title}
                </UserLink>
              ))}
            </div>
          </InfoContainer>
        </Col>
      </Row>
    </UserInfoContainer>
  );
};
