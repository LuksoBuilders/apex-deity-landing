import { MainLayout, DeityInfo } from "../organisms";
import { Spacing } from "../atoms";

import { FellowshipDescription, TabPanel, FellowshipsList } from "../organisms";
export const DeityDetails = () => {
  return (
    <MainLayout>
      <Spacing spacing="0em"></Spacing>
      <DeityInfo />

      <Spacing spacing="4em"></Spacing>
      <TabPanel
        tabs={[{ label: "Founded Fellowships", content: <FellowshipsList /> }]}
      />
    </MainLayout>
  );
};
