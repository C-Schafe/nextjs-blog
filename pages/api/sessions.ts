import { NextApiHandler } from 'next';
import { SignIn } from '../../src/model/signIn';
import { withSession } from '../../lib/withSession';

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
    const session = request.session;
    session.set('user', signInUser);
    await session.save();
    response.statusCode = 200;
    response.write(JSON.stringify(signInUser));
  }
  response.end();
}

export default withSession(signUp);
