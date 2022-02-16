import "reflect-metadata";
import {createConnection} from "typeorm";
import { Post } from "./entity/Post";
import { User } from "./entity/User";
import { Comment } from './entity/Comment';

createConnection().then(async connection => {
    // console.log(connection);
    const { manager } = connection;
    const user = new User();
    user.username = 'john';
    user.passwordDigest = 'xxx';
    await manager.save(user);
    console.log(user.id);
    const post = new Post();
    post.title = 'test post title';
    post.content = 'test post content';
    post.author = user;
    await manager.save(post);
    console.log(post.id);
    const comment = new Comment();
    comment.content = 'test comment content';
    comment.post = post;
    comment.user = user;
    await manager.save(comment);
    console.log(comment.id);
    connection.close();
}).catch(error => console.log(error));
