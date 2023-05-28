import { GraphQLClient, gql } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

const hygraphClient = new GraphQLClient(endpoint, {
  headers: {
    ...(process.env.HYGRAPH_QUERY_TOKEN && {
      Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`,
    }),
  },
});

export { hygraphClient, gql };
