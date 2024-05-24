import { MainLayout, DeityInfo } from "../organisms";
import { Spacing } from "../atoms";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FellowshipDescription, TabPanel, FellowshipsList } from "../organisms";
import { CenteredDiv } from "../atoms";
import { BounceLoader } from "react-spinners";
import { Deity } from "../types/remoteTypes";

const GET_DEITY = gql`
  query Query($deityId: String!) {
    deity(deityId: $deityId) {
      ...DeityBasicFields
      owner {
        ...ProfileFields
      }
      portfolio {
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
  }
`;

export const DeityDetails = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_DEITY, {
    variables: {
      deityId: router.query.id,
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

    const deity: Deity = data.deity;

    return (
      <>
        <Spacing spacing="0em"></Spacing>
        <DeityInfo deity={deity} />

        <Spacing spacing="4em"></Spacing>
        <TabPanel
          tabs={[
            {
              label: "Founded Fellowships",
              content: <FellowshipsList fellowships={deity.portfolio} />,
            },
          ]}
        />
      </>
    );
  };

  return <MainLayout>{renderContent()}</MainLayout>;
};
