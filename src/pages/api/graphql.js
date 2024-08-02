import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '@/graphql/typeDefs';
import resolvers from '@/graphql/resolvers';
import connectDB from '@/lib/mongodb';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    await connectDB();
    return {};
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
