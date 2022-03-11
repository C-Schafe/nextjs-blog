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

const connection = (async() => {
  const manager = getConnectionManager();
  if (manager.has('default')) {
    const defaultConnection = manager.get('default');
    await defaultConnection.close();
  }
  return create();
})()

export const getDatabaseConnection = () => {
  return connection;
}
