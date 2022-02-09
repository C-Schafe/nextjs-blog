import path from 'path';
import fs from 'fs';

export const getPostsNameList = () => {
  const markdownDir = path.join(process.cwd(), 'markdown');
  const filenames = fs.readdirSync(markdownDir);
  return filenames;
}