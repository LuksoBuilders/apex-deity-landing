import styled from "styled-components";
import { useUPBasicInfo } from "../../hooks";
import { BounceLoader } from "react-spinners";
import { CenteredDiv, Spacing, CircledImage } from "../../atoms";
import { TextField } from "../../molecules";
import { ethers } from "ethers";
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

const UniversalProfileInputContainer = styled.div``;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.primary};
`;

const ProfileDataContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.h4`
  margin-left: 0.5em;
`;

interface InputProfileRendererProps {
  address: string;
}

export const InputProfileRenderer = ({
  address,
}: InputProfileRendererProps) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userAddress: address },
  });

  if (loading)
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );

  if (error)
    return (
      <ErrorMessage>
        Are you sure this address is a proper Universal Profile? We can not find
        the profile :(
      </ErrorMessage>
    );

  const { user } = data;

  if (data)
    return (
      <ProfileDataContainer>
        <CircledImage
          height="60px"
          width="60px"
          src={ipfsURLtoNormal(user.profile.profileImage[0].url)}
        />
        <Username>{user.profile.name}</Username>
      </ProfileDataContainer>
    );
};

interface UniversalProfileInputProps {
  label: string;
  address: string;
  setAddress: Function;
}

export const UniversalProfileInput = ({
  label,
  address,
  setAddress,
}: UniversalProfileInputProps) => {
  const profile = useUPBasicInfo(address);

  const renderProfile = () => {
    if (profile.loading)
      return (
        <CenteredDiv>
          <BounceLoader />
        </CenteredDiv>
      );

    if (profile.error)
      return (
        <ErrorMessage>
          Are you sure this address is a proper Universal Profile? We can not
          find the profile :(
        </ErrorMessage>
      );

    if (profile.data)
      return (
        <ProfileDataContainer>
          <CircledImage height="60px" width="60px" src={profile.data.avatar} />
          <Username>{profile.data.name}</Username>
        </ProfileDataContainer>
      );
  };

  return (
    <UniversalProfileInputContainer>
      <TextField
        value={address}
        onChange={(v: string) => {
          setAddress(v);
        }}
        label={label}
      />
      <Spacing spacing="1em" />

      {ethers.utils.isAddress(address.toLowerCase()) ? (
        <InputProfileRenderer address={address.toLowerCase()} />
      ) : (
        <ErrorMessage>
          Artisan Universal Profile Address is required. A fellowship is
          meaningless without an Artisan.
        </ErrorMessage>
      )}
    </UniversalProfileInputContainer>
  );
};
