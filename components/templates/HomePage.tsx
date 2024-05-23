import { MainLayout, Hero, TabPanel, FellowshipsList } from "../organisms";
import { Spacing } from "../atoms";
import { gql, useQuery } from "@apollo/client";

const GET_FELLOWSHIPS = gql`
  query Fellowships {
    fellowships {
      ...FellowshipBasicFields
      ...FellowshipDataFields
      ...FellowshipPricesFields
      artisan {
        ...ArtisanFields
      }
      founder {
        ...FounderFields
      }
    }
  }
`;

export const HomePage = () => {
  const fellowships = useQuery(GET_FELLOWSHIPS);

  return (
    <MainLayout>
      <Hero />
      <Spacing spacing="4em"></Spacing>
      <TabPanel
        tabs={[
          {
            label: "Fellowships",
            content: (
              <FellowshipsList fellowships={fellowships.data?.fellowships} />
            ),
          },
          { label: "Deities", content: <div></div>, disabled: true },
          { label: "High Status", content: <div></div>, disabled: true },
        ]}
      />
    </MainLayout>
  );
};
