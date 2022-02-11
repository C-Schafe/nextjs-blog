import "reflect-metadata";
import {createConnection} from "typeorm";
import { Post } from "./entity/Post";

createConnection().then(async connection => {
    // console.log(connection);
    const posts = await connection.manager.find(Post);
    console.log('old data ---');
    console.log(posts);
    const postArray = [1,2,3,4,5,6]
    await connection.manager.save(Post, postArray.map((id) => {
      return new Post({
        title: `Post title${id}`,
        content: `My no.${id} post content`,
      });
    }));
    const posts2 = await connection.manager.find(Post);
    console.log('new data ---');
    console.log(posts2);
    connection.close();
}).catch(error => console.log(error));
