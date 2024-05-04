import { MainLayout } from "../organisms";
import { Spacing } from "../atoms";

import { FellowshipInfo, BackerBuckPanel } from "../organisms";

export const FellowshipDetails = () => {
  return (
    <MainLayout>
      <Spacing spacing="0em"></Spacing>
      <FellowshipInfo />
      <Spacing spacing="2em"></Spacing>
      <BackerBuckPanel />
    </MainLayout>
  );
};
