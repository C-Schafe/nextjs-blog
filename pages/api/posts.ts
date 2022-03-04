import path from 'path';
import fs from 'fs';
import { NextApiHandler } from 'next';
import matter from 'gray-matter';
import { getPostsNameList } from '../../lib/posts';
import { withSession } from '../../lib/withSession';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { Post } from '../../src/entity/Post';
import { User } from '../../src/entity/User';

const getPostsList: NextApiHandler = withSession(async (request, response) => {
  if (request.method === 'GET') {
    const filenames = getPostsNameList();
    const markdownDir = path.join(process.cwd(), 'markdown');
    const files = filenames.map((filename) => {
      const filePath = path.join(markdownDir, filename);
      const fileContent = JSON.parse(JSON.stringify(fs.readFileSync(filePath, 'utf-8').toString()));
      const filterContent = matter(fileContent);
      return {
        title: filterContent.data.title,
        date: filterContent.data.date,
        content: filterContent.content,
      };
    });
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(files));
    response.end();
  }
  if (request.method === 'POST') {
    const user = request.session.get('user');
    if (user) {
      const postData = request.body;
      const connection = await getDatabaseConnection();
      const { manager } = connection;
      const userInfo = await manager.findOne(User, {where: {username: user.username}});
      const newPost = new Post();
      newPost.title = postData.title;
      newPost.content = postData.content;
      newPost.author = userInfo;
      const success = await manager.save(newPost);
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify(success));
      response.end();
    } else {
      response.statusCode = 401;
      response.end();
    }
  }
})

export default getPostsList;
