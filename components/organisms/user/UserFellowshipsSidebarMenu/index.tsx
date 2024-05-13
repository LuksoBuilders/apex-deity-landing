import styled from "styled-components";
import { SidebarList } from "../../../molecules";
import { ethers } from "ethers";
import { Deity } from "../../../types";
import { UserFellowshipsSidebarListItem } from "./UserFellowshipsSidebarItem";
import { SidebarListItem } from "../../../molecules/general/SidebarListItem";
import { Fellowship } from "../../../types/remoteTypes";

interface UserFellowshipsSidebarMenuInterface {
  fellowships: Array<Fellowship>;
}

export const UserFellowshipsSidebarMenu = ({
  fellowships,
}: UserFellowshipsSidebarMenuInterface) => {
  return (
    <SidebarList
      title="Your Fellowships"
      more={fellowships.length - 2}
      allRoute="/my-fellowships"
    >
      <div>
        {fellowships.map((fellowship, i) => (
          <SidebarListItem finish={i == fellowships.length - 1} key={i}>
            <UserFellowshipsSidebarListItem fellowship={fellowship} />
          </SidebarListItem>
        ))}
      </div>
    </SidebarList>
  );
};
