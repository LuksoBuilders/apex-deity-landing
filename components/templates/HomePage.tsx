import {
  MainLayout,
  Hero,
  TabPanel,
  FellowshipsList,
  DeitiesList,
  UsersList,
} from "../organisms";
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

const GET_DEITIES = gql`
  {
    deities {
      ...DeityBasicFields
      owner {
        ...ProfileFields
      }
    }
  }
`;

const GET_USERS = gql`
  {
    users {
      id
      profile {
        name
        profileImage {
          url
        }
        avatar {
          url
        }
      }
      backerBucks {
        id
        amount
        fellowship {
          id
          currentPrice
        }
      }
    }
  }
`;

export const HomePage = () => {
  const fellowships = useQuery(GET_FELLOWSHIPS);
  const deities = useQuery(GET_DEITIES);
  const users = useQuery(GET_USERS);

  console.log(users);

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
          {
            label: "Deities",
            content: <DeitiesList deities={deities.data?.deities} />,
          },
          {
            label: "Top Backers",
            content: <UsersList users={users.data?.users} />,
          },
          { label: "High Status", content: <div></div>, disabled: true },
        ]}
      />
    </MainLayout>
  );
};
