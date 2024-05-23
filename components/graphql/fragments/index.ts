import { gql } from "@apollo/client";

export const FOUNDER_FIELDS = gql`
  fragment FounderFields on Deity {
    id
    metadata {
      name
      images {
        url
      }
    }
  }
`;

export const ARTISAN_FIELDS = gql`
  fragment ArtisanFields on User {
    id
    profile {
      name
      profileImage {
        url
      }
    }
  }
`;

export const FELLOWSHIP_DATA_FIELDS = gql`
  fragment FellowshipDataFields on Fellowship {
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
  }
`;

export const FELLOWSHIP_BASIC_FIELDS = gql`
  fragment FellowshipBasicFields on Fellowship {
    id
    name
    symbol
    address
  }
`;

export const FELLOWSHIP_PRICES_FIELDS = gql`
  fragment FellowshipPricesFields on Fellowship {
    currentPrice
    initialPrice
    priceGrowth
    totalSupply
  }
`;
