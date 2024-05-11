import styled from "styled-components";
import { useUPBasicInfo } from "../../hooks";
import { BounceLoader } from "react-spinners";
import { CenteredDiv, Spacing, CircledImage } from "../../atoms";
import { TextField } from "../../molecules";
import { ethers } from "ethers";

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
        renderProfile()
      ) : (
        <ErrorMessage>
          Artisan Universal Profile Address is required. A fellowship is
          meaningless without an Artisan.
        </ErrorMessage>
      )}
    </UniversalProfileInputContainer>
  );
};
