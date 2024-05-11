import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { useUPBasicInfo } from "../../hooks";
import { CenteredDiv, CircledImage, Spacing } from "../../atoms";
import { useQuery, gql } from "@apollo/client";
import { ipfsURLtoNormal } from "../../utils";

const GET_USER = gql`
  query Query($userAddress: String!) {
    user(userAddress: $userAddress) {
      id
      profile {
        avatar {
          fileType
          url
        }
        backgroundImage {
          height
          url
          width
        }
        description
        links {
          title
          url
        }
        name
        profileImage {
          address
          height
          tokenId
          url
          width
        }
        tags
      }
    }
  }
`;

const UPName = styled.h4`
  font-size: 28px;
`;

const UPUserName = styled.h4`
  font-size: 15px;
  font-weight: 300;
  color: ${({ theme }) => theme.primaryLight};
`;

interface UserUPBasicInfoProps {
  userAddress: string;
}

export const UserUPBasicInfo = ({ userAddress }: UserUPBasicInfoProps) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userAddress },
  });

  if (error) {
    console.error(error);
  }

  if (loading || error)
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );

  const user = data.user;

  if (user) {
    return (
      <div>
        <CenteredDiv>
          <CircledImage
            height="160px"
            width="160px"
            padding="4px"
            src={ipfsURLtoNormal(user.profile.profileImage?.[0].url)}
          />
        </CenteredDiv>
        <Spacing spacing={"8px"} />
        <CenteredDiv>
          <UPName>{user.profile.name}</UPName>
        </CenteredDiv>
        {/*<CenteredDiv>
          <UPUserName>{data.username}</UPUserName>
    </CenteredDiv>*/}
      </div>
    );
  }

  return <></>;
};
