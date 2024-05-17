import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { initDataSources } from "../data-sources";

import typeDefs from '../typedefs';
import resolvers from '../resolvers';

const { PORT, MONGODB_URL } = process.env;

const main = async () => {
    await initDataSources({
        mongoose: {
          mongoUrl: MONGODB_URL,
        },
      });

      const server = new ApolloServer<any>({ resolvers, typeDefs });
      const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => ({ req }),
        listen: { port: Number(PORT) | 8001 },
      });
      console.log(`server listening on ${url}`);
}

void main();