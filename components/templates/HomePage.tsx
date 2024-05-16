import { MainLayout, Hero, TabPanel, FellowshipsList } from "../organisms";
import { Spacing } from "../atoms";

export const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <Spacing spacing="4em"></Spacing>
      <TabPanel
        tabs={[
          { label: "Fellowships", content: <FellowshipsList /> },
          { label: "Deities", content: <div></div>, disabled: true },
          { label: "High Status", content: <div></div>, disabled: true },
        ]}
      />
    </MainLayout>
  );
};
