import { NextApiHandler } from 'next';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { User } from '../../src/entity/User';
import md5 from 'md5';
import { SignIn } from '../../src/model/signIn';

const signUp: NextApiHandler = async (request, response) => {
  const { username, password } = request.body;
  const signInUser = new SignIn();
  signInUser.username = username;
  signInUser.password = password;
  await signInUser.validate();
  response.setHeader('Content-Type', 'application/json; charset=UTF-8');
  if(signInUser.hasErrors()) {
    response.statusCode = 401;
    response.write(JSON.stringify(signInUser.getErrors()));
  } else {
    response.statusCode = 200;
    response.write(JSON.stringify(signInUser));
  }
  response.end();
}

export default signUp;
