import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import { Deity } from "../../types/remoteTypes";
import { ipfsURLtoNormal } from "../../utils";

import { useDeities } from "../../hooks/useDeities";
import { CenteredDiv } from "../../atoms";

const GET_DEITIES = gql`
  query userDeities($userAddress: String!) {
    userDeities(userAddress: $userAddress) {
      id
      level
      metadata {
        assets {
          fileType
          url
          verificationData
          verificationFunction
        }
        attributes {
          key
          type
          value
        }
        description
        images {
          height
          url
          verificationData
          verificationFunction
          width
        }
        links {
          title
          url
        }
        mythology
        name
        story
      }
      owner {
        id
      }
      portfolio {
        id
      }
      slots {
        id
        index
        usedAt
      }
      tier
      tokenIdNumber
      withdrawable
      xp
    }
  }
`;

const DeitySelectorContainer = styled.div``;

const DeitiesListContainer = styled.div`
  margin-bottom: 1em;
  display: flex;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 1em;
`;

interface DeityItemProps {
  $isSelected: boolean;
  $isDisabled: boolean;
}

const DeityItemContainer = styled.div<DeityItemProps>`
  border: 2px solid
    ${(props) =>
      props.$isSelected && !props.$isDisabled ? " #393939" : "#f0f0f0"};
  margin-right: 1em;
  cursor: ${(props) => (props.$isDisabled ? " not-allowed" : "pointer")};
  box-sizing: border-box;
  transition: 200ms;
  position: relative;
  overflow-x: auto;
  &:hover {
    border: 2px solid
      ${(props) => (!props.$isDisabled ? " #393939" : "#f0f0f0")};
  }
`;

const DisabledOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(250, 250, 250, 0.5);
`;

const DeityImageHolder = styled.div`
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeityItemImage = styled.img`
  height: 90%;
`;

const DeityItemInfo = styled.div<DeityItemProps>`
  transition: 200ms;

  border-top: 1px solid
    ${(props) => (props.$isSelected ? " #393939" : "#f0f0f0")};
  padding: 0.5em 1em;
`;

const DeityItemName = styled.h5`
  font-size: 1em;
`;

const DeityItemSlots = styled.p`
  font-style: italic;
  font-size: 0.9em;
`;

const Important = styled.b`
  font-weight: 600;
`;

const SelectedDeityInfoContainer = styled.div``;

const NotSelectedDeity = styled.p`
  color: ${({ theme }) => theme.primary};
`;

const SelectedDeityInfo = styled.p``;

const getDirectFeeBasedOnTier = (tier: string) => {
  switch (tier) {
    case "S":
      return 2;
    case "A":
      return 1.5;
    case "B":
      return 1;
    case "C":
      return 0.5;
  }
};

interface DeitySelectorProps {
  selectedDeity: Deity | null;
  setSelectedDeity: Function;
  userAddress: string;
}

export const DeitySelector = ({
  selectedDeity,
  setSelectedDeity,
  userAddress,
}: DeitySelectorProps) => {
  const { data, loading, error } = useQuery(GET_DEITIES, {
    variables: {
      userAddress: userAddress,
    },
  });

  if (loading)
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );

  const userDeities = data.userDeities;

  const renderDeityItem = (deity: Deity) => {
    const isSelected = deity.id === selectedDeity?.id;
    const availableSlots = deity.slots.filter(
      (slot) =>
        Number(slot.usedAt) * 1000 < Number(new Date()) - 7 * 24 * 3600 * 1000
    ).length;

    const isDisabled = availableSlots === 0;

    return (
      <DeityItemContainer
        onClick={() => {
          if (!isDisabled) {
            setSelectedDeity(deity);
          }
        }}
        $isSelected={isSelected}
        $isDisabled={isDisabled}
      >
        {isDisabled && <DisabledOverlay />}
        <DeityImageHolder>
          <DeityItemImage
            src={ipfsURLtoNormal(String(deity.metadata?.images?.[0]?.[3]?.url))}
          />
        </DeityImageHolder>
        <DeityItemInfo $isSelected={isSelected} $isDisabled={isDisabled}>
          <DeityItemName>
            {deity.tier.toUpperCase()}. {deity.metadata?.name}
          </DeityItemName>
          <DeityItemSlots>
            Slots: <Important>{availableSlots}</Important>/{deity.slots.length}
          </DeityItemSlots>
        </DeityItemInfo>
      </DeityItemContainer>
    );
  };

  const selectedDeityItem = selectedDeity;

  return (
    <DeitySelectorContainer>
      <DeitiesListContainer>
        {userDeities?.map((deity: Deity) => (
          <div key={deity.id}>{renderDeityItem(deity)}</div>
        ))}
      </DeitiesListContainer>

      <SelectedDeityInfoContainer>
        {selectedDeity === null ? (
          <NotSelectedDeity>
            You must select a founding deity to found one.
          </NotSelectedDeity>
        ) : (
          <SelectedDeityInfo>
            Since <Important>{selectedDeityItem?.metadata?.name}</Important> is{" "}
            <Important>{selectedDeityItem?.tier.toUpperCase()} </Important>
            tier, it will receive{" "}
            <Important>
              {" "}
              {getDirectFeeBasedOnTier(String(selectedDeityItem?.tier))}% direct
              fee{" "}
            </Important>
            from this fellowship.
          </SelectedDeityInfo>
        )}
      </SelectedDeityInfoContainer>
    </DeitySelectorContainer>
  );
};
