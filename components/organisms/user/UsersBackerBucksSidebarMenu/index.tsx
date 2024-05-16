import styled from "styled-components";
import { SidebarList } from "../../../molecules";
import { ethers } from "ethers";
import { Deity } from "../../../types";
import { UserBackerBucksSidebarListItem } from "./UserBackerBuckSidebarItem";
import { SidebarListItem } from "../../../molecules/general/SidebarListItem";
import { BackerBuck } from "../../../types/remoteTypes";

interface UserBackerbucksSidebarMenuInterface {
  backerBucks: Array<BackerBuck>;
}

export const UserBackerBucksSidebarMenu = ({
  backerBucks,
}: UserBackerbucksSidebarMenuInterface) => {
  if (backerBucks.length === 0) return <div></div>;

  return (
    <SidebarList
      title="Your BackerBucks"
      more={backerBucks.length - 2}
      allRoute="/my-fellowships"
    >
      <div>
        {backerBucks.map((backerBuck, i) => (
          <SidebarListItem finish={i == backerBucks.length - 1} key={i}>
            <UserBackerBucksSidebarListItem backerBuck={backerBuck} />
          </SidebarListItem>
        ))}
      </div>
    </SidebarList>
  );
};
