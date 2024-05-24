import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { PaddedContainer } from "../../atoms";

import Markdown from "react-markdown";

const FellowshipDescriptionContainer = styled.div``;

interface FellowshipDescriptionProps {}

const markdown = `# Daturum utinam circumfususque monitis pensa heu ducit

## Qua Proserpina tecta

Lorem markdownum misero! **Turba quaerenti**. Nec ego: adfata exploratis apex
falsa Maera Olympo in antiquo terrae exsiluisse obsessa caestibus. Flumina in et
illa non aethera et Cycnum noscar, bubo cives atque audire. Collem volatu; hic
reddidit semidei [fatigat](http://amor.net/diuartibus)!

> Thebae Corycidas ictu confusa **ad sperare erant** sedesque, lynca. Arma
> terraeque non ego alit os satis Phorcynida sub ictus intremuere amores
> dignissime ab move quam vivitur pugnae. Ubi Eoo dextra nactus corpora
> securibus coetusque sine; dumque casusve interea electus, his arbiter videtur
> labores?

Vaga est purpureasque [terret](http://mora.com/saxa-nunc). [Senis
coeamus](http://dextrumcorpus.com/) ingens ea geminato curvat arbitrium egerat
vulneribus cursu at credunt aniles, illa plurimus gregibus, Eumenidum. Sibila
magni! Opem vocati de timuere regis, ibat hic fuge et regna et Ceycis **urbes
pugnantem**. Arboribus aliter atra nec petebat undique quarum: ceditis in
dummodo.

## Crescentem est lacertis nunc pharetramque saeva quoque

Dicat mota quae cum deus, gener, ad regia Hectoris plangoris iussa potuisse
secuta Euagrum quisquis et stramine ex. Petit vestros, peteret tum vires
delicuit: in tuum et.

> Sit moenia undis **latus** Hylonome ad de artes diuque passosque. Cernit nam
> aperto memorante Midae laniaverat pacatum amicitiae et Hectore pectore,
> frigoris. Manu ille *neque* spissisque qua: nocens, vigili longo. Hippodamen
> *coepere plus*, cum [ferre sinamus](http://umeros.io/undis)!

Tantis novus et est vertice Dryasque inpetus Procne: et imago iam ipse novum
commenta in. Tenebras regere pectora, manu cortice innocuos candidus: heu sic
fugis quoque.

Cognovit nata Alpheos pelagi mensae. [Factum mihi](http://fumant.org/) illa
feretro paratibus tu quae parent, domus quam edentem, modo. Iuvenes novi artes
thyrsos veterum dabuntur Bacchus quondam Creteque Victor mitisque robustior
[membris sanguine](http://egoquem.io/) cernis erat. Iunonia solebant cum arenti
natorum. Iniqui est, orbem nostri [Argos venti](http://vincatfugit.io/mox)
tollens amor sanguinis nullos est spinosis **tergo nec** habuere Peleus.`;

const GET_FELLOWSHIP = gql`
  query Fellowship($fellowshipId: String!) {
    fellowship(id: $fellowshipId) {
      id
      metadata
      info {
        description
      }
    }
  }
`;

export const FellowshipDescription = ({}: FellowshipDescriptionProps) => {
  const { query } = useRouter();

  const { error, loading, data } = useQuery(GET_FELLOWSHIP, {
    variables: { fellowshipId: query.id },
  });

  if (loading || error) {
    return <div></div>;
  }

  const fellowship = data.fellowship;

  console.log(fellowship.info.description);

  return (
    <FellowshipDescriptionContainer>
      <PaddedContainer>
        <Markdown
          components={{
            p(props) {
              const { node, ...rest } = props;
              return <p style={{ marginBottom: "0.5em" }} {...rest} />;
            },
            h1(props) {
              const { node, ...rest } = props;
              return <h1 style={{ marginBottom: "0.5em" }} {...rest} />;
            },
            h2(props) {
              const { node, ...rest } = props;
              return <h2 style={{ marginBottom: "0.5em" }} {...rest} />;
            },
            h3(props) {
              const { node, ...rest } = props;
              return <h3 style={{ marginBottom: "0.5em" }} {...rest} />;
            },
            h4(props) {
              const { node, ...rest } = props;
              return <h4 style={{ marginBottom: "0.5em" }} {...rest} />;
            },
            h5(props) {
              const { node, ...rest } = props;
              return <h5 style={{ marginBottom: "0.5em" }} {...rest} />;
            },
            h6(props) {
              const { node, ...rest } = props;
              return <h6 style={{ marginBottom: "0.5em" }} {...rest} />;
            },
            img(props) {
              const { node, ...rest } = props;
              return (
                <img
                  style={{
                    marginBottom: "0.5em",
                    maxWidth: "100%",
                    marginTop: "1em",
                  }}
                  {...rest}
                />
              );
            },
          }}
        >
          {fellowship.info.description}
        </Markdown>
      </PaddedContainer>
    </FellowshipDescriptionContainer>
  );
};
