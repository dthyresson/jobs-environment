export const schema = gql`
  type Query {
    logEnvironment: Boolean @skipAuth
  }
`
