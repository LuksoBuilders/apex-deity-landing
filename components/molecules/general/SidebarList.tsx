import styled from "styled-components";
import { ReactNode } from "react";
import Link from "next/link";

const SidebarListContainer = styled.div`
  border: 2px solid black;
  background-color: white;
`;

const ListHeader = styled.div`
  padding: 6px 12px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ListTitle = styled.h3`
  font-weight: 700;
  font-size: 20px;
`;

const ListNav = styled(Link)`
  font-weight: 500;
  font-style: italic;
  text-decoration: underline;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

const ListContent = styled.div``;

interface SidebarListProps {
  title: string;
  children: ReactNode;
  more: number;
  allRoute: string;
}

export const SidebarList = ({
  title,
  children,
  more,
  allRoute,
}: SidebarListProps) => {
  return (
    <SidebarListContainer>
      <ListHeader>
        <ListTitle>{title}</ListTitle>
        <ListNav href={allRoute}>
          See All {more > 0 ? `(+${more})` : ""}{" "}
        </ListNav>
      </ListHeader>
      <ListContent>{children}</ListContent>
    </SidebarListContainer>
  );
};
