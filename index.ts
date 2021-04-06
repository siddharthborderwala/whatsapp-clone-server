import { ApolloServer, gql } from 'apollo-server-express';
import express, { Request, Response } from 'express';
import cors from 'cors';

import { chats } from './db';
import schema from './schema';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/_ping', (req: Request, res: Response) => {
  res.send('pong');
  res.json(chats);
});

const server = new ApolloServer({ schema });

server.applyMiddleware({
  app,
  path: '/graphql',
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
