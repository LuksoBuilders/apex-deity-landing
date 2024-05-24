import { ReactNode, useState } from "react";
import styled from "styled-components";

const TabPanelContainer = styled.div``;

const Tabs = styled.div`
  display: flex;
`;

interface TabsProps {
  $isSelected: boolean;
  $isLast: boolean;
  $isDisabled: boolean;
}

const Tab = styled.div<TabsProps>`
  border: 2px solid #383838;
  border-bottom: 0px;
  padding: 0.5em;
  min-width: 120px;
  text-align: center;
  font-size: 18px;
  font-weight: ${({ $isDisabled }) => ($isDisabled ? "400" : "600")};
  font-style: italic;
  border-right: ${({ $isLast }) => (!$isLast ? "0px" : "2px solid #383838")};
  background-color: ${({ $isSelected, theme, $isDisabled }) =>
    $isDisabled ? "#c8c8c8" : $isSelected ? theme.primary : "white"};
  color: ${({ $isSelected, $isDisabled }) =>
    $isDisabled ? "#888" : $isSelected ? "white" : "#383838"};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
`;

const ContentHolder = styled.div`
  border: 2px solid #383838;
  //padding: 1em;
`;

interface TabItem {
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabPanelProps {
  tabs: Array<TabItem>;
}

export const TabPanel = ({ tabs }: TabPanelProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <TabPanelContainer>
      <Tabs>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.label}
            $isLast={index === tabs.length - 1}
            $isSelected={index === selectedTab}
            $isDisabled={tab.disabled}
            onClick={() => {
              if (!tab.disabled) {
                setSelectedTab(index);
              }
            }}
          >
            {tab.label}
          </Tab>
        ))}
      </Tabs>
      <ContentHolder>{tabs[selectedTab].content}</ContentHolder>
    </TabPanelContainer>
  );
};
