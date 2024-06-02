import { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import { useRouter } from "next/router";

import { BounceLoader } from "react-spinners";
import { Spacing, CircledImage } from "../../atoms";
import { TextField, Button } from "../../molecules";
import { useExtention } from "../../hooks/useExtension";

import { Fellowship } from "../../types/remoteTypes";
import { gql, useQuery } from "@apollo/client";
import { ipfsURLtoNormal } from "../../utils";

const GET_FELLOWSHIP = gql`
  query Fellowship($fellowshipId: String!) {
    fellowship(id: $fellowshipId) {
      name
      symbol
      address
      metadata
      info {
        assets {
          url
        }
        attributes {
          key
          type
          value
        }
        description
        images {
          url
        }
        links {
          title
          url
        }
      }
      artisan {
        id
        profile {
          name
          profileImage {
            url
          }
        }
      }
      founder {
        id
        metadata {
          name
          images {
            url
          }
        }
      }
      backerBucks {
        id
      }
      contributionAddress
      contributions {
        id
      }
      endorsementAddress
      endorsements {
        id
      }
      currentPrice
      initialPrice
      priceGrowth
      totalSupply
    }
  }
`;

const FellowshipEditFormContainer = styled.div``;

const Title = styled.h1`
  font-size: 28px;
  color: #393939;
`;

const SectionTitle = styled.h5`
  font-size: 21px;
  color: #393939;
`;

const Paragraph = styled.p`
  color: #393939;
  font-weight: 300;
`;

const FounderContainer = styled.h4``;

const Important = styled.span`
  font-weight: 500;
  font-style: italic;
`;

const Founder = styled.span`
  margin-left: 0.5em;
  color: ${({ theme }) => theme.primary};
`;

const LogoFieldContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoItem = styled.div`
  margin-left: 2em;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

async function fileFromUrl(url: string, fileName: string) {
  console.log("???");
  try {
    // Step 1: Fetch the file data from the URL

    console.log(url);

    const response = await fetch(url);

    console.log(response);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Step 2: Convert the fetched data to a Blob
    const blob = await response.blob();

    console.log(blob);

    // Step 3: Create a File object from the Blob
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error("Error fetching file from URL:", error);
    throw error;
  }
}

interface FellowshipEditFormProps {}

export const FellowshipEditForm = ({}: FellowshipEditFormProps) => {
  const router = useRouter();
  const { editFellowship } = useExtention();

  const [editing, setEditing] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [avatar, setAvatar] = useState<File>();
  const [symbol, setSymbol] = useState<string>("");

  const { query } = useRouter();
  const { error, loading, data } = useQuery(GET_FELLOWSHIP, {
    variables: { fellowshipId: query.id },
  });

  const fellowshipAddress = query.id;
  const fellowship: Fellowship = data?.fellowship;

  useEffect(() => {
    const main = async () => {
      if (fellowship) {
        console.log("here?");
        try {
          const fellowshipImage = await fileFromUrl(
            ipfsURLtoNormal(fellowship.info.images[0]?.[0].url, 1),
            "logo"
          );
          setAvatar(fellowshipImage);
        } catch (err) {
          try {
            console.log("are we here?", err);
            const fellowshipImage = await fileFromUrl(
              ipfsURLtoNormal(fellowship.info.images[0]?.[0].url, 0),
              "logo"
            );
            setAvatar(fellowshipImage);
          } catch (err) {
            console.error(err);
          }
        }

        setDescription(fellowship.info.description);
      }
    };

    main();
  }, [fellowship]);

  if (!fellowship) {
    return <div></div>;
  }

  const isDisbaled = !description || !avatar;

  return (
    <FellowshipEditFormContainer>
      <Title>Fellowship Edit</Title>
      <Spacing spacing="0.5em" />
      <FounderContainer>
        Founded By:{" "}
        <Founder>
          {!fellowship ? (
            <BounceLoader size={22} />
          ) : (
            fellowship.founder.metadata.name
          )}
        </Founder>
      </FounderContainer>
      <Spacing spacing="1em" />
      <Paragraph>
        This Fellowship is the place that you as an Artisan can find the initial
        funding and community you need to build your creation.
      </Paragraph>
      <Spacing spacing="2em" />
      <SectionTitle>Primary Info</SectionTitle>
      <Spacing spacing="0.5em" />
      <Paragraph>
        Fellowship helps your supporters, commit to your project by minting
        faith tokens. Those faith tokens are called backer bucks. You can choose
        a name and a symbol for your fellowship backerbuck.
      </Paragraph>
      <Spacing spacing="0.5em" />

      <Paragraph>
        You <b>CAN NOT</b> change the name and symbol of your fellowship&apos;s
        backerbuck after creation.
      </Paragraph>

      <Spacing spacing="0.5em" />
      <Paragraph>
        The name of your Fellowship would be the same as the name of its
        BackerBuck.
      </Paragraph>
      <Spacing spacing="0.5em" />
      <Row>
        <Col md={6}>
          <TextField
            disabled={true}
            value={fellowship.name}
            onChange={(v: string) => {
              setName(v);
            }}
            label="Fellowship name *"
            helperText=""
          />
        </Col>
        <Col md={6}>
          <TextField
            disabled
            value={fellowship.symbol}
            onChange={(v: string) => {
              setSymbol(v);
            }}
            label="Fellowship Symbol *"
            helperText="Usually 3 or 4 characters."
          />
        </Col>
      </Row>

      <Spacing spacing="2em" />
      <SectionTitle>Metadata</SectionTitle>
      <Spacing spacing="0.5em" />
      <Paragraph>
        Metadata is the information that <b>you can</b> change later, as the
        artisan of the fellowship.
      </Paragraph>
      <Spacing spacing="2em" />

      <LogoFieldContainer>
        <Button
          onChange={(e) => {
            setAvatar(e.target.files?.[0]);
          }}
          variant="contained"
          fileUploader
          color="black"
        >
          Select Logo
        </Button>

        {avatar && (
          <LogoItem>
            <CircledImage
              width="120px"
              height="120px"
              src={URL.createObjectURL(avatar)}
            />
          </LogoItem>
        )}
      </LogoFieldContainer>

      <Spacing spacing="2em" />
      <Paragraph>
        Description <Important>supports md format</Important>. We will improve
        this section later but for now you use your favourite md editor.
      </Paragraph>
      <TextField
        value={description}
        onChange={(v: string) => {
          setDescription(v);
        }}
        label="Description"
        helperText=""
        multiline
      />

      <Spacing spacing="2em" />

      <ActionButtonContainer>
        <Button
          onClick={async () => {
            try {
              setEditing(true);
              await editFellowship(
                String(fellowshipAddress),
                avatar,
                description
              );
              setEditing(true);
              router.push(`/fellowship/${query.id}`);
            } catch (err) {
              console.error(err);
              setEditing(false);
            }
          }}
          disabled={isDisbaled || editing}
          variant="contained"
          color="primary"
        >
          {editing ? "Editing" : "Edit"}
        </Button>
      </ActionButtonContainer>
    </FellowshipEditFormContainer>
  );
};
