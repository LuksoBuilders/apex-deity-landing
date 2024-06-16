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
import { Fellowship } from "../types/remoteTypes";
import { HighStatus } from "../organisms/user/HighStatus";

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
        purifiable
        contributions
      }
    }
  }
`;

const GET_HIGH_STATUS_FEELOWSHIP = gql`
  query Fellowship($fellowshipId: String!) {
    fellowship(id: $fellowshipId) {
      backerBucks {
        amount
        contributions
        id
        purifiable
        owner {
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

const HighStatusWrapper = () => {
  const highStatusFellowship = useQuery(GET_HIGH_STATUS_FEELOWSHIP, {
    variables: {
      fellowshipId: "0x6c1561280751f60358443a102f6bb68f64bfe64b",
    },
  });

  const { data, loading, error } = highStatusFellowship;

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

  const fellowship: Fellowship = data.fellowship

  //return <div></div>
  return <HighStatus backerBucks={fellowship.backerBucks} />;
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
          { label: "High Status", content: <HighStatusWrapper /> },
        ]}
      />
    </MainLayout>
  );
};
