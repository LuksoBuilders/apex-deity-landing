import styled from "styled-components";
import { ReactNode } from "react";

interface SidebarListItemContainerProps {
  finish: boolean;
}

const SidebarListItemContainer = styled.div<SidebarListItemContainerProps>`
  padding: 10px;
  border-bottom: ${({ finish }) => (!finish ? "1px solid black" : "0px")};
  cursor: pointer;
  transition: 200ms;
  &:hover {
    background-color: #f1f1f1;
  }
`;

interface SidebarListItemProps {
  finish?: boolean;
  children: ReactNode;
}

export const SidebarListItem = ({
  finish = false,
  children,
}: SidebarListItemProps) => {
  return (
    <SidebarListItemContainer finish={finish}>
      {children}
    </SidebarListItemContainer>
  );
};
