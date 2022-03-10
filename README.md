# 初始代码

## 初次运行
1. 新建 blog-data 作为数据库文件夹(如果本地已有，可删除重新创建)
2. 启动docker容器并安装postgres
```
// 数据库无密码
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

// 数据库设置设置密码
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_PASSWORD=123456 -d postgres:12.2
```
3. 进入数据库并创建开发环境数据库
```
// 进入docker容器
docker exec -it <contianer name> /bin/bash

// 进入postgres
psql -U <username>

// 创建blog_development数据库供开发环境使用
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
CREATE DATABASE blog_production ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```
4. 创建数据表
```
git apply migration.patch
yarn migration:build
yarn m:run
```
5. 启动应用
`yarn dev`



## 启动数据库
```
// 启动docker容器并安装postgres，无密码
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

// 启动docker容器并安装postgres，设置密码
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_PASSWORD=123456 -d postgres:12.2

// 进入docker容器
docker exec -it <contianer name> /bin/bash

// 进入postgres
psql -U <username>

// 创建blog_development数据库供开发环境使用
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## postgres命令
```
// list database
\l
//connect to a database
\c
// display tables
\dt
```

## typeorm命令
```
// 创建migration
typeorm migration:create -n <migration name>
// 运行migration
typeorm migration:run
// migration revert
typeorm migration:revert
// typeorm创建entity
typeorm entity:create -n <entity name>
```

## Docker命令
```
// 应用构建为docker镜像
docker build . -t <your username>/node-web-app
// 运行镜像
docker run -p 49160:8080 -d <your username>/node-web-app
```

## 部署
```
// 手动部署
docker run --name psql1 --network=host -v /home/blog/blog-data:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_PASSWORD=123456 -d postgres:12.2
git pull;
yarn install --production=false //安装dev Dependencies依赖;
yarn build;
docker build . -t jiang/node-web-app;
docker run --network=host -p 3000:3000 -d jiang/node-web-app
// 一键部署
ssh blog@alidev1 "sh /home/blog/app/bin/deploy.sh"
```

<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
