import path from 'path';
import fs from 'fs';
import { NextApiHandler } from 'next';
import matter from 'gray-matter';

export const getPostsNameList = () => {
  const markdownDir = path.join(process.cwd(), 'markdown');
  const filenames = fs.readdirSync(markdownDir);
  return filenames;
}

export const getPostContent = (postName: string|undefined) => {
  if(!postName) {
    return {
      title: '',
      date: '',
      content: '',
    }
  }
  const markdownDir = path.join(process.cwd(), 'markdown');
  const filePath = path.join(markdownDir, `${postName}.md`);
  const fileContent = JSON.parse(JSON.stringify(fs.readFileSync(filePath, 'utf-8').toString()));
  const filterContent = matter(fileContent);
  return {
    title: filterContent.data.title,
    date: filterContent.data.date,
    content: filterContent.content,
  };
}


