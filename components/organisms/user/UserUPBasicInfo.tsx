import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { useUPBasicInfo } from "../../hooks";
import { CenteredDiv, CircledImage, Spacing } from "../../atoms";

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
  const { data, loading, error } = useUPBasicInfo(userAddress);

  if (error) {
    console.error(error);
  }

  if (loading)
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );

  if (data) {
    return (
      <div>
        <CenteredDiv>
          <CircledImage
            height="160px"
            width="160px"
            padding="4px"
            src={data.avatar}
          />
        </CenteredDiv>
        <Spacing spacing={"8px"} />
        <CenteredDiv>
          <UPName>{data.name}</UPName>
        </CenteredDiv>
        <CenteredDiv>
          <UPUserName>{data.username}</UPUserName>
        </CenteredDiv>
      </div>
    );
  }

  return <></>;
};
