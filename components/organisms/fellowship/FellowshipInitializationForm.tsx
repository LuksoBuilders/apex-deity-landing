import { useState } from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import { useRouter } from "next/router";

import { useUninitializedFellowhsip } from "../../hooks";
import { BounceLoader } from "react-spinners";
import { Spacing, CircledImage } from "../../atoms";
import { TextField, Button } from "../../molecules";
import { useExtention } from "../../hooks/useExtension";

import { Fellowship, FellowshipPrices } from "../../types/remoteTypes";
import { gql, useQuery } from "@apollo/client";

import { PriceConfiguration } from "./PriceConfiguration";

const GET_FELLOWSHIP = gql`
  query Fellowship($fellowshipId: String!) {
    fellowship(id: $fellowshipId) {
      founder {
        id
        metadata {
          name
        }
      }
      version
    }
  }
`;

const FellowshipInitializationFormContainer = styled.div``;

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

interface FellowshipInitializationFormProps {}

export const FellowshipInitializationForm =
  ({}: FellowshipInitializationFormProps) => {
    const router = useRouter();
    const { initializeV2Fellowship } = useExtention();

    const [initializing, setInitializing] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [avatar, setAvatar] = useState<File>();
    const [symbol, setSymbol] = useState<string>("");

    const [initialPrice, setPrice] = useState("1");
    const [diminishingFactor, setDiminishingFactor] = useState(1000);
    const [initialGrowthRate, setIGR] = useState(100);
    const [eventualGrowthRate, setEGR] = useState(10);

    const { query } = useRouter();
    const { error, loading, data } = useQuery(GET_FELLOWSHIP, {
      variables: { fellowshipId: query.id },
    });

    const fellowshipAddress = query.id;
    const fellowship: Fellowship = data?.fellowship;

    const isDisbaled = !name || !description || !symbol || !avatar;

    console.log(fellowship.version)

    return (
      <FellowshipInitializationFormContainer>
        <Title>Fellowship Initialization</Title>
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
          This Fellowship is the place that you as an Artisan can find the
          initial funding and community you need to build your creation.
        </Paragraph>
        <Spacing spacing="2em" />
        <SectionTitle>Primary Info</SectionTitle>
        <Spacing spacing="0.5em" />
        <Paragraph>
          Fellowship helps your supporters, commit to your project by minting
          faith tokens. Those faith tokens are called backer bucks. You can
          choose a name and a symbol for your fellowship backerbuck.
        </Paragraph>
        <Spacing spacing="0.5em" />

        <Paragraph>
          You <b>CAN NOT</b> change the name and symbol of your
          fellowship&apos;s backerbuck after creation.
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
              value={name}
              onChange={(v: string) => {
                setName(v);
              }}
              label="Fellowship name *"
              helperText=""
            />
          </Col>
          <Col md={6}>
            <TextField
              value={symbol}
              onChange={(v: string) => {
                setSymbol(v);
              }}
              label="Fellowship Symbol *"
              helperText="Usually 3 or 4 characters."
            />
          </Col>
        </Row>
        <Spacing spacing="2em" />
        {fellowship && fellowship.version === "2" ? (
          <>
            <SectionTitle>Price Configuration</SectionTitle>
            <PriceConfiguration
              initialPrice={initialPrice}
              setPrice={setPrice}
              diminishingFactor={diminishingFactor}
              setDiminishingFactor={setDiminishingFactor}
              initialGrowthRate={initialGrowthRate}
              setIGR={setIGR}
              eventualGrowthRate={eventualGrowthRate}
              setEGR={setEGR}
            />
          </>
        ) : (
          <></>
        )}
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
                setInitializing(true);
                await initializeV2Fellowship(
                  String(fellowshipAddress),
                  name,
                  symbol,
                  avatar,
                  description,
                  initialPrice,
                  initialGrowthRate,
                  eventualGrowthRate,
                  diminishingFactor
                );
                router.push(`/fellowship/${query.id}`);
                setInitializing(true);
              } catch (err) {
                console.error(err);
                setInitializing(false);
              }
            }}
            disabled={isDisbaled || initializing}
            variant="contained"
            color="primary"
          >
            {initializing ? "Initializing" : "Initialize"}
          </Button>
        </ActionButtonContainer>
      </FellowshipInitializationFormContainer>
    );
  };
