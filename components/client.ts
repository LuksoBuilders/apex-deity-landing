import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { SERVER_ADDRESS } from "./server-address";

const httpLink = createHttpLink({
  uri: SERVER_ADDRESS,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
