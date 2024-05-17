import { connection, connect } from 'mongoose';

export interface InitMongooseOptions {
  mongoUrl?: string;
}

export const initMongoose = async ({ mongoUrl }: InitMongooseOptions) => {
  const conn = connection;
  
  const connectionUrl = mongoUrl || '';

  
  conn.on('error', err => {
    console.error(`Error on mongoose connection: ${JSON.stringify(err)}`);
    throw new Error(err);
  });

  conn.on('connected', () => {
    console.log(`Mongoose connection: ${connectionUrl}`);
  });

  conn.on('reconnectedFailed', () => {
    console.log(`Mongoose: DB Connection Lost, retries failed`);
  });

  const connecton = await connect(connectionUrl);

  console.log({connecton})
};