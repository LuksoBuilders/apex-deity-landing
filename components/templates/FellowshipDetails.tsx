import { MainLayout } from "../organisms";
import { Spacing } from "../atoms";
import { Row, Col } from "react-grid-system";

import {
  FellowshipInfo,
  BackerBuckPanel,
  FellowshipDescription,
  TabPanel,
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
          { label: "Contributors", content: <div>Hello world!</div> },
          { label: "Endorsers", content: <FellowshipDescription /> },
        ]}
      />
    </MainLayout>
  );
};
