import { NextApiHandler } from 'next';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { User } from '../../src/entity/User';
import md5 from 'md5';

type ValidateErrors = {
  username: string[],
  password: string[],
}

const signUp: NextApiHandler = async (request, response) => {
  const errors: ValidateErrors = {
    username: [],
    password: [],
  }
  let failed = false;
  const connection = await getDatabaseConnection();
  const { username, password } = request.body;
  const user = await connection.manager.findOne(User, { where: { username } });
  console.log(user);
  if (user) {
    if (user.passwordDigest !== md5(password)) {
      errors.password.push('请输入正确的用户名或密码');
      failed = true;
    }
  } else {
    failed = true;
    errors.username.push('用户不存在');
  }
  response.setHeader('Content-Type', 'application/json');
  if (failed) {
    response.statusCode = 401;
    response.write(JSON.stringify(errors));
  } else {
    response.statusCode = 200;
  }
  response.end();
}

export default signUp;
