import { MainLayout } from "../organisms";
import { Spacing } from "../atoms";
import { Row, Col } from "react-grid-system";

import {
  FellowshipInfo,
  BackerBuckPanel,
  FellowshipDescription,
  TabPanel,
  ContributorsList,
} from "../organisms";

export const FellowshipDetails = () => {
  return (
    <MainLayout>
      <Spacing spacing="0em"></Spacing>
      <FellowshipInfo />
      <Spacing spacing="2em"></Spacing>
      <BackerBuckPanel />
      <Spacing spacing="2em"></Spacing>
      <TabPanel
        tabs={[
          { label: "Description", content: <FellowshipDescription /> },
          { label: "Contributors", content: <ContributorsList /> },
          { label: "Endorsers", content: <FellowshipDescription /> },
        ]}
      />
    </MainLayout>
  );
};
