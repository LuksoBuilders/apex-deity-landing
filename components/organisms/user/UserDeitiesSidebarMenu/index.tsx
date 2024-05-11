import styled from "styled-components";
import { SidebarList } from "../../../molecules";

import { Deity } from "../../../types/remoteTypes";
import { useDeities } from "../../../hooks/useDeities";
import { UserDeitiesSidebarListItem } from "./UserDeitiesSidebarListItem";
import { SidebarListItem } from "../../../molecules/general/SidebarListItem";

interface UserDeitiesSidebarMenuInterface {
  deities: Array<Deity>;
}

export const UserDeitiesSidebarMenu = ({
  deities,
}: UserDeitiesSidebarMenuInterface) => {
  return (
    <SidebarList
      title="Your Deities"
      more={deities.length - 2}
      allRoute="/my-deities"
    >
      <div>
        {deities.map((deity, i) => (
          <SidebarListItem finish={i == deities.length - 1} key={i}>
            <UserDeitiesSidebarListItem deity={deity} />
          </SidebarListItem>
        ))}
      </div>
    </SidebarList>
  );
};
