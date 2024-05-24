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
import { CenteredDiv } from "../atoms";
import { BounceLoader } from "react-spinners";

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

const DeitiesListWrapper = () => {
  const deities = useQuery(GET_DEITIES);

  const { loading, error } = deities;

  console.log(loading, error);

  if (loading || error) {
    return (
      <div style={{ padding: "1em" }}>
        <CenteredDiv>
          <BounceLoader />
        </CenteredDiv>
      </div>
    );
  }

  return <DeitiesList deities={deities.data?.deities} />;
};

const UsersListWrapper = () => {
  const users = useQuery(GET_USERS);

  const { loading, error } = users;

  console.log(loading, error);

  if (loading || error) {
    return (
      <div style={{ padding: "1em" }}>
        <CenteredDiv>
          <BounceLoader />
        </CenteredDiv>
      </div>
    );
  }

  return <UsersList users={users.data?.users} />;
};

export const HomePage = () => {
  const fellowships = useQuery(GET_FELLOWSHIPS);
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
            content: <DeitiesListWrapper />,
          },
          {
            label: "Top Backers",
            content: <UsersListWrapper />,
          },
          { label: "High Status", content: <div></div>, disabled: true },
        ]}
      />
    </MainLayout>
  );
};
