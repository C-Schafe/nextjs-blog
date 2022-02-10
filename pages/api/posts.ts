import path from 'path';
import fs from 'fs';
import { NextApiHandler } from 'next';
import matter from 'gray-matter';
import { getPostsNameList } from '../../lib/posts';

const getPostsList:NextApiHandler = (request, response) => {
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

export default getPostsList;
