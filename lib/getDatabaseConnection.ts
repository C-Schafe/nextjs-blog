import { createConnection, getConnectionManager } from "typeorm";
import 'reflect-metadata';
import { User } from '../src/entity/User';
import { Post } from '../src/entity/Post';
import { Comment } from '../src/entity/Comment';
import config from '../ormconfig.json';

const create = () => {
  // @ts-ignore
  return createConnection({
    ...config,
    host: process.env.NODE_ENV === 'production' ? 'localhost' : config.host,
    database: process.env.NODE_ENV === 'production' ? 'blog_production' : 'blog_development',
    entities: [Post, User, Comment]
  });
};

export const getDatabaseConnection = async () => {
  const manager = getConnectionManager();
  if (process.env.NODE_ENV === 'production') {
    try {
      return manager.get();
    } catch (error) {
      return create();
    }
  } else {
    try {
      const connection = manager.get();
      if(connection) {
        await connection.close();
      }
      return create();
    } catch (error) {
      return create();
    }
  }
};

// const create = () => {
//   // @ts-ignore
//   return createConnection({
//     ...config,
//     host: process.env.NODE_ENV === 'production' ? 'localhost' : config.host,
//     database: process.env.NODE_ENV === 'production' ? 'blog_production' : 'blog_development',
//     entities: [Post, User, Comment]
//   });
// };

// const connection = (async() => {
//   const manager = getConnectionManager();
//   if (manager.has('default')) {
//     const defaultConnection = manager.get('default');
//     await defaultConnection.close();
//   }
//   return create();
// })()

// export const getDatabaseConnection = () => {
//   return connection;
// }
