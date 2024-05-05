import { ReactNode, useState } from "react";
import styled from "styled-components";

const TabPanelContainer = styled.div``;

const Tabs = styled.div`
  display: flex;
`;

interface TabsProps {
  $isSelected: boolean;
  $isLast: boolean;
}

const Tab = styled.div<TabsProps>`
  border: 2px solid #383838;
  border-bottom: 0px;
  padding: 0.5em;
  min-width: 120px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  font-style: italic;
  border-right: ${({ $isLast }) => (!$isLast ? "0px" : "2px solid #383838")};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.primary : "white"};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "#383838")};
  cursor: pointer;
`;

const ContentHolder = styled.div`
  border: 2px solid #383838;
  padding: 1em;
`;

interface TabItem {
  label: string;
  content: ReactNode;
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
            $isLast={index === tabs.length - 1}
            $isSelected={index === selectedTab}
            onClick={() => setSelectedTab(index)}
          >
            {tab.label}
          </Tab>
        ))}
      </Tabs>
      <ContentHolder>{tabs[selectedTab].content}</ContentHolder>
    </TabPanelContainer>
  );
};
