docker restart psql1 &&
cd /home/blog/app &&
git pull &&
yarn install --production=false &&
yarn build &&
docker kill nextjs-blog;
docker rm nextjs-blog;
docker build . -t jiang/node-web-app &&
docker run --name=nextjs-blog --network=host -p 3000:3000 -d jiang/node-web-app &&
echo "deploy successfully!"