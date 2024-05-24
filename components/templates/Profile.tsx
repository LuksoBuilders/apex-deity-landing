import { MainLayout, DeityInfo } from "../organisms";
import { Spacing } from "../atoms";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { UserInfo } from "../organisms";
import { CenteredDiv } from "../atoms";
import { BounceLoader } from "react-spinners";
import { Deity, User, Fellowship, BackerBuck } from "../types/remoteTypes";
import { FellowshipsList, TabPanel, DeitiesList } from "../organisms";

const GET_USER = gql`
  query User($userAddress: String!) {
    user(userAddress: $userAddress) {
      id
      profile {
        name
        links {
          url
          title
        }
        profileImage {
          url
        }
        tags
        description
      }
      backerBucks {
        id
        fellowship {
          name
          symbol
        }
        amount
      }
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
      deities {
        ...DeityBasicFields
        owner {
          ...ProfileFields
        }
      }
    }
  }
`;

export const Profile = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userAddress: router.query.id,
    },
  });

  const renderContent = () => {
    if (!data || loading || error) {
      return (
        <CenteredDiv>
          <BounceLoader />
        </CenteredDiv>
      );
    }

    const user: User = data.user;

    const getUserTabs = () => {
      let tabs = [];

      if (user.fellowships.length) {
        tabs.push({
          label: "Fellowships",
          content: <FellowshipsList fellowships={user.fellowships} />,
        });
      }

      if (user.deities.length) {
        tabs.push({
          label: "Deities",
          content: <DeitiesList deities={user.deities} />,
        });
      }

      return tabs;
    };

    //
    return (
      <>
        <Spacing spacing="0em"></Spacing>
        <UserInfo user={user} />

        <Spacing spacing="4em"></Spacing>
        <TabPanel tabs={getUserTabs()} />
      </>
    );
  };

  return <MainLayout>{renderContent()}</MainLayout>;
};
