import { createConnection, getConnectionManager } from "typeorm";
import 'reflect-metadata';
import { User } from '../src/entity/User';
import { Post } from '../src/entity/Post';
import { Comment } from '../src/entity/Comment';
import config from '../ormconfig.json';

// const create = async () => {
//   // @ts-ignore
//   return createConnection({
//     ...config,
//     host: process.env.NODE_ENV === 'production' ? 'localhost' : config.host,
//     database: process.env.NODE_ENV === 'production' ? 'blog_production' : 'blog_development',
//     entities: [Post, User, Comment]
//   });
// };

// const promise = (async function () {
//   const manager = getConnectionManager();
//   const current = manager.has('default') && manager.get('default');
//   if (current) {await current.close();}
//   return create();
// })();


// export const getDatabaseConnection = async () => {
//   return promise;
// };

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
  // TODO 生产环境避免重复创建connection
  console.log('当前环境为:', process.env.NODE_ENV);
  const manager = getConnectionManager();
  try {
    const connection = manager.get();
    console.log('connection是否连接:', connection.isConnected);
    if (connection) {
      await connection.close();
    }
    return create();
  } catch (error) {
    return create();
  }
}

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
