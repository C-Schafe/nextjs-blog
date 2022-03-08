import { NextApiHandler } from 'next';
import { withSession } from '../../../lib/withSession';
import { getDatabaseConnection } from '../../../lib/getDatabaseConnection';
import { Post } from '../../../src/entity/Post';

const getPostsList: NextApiHandler = withSession(async (request, response) => { 
  if (request.method === 'PATCH') {
    const user = request.session.get('user');
    if (user) {
      const postData = request.body;
      const connection = await getDatabaseConnection();
      const { manager } = connection;
      const post = await manager.findOne(Post, {where: {id: postData.id}});
      post.title = postData.title;
      post.content = postData.content;
      const success = await manager.save(post);
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify(success));
      response.end();
    } else {
      response.statusCode = 401;
      response.end();
    }
  }
  if(request.method === 'DELETE') {
    const user = request.session.get('user');
    if (user) {
      const id = request.query.id;
      const connection = await getDatabaseConnection();
      const { manager } = connection;
      const post = await manager.delete(Post, id);
      response.statusCode = post.affected > 0 ? 200 : 400;
      response.end();
    } else {
      response.statusCode = 401;
      response.end();
    }
  }
})

export default getPostsList;
