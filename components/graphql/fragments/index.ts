import { gql } from "@apollo/client";

export const PROFILE_FIELDS = gql`
  fragment ProfileFields on User {
    id
    profile {
      avatar {
        url
      }
      profileImage {
        url
      }
      name
      description
    }
  }
`;

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
    raisedAmount
  }
`;

export const DEITY_BASIC_FIELDS = gql`
  fragment DeityBasicFields on Deity {
    id
    level
    xp
    withdrawable
    tokenIdNumber
    tier
    metadata {
      images {
        url
      }
      name
      links {
        url
      }
      mythology
      story
      description
      attributes {
        value
        type
      }
    }
    slots {
      id
      index
      usedAt
    }
  }
`;
