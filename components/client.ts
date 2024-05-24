import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { SERVER_ADDRESS } from "./server-address";
import { createFragmentRegistry } from "@apollo/client/cache";
import {
  PROFILE_FIELDS,
  ARTISAN_FIELDS,
  FOUNDER_FIELDS,
  FELLOWSHIP_DATA_FIELDS,
  FELLOWSHIP_BASIC_FIELDS,
  FELLOWSHIP_PRICES_FIELDS,
  DEITY_BASIC_FIELDS,
} from "./graphql/fragments";

const httpLink = createHttpLink({
  uri: SERVER_ADDRESS,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(gql`
      ${PROFILE_FIELDS}
      ${ARTISAN_FIELDS}
      ${FOUNDER_FIELDS}
      ${FELLOWSHIP_DATA_FIELDS}
      ${FELLOWSHIP_BASIC_FIELDS}
      ${FELLOWSHIP_PRICES_FIELDS}
      ${DEITY_BASIC_FIELDS}
    `),
  }),
});
