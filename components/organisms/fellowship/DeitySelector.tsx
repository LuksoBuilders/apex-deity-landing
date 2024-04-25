import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { useState, useEffect } from "react";

import { Deity } from "../../types";

import { useDeities } from "../../hooks/useDeities";
import { CenteredDiv } from "../../atoms";

const DeitySelectorContainer = styled.div``;

const DeitiesListContainer = styled.div`
  margin-bottom: 2em;
  display: flex;
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
    case "s":
      return 2;
    case "a":
      return 1.5;
    case "b":
      return 1;
    case "c":
      return 0.5;
  }
};

interface DeitySelectorProps {
  selectedDeity: number | null;
  setSelectedDeity: Function;
}

export const DeitySelector = ({
  selectedDeity,
  setSelectedDeity,
}: DeitySelectorProps) => {
  const deities = useDeities([0, 78]);

  if (deities.loading)
    return (
      <CenteredDiv>
        <BounceLoader />
      </CenteredDiv>
    );

  const userDeities = Object.values(deities.data);

  const renderDeityItem = (deity: Deity) => {
    const isSelected = deity.id === selectedDeity;
    const isDisabled = deity.availableSlots === 0;

    return (
      <DeityItemContainer
        onClick={() => {
          if (!isDisabled) {
            setSelectedDeity(deity.id);
          }
        }}
        $isSelected={isSelected}
        $isDisabled={isDisabled}
      >
        {isDisabled && <DisabledOverlay />}
        <DeityImageHolder>
          <DeityItemImage src={deity.image} />
        </DeityImageHolder>
        <DeityItemInfo $isSelected={isSelected} $isDisabled={isDisabled}>
          <DeityItemName>
            {deity.tier.toUpperCase()}. {deity.name}
          </DeityItemName>
          <DeityItemSlots>
            Slots: <Important>{deity.availableSlots}</Important>/{deity.slots}
          </DeityItemSlots>
        </DeityItemInfo>
      </DeityItemContainer>
    );
  };

  return (
    <DeitySelectorContainer>
      <DeitiesListContainer>
        {userDeities.map((deity) => (
          <div key={deity.name}>{renderDeityItem(deity)}</div>
        ))}
      </DeitiesListContainer>

      <SelectedDeityInfoContainer>
        {selectedDeity === null ? (
          <NotSelectedDeity>
            You must select a founding deity to found one.
          </NotSelectedDeity>
        ) : (
          <SelectedDeityInfo>
            Since <Important>{deities.data[selectedDeity].name}</Important> is{" "}
            <Important>
              {deities.data[selectedDeity].tier.toUpperCase()}{" "}
            </Important>
            tier, it will receive{" "}
            <Important>
              {" "}
              {getDirectFeeBasedOnTier(deities.data[selectedDeity].tier)}%
              direct fee{" "}
            </Important>
            from this fellowship.
          </SelectedDeityInfo>
        )}
      </SelectedDeityInfoContainer>
    </DeitySelectorContainer>
  );
};
